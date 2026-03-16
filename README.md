# Redux Learning App

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

**[Live Demo →](https://redux-learning-hub.vercel.app)** <!-- TODO: replace with Vercel URL -->

A Redux app I built to learn and practice state management patterns with Redux Toolkit. Each feature slice covers a different aspect of Redux — from basic synchronous actions to async thunks with API calls.

## Getting Started

### Local

```bash
npm install
npm run dev
```

Open http://localhost:5173

### Docker

```bash
# Dev with hot reload
docker-compose up dev

# Production build (served via nginx on :8080)
docker-compose up --build prod
```

## What's in here

Four feature slices, each demonstrating different Redux patterns:

- **Counter** — basic actions, reducers, derived state, history tracking
- **Todos** — CRUD, filtering, sorting, search, bulk operations
- **Users** — async thunks, API calls with axios, loading/error states
- **Theme** — simple UI preferences (dark mode, font size, color scheme)

## Project Structure

```
src/
├── components/          # React components
├── features/            # Redux slices
│   ├── counter/
│   ├── todos/
│   ├── users/
│   └── theme/
├── store/               # Store config and typed hooks
└── types/               # TypeScript types
```

## Stack

- React 18 + TypeScript
- Redux Toolkit + Redux Thunk
- Vite
- Axios
- Docker + Nginx

## Learning Resources

- [Redux Toolkit docs](https://redux-toolkit.js.org/)
- [React-Redux docs](https://react-redux.js.org/)
- [TypeScript + Redux](https://redux.js.org/usage/usage-with-typescript)
