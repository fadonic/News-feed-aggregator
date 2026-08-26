# News Aggregator

A responsive React + TypeScript news aggregator pulling articles from
NewsAPI, The Guardian, and The New York Times, with keyword search,
filtering, and a personalized feed.

## Features

- **Search & filter**: keyword search, plus filtering by date range,
  category, and source.
- **Personalized feed**: save preferred sources and categories; the
  default feed uses them automatically when no explicit filter is set.
- **Mobile-responsive**: single-column layout on mobile, sidebar +
  grid layout on desktop.

## Architecture

Each news source is wrapped in an **adapter** implementing a common
`NewsSourceAdapter` interface, normalizing that provider's response into
one shared `Article` type. A `NewsAggregatorService` fans a query out to
all (or selected) adapters in parallel, merges results, and tolerates
individual source failures gracefully. The UI never talks to a
third-party API directly — only to this service, via a TanStack Query
hook. See `src/api/` for the full data layer.

## Prerequisites

- Docker (and Docker Compose)
- Free API keys from:
  - [NewsAPI](https://newsapi.org/register)
  - [The Guardian](https://open-platform.theguardian.com/access/)
  - [The New York Times](https://developer.nytimes.com/get-started)

## Running with Docker

1. Copy the environment template and fill in your API keys:

```bash
   cp .env.example .env
```

2. Build and start the container:

```bash
   docker compose up --build
```

3. Open [http://localhost:8080](http://localhost:8080).

To stop it: `docker compose down`.

> **Note:** API keys are baked in at build time (this is a static SPA
> with no server-side runtime), so changing a key in `.env` requires
> rebuilding: `docker compose up --build`.

## Running locally without Docker

```bash
npm install
cp .env.example .env   # fill in your keys
npm run dev
```

## Tech stack

| Concern                | Choice                    |
| ---------------------- | ------------------------- | --- |
| Framework              | React + TypeScript (Vite) |
| Server state / caching | React/TanStack Query      |     |
| Styling                | Tailwind CSS              |
| HTTP                   | Axios                     |
| Container              | Docker + Nginx            |

## Project structure

```
src/
├── api/
│   ├── adapters/        # one adapter per news source + registry
│   └── NewsAggregatorService.ts
├── components/           # presentational components, grouped by feature
├── config/                 # env vars, categories, query client
├── context/                # PreferencesContext (personalized feed)
├── hooks/                  # useArticles, useArticleFilters, usePersonalizedQuery
├── types/                  # Article, ArticleQuery, UserPreferences
└── utils/                  # date formatting, storage helpers
```

## Design principles applied

- **DRY**: shared types (`Article`, `ArticleQuery`) and shared UI pieces
  (`ToggleChip`) used across otherwise-unrelated features.
- **KISS**: no state management library beyond Context where a reducer
  is enough; two responsive breakpoints instead of five.
- **SOLID**: `NewsSourceAdapter` is the backbone — Single Responsibility
  (each adapter only knows its own API), Open/Closed (add a source by
  writing one class, not editing existing ones), Liskov Substitution
  (any adapter is interchangeable), Dependency Inversion (the UI depends
  on the interface, never a concrete provider).
