import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../store/store';
import type { User, UsersState } from '../../types/user';

const initialState: UsersState = {
  users: [],
  loading: false,
  loadingById: false,
  error: null,
  selectedUserId: null,
  previewUser: null,
};

// createAsyncThunk handles the pending/fulfilled/rejected action lifecycle automatically.
// rejectWithValue lets us pass a custom error payload instead of the raw error object.

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users'
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<User>(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch user');
    }
  }
);

// Fetches a single user for the preview panel — does NOT touch the users grid.
export const fetchUserPreview = createAsyncThunk(
  'users/fetchUserPreview',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<User>(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch user');
    }
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData: Omit<User, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(
        'https://jsonplaceholder.typicode.com/users',
        userData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to add user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      // Return the ID so the reducer knows which entry to remove
      return userId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete user');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    selectUser: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearUsers: (state) => {
      state.users = [];
      state.selectedUserId = null;
      state.previewUser = null;
    },

    clearPreviewUser: (state) => {
      state.previewUser = null;
    },
  },

  // extraReducers handles actions from createAsyncThunk — pending/fulfilled/rejected
  // for each async operation
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.previewUser = null;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Failed to fetch users';
      })

      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        // Update in place if already exists, otherwise append
        const existingIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (existingIndex >= 0) {
          state.users[existingIndex] = action.payload;
        } else {
          state.users.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Failed to fetch user';
      })

      // fetchUserPreview — separate loading flag, stores result in previewUser only
      .addCase(fetchUserPreview.pending, (state) => {
        state.loadingById = true;
        state.error = null;
      })
      .addCase(fetchUserPreview.fulfilled, (state, action: PayloadAction<User>) => {
        state.loadingById = false;
        state.previewUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUserPreview.rejected, (state, action) => {
        state.loadingById = false;
        state.error = action.payload as string || action.error.message || 'Failed to fetch user';
      })

      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Failed to add user';
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
        if (state.selectedUserId === action.payload) {
          state.selectedUserId = null;
        }
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Failed to delete user';
      });
  },
});

export const { selectUser, clearError, clearUsers, clearPreviewUser } = usersSlice.actions;

export default usersSlice.reducer;

// Selectors
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersLoadingById = (state: RootState) => state.users.loadingById;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectSelectedUserId = (state: RootState) => state.users.selectedUserId;
export const selectPreviewUser = (state: RootState) => state.users.previewUser;

export const selectSelectedUser = (state: RootState) => {
  const userId = state.users.selectedUserId;
  if (!userId) return null;
  return state.users.users.find((user) => user.id === userId) || null;
};

export const selectUserCount = (state: RootState) => state.users.users.length;
