# SavePoint Backend
[![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Bruno](https://img.shields.io/badge/Bruno-F4AA41?logo=Bruno&logoColor=black)](#)
[![SQLite](https://img.shields.io/badge/SQLite-%2307405e.svg?logo=sqlite&logoColor=white)](#)

SavePoint is a backend service for managing a personal physical video game collection. It stores a user's games in a local SQLite database and integrates with the IGDB API to search for game details.

---

## 1. 🚀 Tech Stack

- **Language & Runtime**
  - Node.js 24.x
  - TypeScript

- **Web Framework**
  - Express 5

- **Database**
  - SQLite via `better-sqlite3`
  - Database file: `./data/app.db` (configurable via `DATABASE_URI`)

- **Configuration & Environment**
  - `dotenv` for environment variable loading

- **API & Integration**
  - `axios` for HTTP requests to external API
  - External IGDB API integration for search and game details

- **Architecture & Utilities**
  - `tsyringe` for dependency injection
  - `zod` for schemas and request validation

- **Testing**
  - `ts-node` for dev-time TypeScript execution
  - Node’s built-in test runner + `supertest` for HTTP tests
  - ESLint for linting
  - Bruno collection for API testing

- **Containerisation**
  - Dockerfile (multi-stage build)
  - Docker Compose for local orchestration

---

## 2. 📦 Features

- **Game Collection CRUD**
  - Create, read, update, and delete games in a local SQLite database (`app.db`).
  - Store details such as title, condition, notes, rating, box-included flag, IGDB ID, and platform.

- **Platform Catalogue**
  - Populated list of platforms (PlayStation, Xbox, Nintendo, PC, etc.).

- **Search & Pagination**
  - Search games in your own collection by title.
  - Filter games by platform via query parameters.
  - Pagination helper function for easy implementation in other endpoints.

- **IGDB Integration**
  - Search games using the external IGDB API.
  - Fetch game details from IGDB by ID.

- **Validation & Error Handling**
  - Request validation using Zod schemas (`src/schemas`).
  - Centralised error handling middleware for consistent API responses.

- **Dependency Injection**
  - Services, repositories and APIs wired with `tsyringe` DI container.
  - Clear separation of concerns between controllers, services, repositories and APIs.
  - DI setup allows for easy testing and replacement of components (e.g. using an external database provider for production or replacing IGDB as the game detail provider).

- **Docker**
  - Multi-stage Docker build (TypeScript → compiled JS).
  - Docker Compose configuration for running the API with environment variables and database persistence.

---

## 3. 🛠️ Getting Started

### 3.1 Prerequisites

- Node.js 24.x
- Node Package Manager
- Docker (Optional)

### 3.2 Installation

```bash
npm ci
```

### 3.3 Environment configuration

There is an example env file in the project root:

```bash
cp .env.example .env
cp .env.example .env.production
```

The config loader:

- First loads `.env`
- Then loads `.env.<NODE_ENV>` (e.g. `.env.production`)

### 3.4 Running in development

```bash
npm run dev
```

By default, the server listens on `http://localhost:5050` unless `PORT` is set.

### 3.5 Building and running in production (without Docker)

```bash
npm run build
npm start
```

This compiles TypeScript into `dist/` and runs `node dist/server.js` with `NODE_ENV=production`.

---

## 4. 🐳 Running with Docker & Docker Compose

### 4.1 Build and run

Make sure to have a `.env.production` file at the project root.

```bash
docker compose up --build -d
```

- The multi-stage `Dockerfile` builds the TypeScript and runs the compiled server.
- `docker-compose.yml`:
  - Builds the image from the local Dockerfile.
  - Loads environment variables from `.env.production`.
  - Maps host port `5050` to the container port where the app listens.
  - Mounts `data/` folder in project root as a volume, allowing for database persistence.

---

## 5. 🧪 Testing

Run the test suite:

```bash
npm test
```

Test suite uses Node’s test runner with `ts-node` and `supertest` to test the API.

---

## 6. 📄 Licence

This project is licenced under the [MIT Licence](LICENCE).

