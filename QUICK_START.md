# Quick Start

## Run locally

```bash
npm install
npm run dev
```

http://localhost:5173

## Run with Docker

```bash
# Development (hot reload)
docker-compose up dev

# Production
docker-compose up --build prod
# → http://localhost:8080
```

## npm scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run preview  # preview the build
npm run lint     # eslint
```

## What to look at

1. `src/store/store.ts` — store setup and middleware config
2. `src/store/hooks.ts` — typed `useAppDispatch` / `useAppSelector`
3. `src/features/counter/counterSlice.ts` — start here for basics
4. `src/features/users/usersSlice.ts` — async thunks and API calls
5. `src/components/*.tsx` — how slices connect to React components

## Data flow

```
dispatch(action) → middleware → reducer → state update → re-render
```
