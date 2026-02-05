import express from "express";

export const app = express();

const PORT = process.env.PORT || 3000;
const WP_BASE = process.env.WP_BASE || "http://localhost:8080";

const FLOORS_ENDPOINT = `${WP_BASE}/wp-json/wp/v2/floor`;

// Fetch helper that guarantees JSON
async function fetchJson(url) {
  const resp = await fetch(url);
  const text = await resp.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(
      `Non-JSON response from ${url} (HTTP ${resp.status}): ${text.slice(0, 200)}`,
    );
  }

  if (!resp.ok) {
    throw new Error(
      `WP error from ${url} (HTTP ${resp.status}): ${text.slice(0, 200)}`,
    );
  }

  return json;
}

/**
 * GET /floors
 * Returns a simplified list of floors for your frontend.
 */
app.get("/floors", async (_req, res) => {
  try {
    // Ask WP to return only what we need, and avoid HTML where possible:
    // - title.raw / excerpt.raw are unrendered (usually plain text)
    // - acf (if using ACF REST) can also be plain values
    const url =
      `${FLOORS_ENDPOINT}` +
      `?orderby=title&order=asc&per_page=100` +
      `&_fields=id,title,excerpt,acf`;

    const floors = await fetchJson(url);

    res.json(
      floors.map((p) => ({
        id: p.id,
        title: p.title?.raw ?? p.title?.rendered ?? "",
        description: p.excerpt?.raw ?? p.excerpt?.rendered ?? "",
      })),
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e.message || e) });
  }
});

/**
 * GET /floors/:id
 * Returns a single floor by WordPress post ID.
 */
app.get("/floors/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid id (must be a number)" });
    }

    const url = `${FLOORS_ENDPOINT}/${id}?_fields=id,title,excerpt,content,acf`;

    const p = await fetchJson(url);

    res.json({
      id: p.id,
      title: p.title?.raw ?? p.title?.rendered ?? "",
      description: p.excerpt?.raw ?? p.excerpt?.rendered ?? "",
      content: p.content?.raw ?? p.content?.rendered ?? "",
      galleryName: p.acf?.galleryName ?? "",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e.message || e) });
  }
});

app.get("/health", async (_req, res) => {
  try {
    const r = await fetch(`${WP_BASE}/wp-json`);
    res.json({ ok: r.ok, status: r.status });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Gallery API running at http://localhost:${PORT}`);
    console.log(`Fetching WordPress from: ${WP_BASE}`);
    console.log(`Floors endpoint: ${FLOORS_ENDPOINT}`);
  });
}
