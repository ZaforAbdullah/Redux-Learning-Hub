import Counter from './components/Counter';
import Todos from './components/Todos';
import Users from './components/Users';
import ThemeControls from './components/ThemeControls';

export default function App() {
  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <h1 className="app-title">
          Redux Learning Application
        </h1>
        <p className="app-subtitle">
          A comprehensive guide to Redux with React, TypeScript, and Redux Toolkit
        </p>
        <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span className="badge badge-primary">Redux Toolkit</span>
          <span className="badge badge-primary">React 18</span>
          <span className="badge badge-primary">TypeScript</span>
          <span className="badge badge-primary">Redux Thunk</span>
          <span className="badge badge-primary">Vite</span>
        </div>
      </header>

      {/* FEATURES SHOWCASE */}
      <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <h2 style={{ fontSize: 'var(--font-2xl)', marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>
          Redux Concepts Demonstrated
        </h2>
        <div className="grid">
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-lg)',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>
              ⚡ Core Concepts
            </h3>
            <ul style={{ paddingLeft: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
              <li>Store Configuration</li>
              <li>Actions & Action Creators</li>
              <li>Reducers & Immutability</li>
              <li>Selectors</li>
            </ul>
          </div>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-lg)',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>
              🔄 Advanced Patterns
            </h3>
            <ul style={{ paddingLeft: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
              <li>Async Operations (Thunks)</li>
              <li>Complex State Management</li>
              <li>Derived State</li>
              <li>Middleware (Logger)</li>
            </ul>
          </div>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-lg)',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>
              🎯 Best Practices
            </h3>
            <ul style={{ paddingLeft: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
              <li>TypeScript Integration</li>
              <li>File Structure</li>
              <li>Code Organization</li>
              <li>Performance Optimization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* INTERACTIVE DEMOS */}
      <div className="grid-2">
        {/* Theme Controls */}
        <ThemeControls />

        {/* Counter Demo */}
        <Counter />
      </div>

      {/* Todos Demo - Full Width */}
      <Todos />

      {/* Users Demo - Full Width */}
      <Users />

      {/* FOOTER INFO */}
      <div style={{
        marginTop: 'var(--spacing-2xl)',
        padding: 'var(--spacing-xl)',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        border: '1px solid var(--border-color)'
      }}>
        <h2 style={{ fontSize: 'var(--font-xl)', marginBottom: 'var(--spacing-md)' }}>
          🎓 Learning Resources
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)', maxWidth: '800px', margin: '0 auto var(--spacing-lg)' }}>
          This application demonstrates all major Redux concepts with extensive inline comments.
          Open the browser console to see Redux Logger output showing every action and state change.
        </p>
        <div className="flex gap-md justify-center flex-wrap">
          <a
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Redux Docs
          </a>
          <a
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Redux Toolkit Docs
          </a>
          <a
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            React-Redux Docs
          </a>
        </div>
      </div>

      <div style={{
        marginTop: 'var(--spacing-xl)',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: 'var(--font-sm)'
      }}>
        <p>Check your browser console to see Redux Logger in action</p>
      </div>
    </div>
  );
}
