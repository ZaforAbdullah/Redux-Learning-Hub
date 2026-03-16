/**
 * USERS COMPONENT
 * ===============
 * Demonstrates async operations with Redux:
 * - createAsyncThunk
 * - Loading states
 * - Error handling
 * - API calls with axios
 */

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchUsers,
  fetchUserById,
  fetchUserPreview,
  deleteUser,
  selectUser,
  clearPreviewUser,
  selectAllUsers,
  selectUsersLoading,
  selectUsersLoadingById,
  selectUsersError,
  selectSelectedUser,
  selectPreviewUser,
  selectUserCount,
  clearError,
} from '../features/users/usersSlice';

export default function Users() {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectAllUsers);
  const loading = useAppSelector(selectUsersLoading);
  const loadingById = useAppSelector(selectUsersLoadingById);
  const error = useAppSelector(selectUsersError);
  const selectedUser = useAppSelector(selectSelectedUser);
  const previewUser = useAppSelector(selectPreviewUser);
  const userCount = useAppSelector(selectUserCount);

  // The detail panel shows a previewed user (from "Fetch User #1") or a grid-selected user
  const displayedUser = previewUser ?? selectedUser;

  // Fetch users on component mount
  useEffect(() => {
    // Only fetch if we don't have users yet
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  // Handle fetch users
  const handleFetchUsers = () => {
    dispatch(fetchUsers());
  };

  // Refresh a user card in the grid
  const handleRefreshUser = (userId: number) => {
    dispatch(fetchUserById(userId));
  };

  // Fetch a single user for the preview panel (doesn't touch the grid)
  const handlePreviewUser = (userId: number) => {
    dispatch(fetchUserPreview(userId));
  };

  // Handle delete user
  const handleDeleteUser = async (userId: number) => {
    // Using unwrap() to handle the promise result
    try {
      await dispatch(deleteUser(userId)).unwrap();
      // Success - the user is removed from state automatically
    } catch (err) {
      // Error is handled in the slice, but we could show additional UI feedback here
      console.error('Failed to delete user:', err);
    }
  };

  // Handle select user
  const handleSelectUser = (userId: number | null) => {
    dispatch(selectUser(userId));
  };

  return (
    <div className="card fade-in">
      <h2 className="card-title">
        👥 Users
      </h2>
      <p className="card-description">
        Async operations: API calls, loading states, and error handling with Redux Thunk
      </p>

      {/* CONTROLS */}
      <div className="flex gap-sm mb-lg flex-wrap">
        <button
          className={`btn ${loadingById || previewUser ? 'btn-secondary' : 'btn-primary'}`}
          onClick={handleFetchUsers}
          disabled={loading || loadingById}
        >
          {loading ? 'Loading...' : 'Fetch Users'}
        </button>
        <button
          className={`btn ${loadingById || previewUser ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handlePreviewUser(1)}
          disabled={loading || loadingById}
        >
          {loadingById ? 'Loading...' : 'Fetch User #1'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            dispatch(selectUser(null));
            dispatch(clearPreviewUser());
          }}
          disabled={!displayedUser}
        >
          Clear Selection
        </button>
        {error && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => dispatch(clearError())}
          >
            Clear Error
          </button>
        )}
      </div>

      {/* STATISTICS */}
      <div className="flex gap-md mb-lg flex-wrap">
        <div style={{ flex: 1, minWidth: '150px', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
            {userCount}
          </div>
          <div className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>Total Users</div>
        </div>
        <div style={{ flex: 1, minWidth: '150px', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold', color: loading ? 'var(--warning)' : 'var(--success)' }}>
            {loading ? '⏳' : '✓'}
          </div>
          <div className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>
            {loading ? 'Loading' : 'Ready'}
          </div>
        </div>
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="alert alert-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* LOADING SPINNER */}
      {loading && (
        <div className="flex justify-center" style={{ padding: 'var(--spacing-xl)' }}>
          <div className="spinner" />
        </div>
      )}

      {/* USER DETAIL PANEL — always reserves space to avoid layout jump */}
      <div style={{
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)',
        border: `2px solid ${loadingById || displayedUser ? 'var(--accent-primary)' : 'transparent'}`,
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: loadingById ? 'center' : 'flex-start',
        alignItems: loadingById ? 'center' : 'stretch',
      }}>
        {loadingById ? (
          <div className="spinner" />
        ) : displayedUser ? (
          <>
            <h3 style={{ fontSize: 'var(--font-xl)', marginBottom: 'var(--spacing-sm)', color: 'var(--accent-primary)' }}>
              {previewUser ? 'User Preview' : 'Selected User'}
            </h3>
            <div className="flex flex-col gap-sm">
              <div><strong>Name:</strong> {displayedUser.name}</div>
              <div><strong>Username:</strong> @{displayedUser.username}</div>
              <div><strong>Email:</strong> {displayedUser.email}</div>
              <div><strong>Phone:</strong> {displayedUser.phone}</div>
              <div><strong>Website:</strong> {displayedUser.website}</div>
              <div><strong>City:</strong> {displayedUser.address.city}</div>
              <div><strong>Company:</strong> {displayedUser.company.name}</div>
            </div>
          </>
        ) : (
          <span className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>
            Click a user card or use "Fetch User #1" to view details here.
          </span>
        )}
      </div>

      {/* USERS GRID */}
      {!loading && users.length > 0 && (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                backgroundColor: selectedUser?.id === user.id ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                border: selectedUser?.id === user.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-md)',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
              onClick={() => handleSelectUser(user.id)}
            >
              {/* User info */}
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>
                  {user.name}
                </h3>
                <div className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>
                  @{user.username}
                </div>
              </div>

              {/* Contact info */}
              <div className="flex flex-col gap-sm" style={{ fontSize: 'var(--font-sm)', marginBottom: 'var(--spacing-md)' }}>
                <div className="text-secondary">📧 {user.email}</div>
                <div className="text-secondary">📱 {user.phone}</div>
                <div className="text-secondary">🌐 {user.website}</div>
                <div className="text-secondary">🏢 {user.company.name}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-sm">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRefreshUser(user.id);
                  }}
                  disabled={loading}
                >
                  Refresh
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUser(user.id);
                  }}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && users.length === 0 && (
        <div className="text-center text-secondary" style={{ padding: 'var(--spacing-xl)' }}>
          No users loaded. Click "Fetch Users" to load data from API.
        </div>
      )}

      {/* CODE EXAMPLE */}
      <details style={{ marginTop: 'var(--spacing-lg)' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>
          📝 View Code Example
        </summary>
        <pre style={{
          backgroundColor: 'var(--bg-tertiary)',
          padding: 'var(--spacing-md)',
          borderRadius: 'var(--radius-md)',
          overflow: 'auto',
          fontSize: 'var(--font-sm)'
        }}>
{`// Async thunk in slice (usersSlice.ts):
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get('https://api.example.com/users');
    return response.data;
  }
);

// Using in component:
const dispatch = useAppDispatch();
const users = useAppSelector(selectAllUsers);
const loading = useAppSelector(selectUsersLoading);
const error = useAppSelector(selectUsersError);

// Dispatch async action
dispatch(fetchUsers());

// With promise handling
try {
  const result = await dispatch(fetchUsers()).unwrap();
  console.log('Success:', result);
} catch (error) {
  console.error('Failed:', error);
}

// Handle loading states in extraReducers:
extraReducers: (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
}`}
        </pre>
      </details>
    </div>
  );
}
