import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import type { Todo, FilterType, SortType } from '../../types/todo';

interface TodosState {
  items: Todo[];
  filter: FilterType;
  sortBy: SortType;
  searchQuery: string;
}

const initialState: TodosState = {
  items: [
    {
      id: '1',
      text: 'Learn Redux fundamentals',
      completed: true,
      priority: 'high',
      createdAt: Date.now() - 86400000,
      tags: ['learning', 'redux'],
    },
    {
      id: '2',
      text: 'Build a Redux application',
      completed: false,
      priority: 'high',
      createdAt: Date.now(),
      tags: ['project', 'redux'],
    },
    {
      id: '3',
      text: 'Master Redux Toolkit',
      completed: false,
      priority: 'medium',
      createdAt: Date.now() + 1000,
      tags: ['learning', 'advanced'],
    },
  ],
  filter: 'all',
  sortBy: 'createdAt',
  searchQuery: '',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,

  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ text: string; priority: Todo['priority'] }>
    ) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        priority: action.payload.priority,
        createdAt: Date.now(),
        tags: [],
      };
      state.items.push(newTodo);
    },

    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },

    updateTodoText: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const todo = state.items.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },

    updateTodoPriority: (
      state,
      action: PayloadAction<{ id: string; priority: Todo['priority'] }>
    ) => {
      const todo = state.items.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.priority = action.payload.priority;
      }
    },

    addTagToTodo: (
      state,
      action: PayloadAction<{ id: string; tag: string }>
    ) => {
      const todo = state.items.find((t) => t.id === action.payload.id);
      if (todo && !todo.tags.includes(action.payload.tag)) {
        todo.tags.push(action.payload.tag);
      }
    },

    removeTagFromTodo: (
      state,
      action: PayloadAction<{ id: string; tag: string }>
    ) => {
      const todo = state.items.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.tags = todo.tags.filter((tag) => tag !== action.payload.tag);
      }
    },

    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },

    setSortBy: (state, action: PayloadAction<SortType>) => {
      state.sortBy = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    clearCompleted: (state) => {
      state.items = state.items.filter((todo) => !todo.completed);
    },

    toggleAll: (state, action: PayloadAction<boolean>) => {
      state.items.forEach((todo) => {
        todo.completed = action.payload;
      });
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodoText,
  updateTodoPriority,
  addTagToTodo,
  removeTagFromTodo,
  setFilter,
  setSortBy,
  setSearchQuery,
  clearCompleted,
  toggleAll,
} = todosSlice.actions;

export default todosSlice.reducer;

// Selectors
export const selectAllTodos = (state: RootState) => state.todos.items;
export const selectFilter = (state: RootState) => state.todos.filter;
export const selectSortBy = (state: RootState) => state.todos.sortBy;
export const selectSearchQuery = (state: RootState) => state.todos.searchQuery;

// Filters by completion status and search query.
// For large lists, consider memoizing with reselect to avoid recomputing on every render.
export const selectFilteredTodos = (state: RootState) => {
  const todos = state.todos.items;
  const filter = state.todos.filter;
  const searchQuery = state.todos.searchQuery.toLowerCase();

  let filtered = todos;
  if (filter === 'active') {
    filtered = todos.filter((todo) => !todo.completed);
  } else if (filter === 'completed') {
    filtered = todos.filter((todo) => todo.completed);
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (todo) =>
        todo.text.toLowerCase().includes(searchQuery) ||
        todo.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
  }

  return filtered;
};

export const selectSortedAndFilteredTodos = (state: RootState) => {
  const filtered = selectFilteredTodos(state);
  const sortBy = state.todos.sortBy;

  const sorted = [...filtered];

  switch (sortBy) {
    case 'createdAt':
      return sorted.sort((a, b) => b.createdAt - a.createdAt);

    case 'priority':
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return sorted.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );

    case 'alphabetical':
      return sorted.sort((a, b) => a.text.localeCompare(b.text));

    default:
      return sorted;
  }
};

// Statistics selectors
export const selectTotalTodos = (state: RootState) => state.todos.items.length;

export const selectCompletedCount = (state: RootState) =>
  state.todos.items.filter((todo) => todo.completed).length;

export const selectActiveCount = (state: RootState) =>
  state.todos.items.filter((todo) => !todo.completed).length;

export const selectCompletionPercentage = (state: RootState) => {
  const total = selectTotalTodos(state);
  if (total === 0) return 0;
  const completed = selectCompletedCount(state);
  return Math.round((completed / total) * 100);
};

export const selectAllTags = (state: RootState) => {
  const allTags = state.todos.items.flatMap((todo) => todo.tags);
  return Array.from(new Set(allTags));
};
