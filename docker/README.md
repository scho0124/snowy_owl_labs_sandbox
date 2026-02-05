# Local WordPress + Seeded Floors + Express Fetch Server

This project runs **WordPress locally** using Docker Compose, then lets you **seed 3 posts**
(“Floor 1”, “Floor 2”, “Floor 3”) after completing the WordPress install. It also includes
an Express server that fetches the data.

## Prereqs
- Docker Desktop running
- Node.js 18+

---

## 1) Start WordPress + DB (IMPORTANT: build the WordPress image)

From the project root (where `compose.yml` is):

```bash
docker compose up -d --build
```

Open WordPress:
- http://localhost:8080

If you get “Error establishing database connection”, wait ~30 seconds and refresh.

---

## 2) Complete the WordPress “5-minute install”

Fill it in like this (recommended defaults):

- **Site Title:** Ryan Schock Art Gallery
- **Username:** admin
- **Password:** admin123!
- **Your Email:** admin@example.com

Finish the install, then confirm you can log in:
- http://localhost:8080/wp-admin

---

## 3) Seed the 3 Floor posts (run AFTER install)

Run:

```bash
./seed.sh
```

This script:
- writes the correct WordPress `.htaccess` rules (so `/wp-json` works)
- flushes permalinks
- creates Floor 1 / Floor 2 / Floor 3 posts (idempotent)

---

## 4) Confirm the WordPress REST API works

These should return JSON:

- http://localhost:8080/wp-json
- http://localhost:8080/wp-json/wp/v2/posts?orderby=title&order=asc&_fields=title,excerpt

---

## 5) Run the Express server

```bash
cd server
npm install
npm start
```

Server:
- http://localhost:3000

---

## 6) Confirm everything works by hitting the endpoint

- http://localhost:3000/floors

Expected: 3 items with `title`, `description`, and `galleryName`.

---

## Reset / clean start

```bash
docker compose down -v
docker compose up -d --build
```
