import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const WP_BASE = process.env.WP_BASE || "http://localhost:8080";

/**
 * Fetch all floor posts from WordPress
 */

/**
 * Fetch floor by ID posts from WordPress
 */

/**
 * Health check
 */
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
