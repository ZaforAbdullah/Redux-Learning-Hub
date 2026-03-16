import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';
import usersReducer from '../features/users/usersSlice';
import themeReducer from '../features/theme/themeSlice';

// Logs every action and state diff to the console — useful for understanding Redux flow
const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  diff: true,
});

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    users: usersReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['your/action/type'],
      },
    }).concat(logger),
  devTools: import.meta.env.MODE !== 'production',
});

// Infer types from the store so they stay in sync automatically
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
