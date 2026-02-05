# 🚀 Local WordPress + App Development Stack

This repository provides a **clean, local development environment** for a WordPress-backed application with a custom API server and a React frontend.

It is designed for **local development and testing only** and keeps responsibilities clearly separated between CMS, API, and UI layers.

---

## 🧱 What This Repo Contains

### 🐳 Dockerized WordPress (`docker/`)

- **WordPress + MySQL** running in Docker
- Exposes the **WordPress REST API**
- Includes **WP-CLI seed tooling** for predictable test content
- Used strictly as a **local CMS**

---

### 🧠 Backend API Server (`server/`)

- Custom backend API
- Fetches content from the WordPress REST API
- Acts as the **only integration layer** between WordPress and the frontend
- Frontend never talks to WordPress directly

---

### ⚛️ Frontend Client (`client/`)

- Built with **Vite + React**
- Consumes data **only** from the backend API
- Used to test routing, forms, and application flows

---

## 🗺️ High-Level Architecture

```
Frontend (Vite + React)
└── requests data
    ↓
Backend Server (Custom API)
└── fetches content
    ↓
WordPress REST API
└── WordPress + MySQL (Docker)
```

---

## 📁 Repository Structure

```
.
├─ docker/
│  ├─ docker-compose.yml
│  ├─ wordpress/
│  │  └─ Dockerfile
│  ├─ db/
│  │  └─ init/
│  │     └─ 01-create-db.sql
│  ├─ seed/
│  │  └─ (WP-CLI seed scripts)
│  └─ README.md          # Docker + WordPress instructions
│
├─ server/
│  └─ (backend API server)
│
├─ client/
│  └─ (Vite + React frontend)
│
└─ README.md              # This file
```

---

## 📦 Folder Responsibilities

### 🐳 `docker/`

- Runs **WordPress + MySQL**
- Exposes WordPress at:
  👉 `http://localhost:8080`
- Provides WP-CLI commands for:
  - Installation
  - Seeding test content
  - Admin tasks

📄 **See `docker/README.md` for full setup and usage instructions.**

---

### 🧠 `server/`

- Custom backend API server
- Fetches content from:
  ```
  http://localhost:8080/wp-json/wp/v2/*
  ```
- Shapes WordPress data into application-ready responses
- Serves as the **single source of truth** for the frontend

---

### ⚛️ `client/`

- Vite + React application
- Communicates **only** with the backend server
- Never accesses WordPress directly
- Used to test:
  - Routing
  - Forms
  - API integration

---

## 🛠️ Development Workflow

### 1️⃣ Start WordPress

```bash
cd docker
docker compose up --build
```

---

### 2️⃣ Seed WordPress Content (Optional)

```bash
docker compose run --rm wpcli <seed-command>
```

---

### 3️⃣ Start the Backend Server

```bash
cd server
npm run dev
```

---

### 4️⃣ Start the Frontend

```bash
cd client
npm run dev
```

---

## 🌐 WordPress REST API

- **Base URL**

  ```
  http://localhost:8080
  ```

- **Example Endpoint**
  ```
  http://localhost:8080/wp-json/wp/v2/posts
  ```

⚠️ The frontend should **never** call WordPress directly — all access goes through the backend API.

---

## 🔄 Resetting the Environment

From the `docker/` directory:

### Stop containers

```bash
docker compose down
```

### Full reset (removes all data)

```bash
docker compose down -v
```

> ⚠️ Removing volumes deletes all WordPress content and seeded data.

---

## ⚠️ Important Notes

- 🚫 **Not production-ready**
- 🔐 Credentials are intentionally simple
- 💾 Docker volumes persist data between runs
- 🧩 MySQL init scripts run only on first startup

---

## 🎯 Why This Setup Exists

This environment allows us to:

- ✅ Develop against a **stable local WordPress API**
- 🧱 Keep WordPress isolated as a CMS
- 🧠 Centralize integration logic in the backend
- 🔁 Work with **repeatable, seeded content**
- 🧪 Avoid reliance on external infrastructure during development

---

Happy building! 🚀
