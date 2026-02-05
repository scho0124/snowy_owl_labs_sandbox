import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const WP_BASE = process.env.WP_BASE || "http://localhost:8080";

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

async function safeJson(resp) {
  const text = await resp.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response from ${resp.url} (HTTP ${resp.status}): ${text.slice(0, 200)}`);
  }
}

app.get("/floors", async (_req, res) => {
  try {
    const site = await safeJson(await fetch(`${WP_BASE}/wp-json`));
    const posts = await safeJson(
      await fetch(`${WP_BASE}/wp-json/wp/v2/posts?orderby=title&order=asc&_fields=title,excerpt`)
    );

    res.json(
      posts.map((p) => ({
        title: p.title?.rendered ?? "",
        description: stripHtml(p.excerpt?.rendered ?? ""),
        galleryName: site.name ?? "",
      }))
    );
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

app.listen(PORT, () => {
  console.log(`Gallery API running at http://localhost:${PORT}`);
  console.log(`Fetching WordPress from: ${WP_BASE}`);
});
