/**
 * TODOS COMPONENT
 * ===============
 * Demonstrates advanced Redux concepts:
 * - Managing complex state (arrays of objects)
 * - CRUD operations
 * - Filtering and sorting
 * - Derived state with selectors
 */

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodoText,
  updateTodoPriority,
  setFilter,
  setSortBy,
  setSearchQuery,
  clearCompleted,
  toggleAll,
  selectSortedAndFilteredTodos,
  selectFilter,
  selectSortBy,
  selectSearchQuery,
  selectTotalTodos,
  selectCompletedCount,
  selectActiveCount,
  selectCompletionPercentage,
} from '../features/todos/todosSlice';
import type { Todo } from '../types/todo';

export default function Todos() {
  const dispatch = useAppDispatch();

  // READING STATE from Redux
  const todos = useAppSelector(selectSortedAndFilteredTodos);
  const filter = useAppSelector(selectFilter);
  const sortBy = useAppSelector(selectSortBy);
  const searchQuery = useAppSelector(selectSearchQuery);
  const totalTodos = useAppSelector(selectTotalTodos);
  const completedCount = useAppSelector(selectCompletedCount);
  const activeCount = useAppSelector(selectActiveCount);
  const completionPercentage = useAppSelector(selectCompletionPercentage);

  // Local component state for forms
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<Todo['priority']>('medium');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Handle add todo
  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch(addTodo({ text: newTodoText, priority: newTodoPriority }));
      setNewTodoText('');
    }
  };

  // Handle edit todo
  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      dispatch(updateTodoText({ id, text: editText }));
    }
    setEditingId(null);
  };

  // Priority colors
  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'badge-danger';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-success';
    }
  };

  return (
    <div className="card fade-in">
      <h2 className="card-title">
        ✅ Todo List
      </h2>
      <p className="card-description">
        Complex state management: CRUD operations, filtering, and sorting
      </p>

      {/* STATISTICS */}
      <div className="flex gap-md mb-lg flex-wrap">
        <div style={{ flex: 1, minWidth: '150px', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
            {totalTodos}
          </div>
          <div className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>Total</div>
        </div>
        <div style={{ flex: 1, minWidth: '150px', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold', color: 'var(--info)' }}>
            {activeCount}
          </div>
          <div className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>Active</div>
        </div>
        <div style={{ flex: 1, minWidth: '150px', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold', color: 'var(--success)' }}>
            {completedCount}
          </div>
          <div className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>Completed</div>
        </div>
        <div style={{ flex: 1, minWidth: '150px', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold', color: 'var(--warning)' }}>
            {completionPercentage}%
          </div>
          <div className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>Progress</div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        marginBottom: 'var(--spacing-lg)'
      }}>
        <div style={{
          width: `${completionPercentage}%`,
          height: '100%',
          backgroundColor: 'var(--success)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* ADD TODO FORM */}
      <div className="input-group">
        <label className="input-label">Add New Todo</label>
        <div className="flex gap-sm">
          <input
            type="text"
            className="input"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="What needs to be done?"
            style={{ flex: 1 }}
          />
          <select
            className="select"
            value={newTodoPriority}
            onChange={(e) => setNewTodoPriority(e.target.value as Todo['priority'])}
            style={{ width: '120px' }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button className="btn btn-primary" onClick={handleAddTodo}>
            Add
          </button>
        </div>
      </div>

      {/* FILTERS AND CONTROLS */}
      <div className="flex gap-sm mb-lg flex-wrap items-center justify-between">
        <div className="flex gap-sm flex-wrap">
          {/* Filter buttons */}
          <button
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(setFilter('all'))}
          >
            All
          </button>
          <button
            className={`btn btn-sm ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(setFilter('active'))}
          >
            Active
          </button>
          <button
            className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(setFilter('completed'))}
          >
            Completed
          </button>
        </div>

        {/* Sort dropdown */}
        <select
          className="select"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as any))}
          style={{ width: '150px' }}
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="alphabetical">Sort A-Z</option>
        </select>
      </div>

      {/* SEARCH */}
      <div className="input-group">
        <input
          type="text"
          className="input"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="Search todos..."
        />
      </div>

      {/* BULK ACTIONS */}
      <div className="flex gap-sm mb-lg flex-wrap">
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => dispatch(toggleAll(true))}
        >
          Complete All
        </button>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => dispatch(toggleAll(false))}
        >
          Uncomplete All
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => dispatch(clearCompleted())}
        >
          Clear Completed
        </button>
      </div>

      {/* TODO LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {todos.length === 0 ? (
          <div className="text-center text-secondary" style={{ padding: 'var(--spacing-xl)' }}>
            No todos found
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                opacity: todo.completed ? 0.6 : 1,
              }}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />

              {/* Content */}
              <div style={{ flex: 1 }}>
                {editingId === todo.id ? (
                  <input
                    type="text"
                    className="input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(todo.id)}
                    onBlur={() => handleSaveEdit(todo.id)}
                    autoFocus
                  />
                ) : (
                  <div>
                    <div
                      style={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        fontSize: 'var(--font-base)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                      onDoubleClick={() => handleStartEdit(todo)}
                    >
                      {todo.text}
                    </div>
                    <div className="flex gap-sm items-center">
                      <span className={`badge ${getPriorityColor(todo.priority)}`}>
                        {todo.priority}
                      </span>
                      {todo.tags.map((tag) => (
                        <span key={tag} className="badge badge-secondary">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Priority Changer */}
              <select
                className="select"
                value={todo.priority}
                onChange={(e) =>
                  dispatch(updateTodoPriority({ id: todo.id, priority: e.target.value as Todo['priority'] }))
                }
                style={{ width: '100px' }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              {/* Delete Button */}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

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
{`// CRUD Operations
dispatch(addTodo({ text: 'New task', priority: 'high' }));
dispatch(toggleTodo(todoId));
dispatch(updateTodoText({ id: todoId, text: 'Updated' }));
dispatch(deleteTodo(todoId));

// Filtering and sorting
dispatch(setFilter('completed'));
dispatch(setSortBy('priority'));

// Using complex selectors
const todos = useAppSelector(selectSortedAndFilteredTodos);`}
        </pre>
      </details>
    </div>
  );
}
