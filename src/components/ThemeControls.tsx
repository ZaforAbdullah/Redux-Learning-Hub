/**
 * THEME CONTROLS COMPONENT
 * ========================
 * Demonstrates:
 * - Simple state management
 * - Toggle actions
 * - Using Redux for UI preferences
 * - Effects based on Redux state
 */

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  toggleTheme,
  setFontSize,
  setColorScheme,
  resetTheme,
  selectThemeMode,
  selectFontSize,
  selectColorScheme,
  selectIsDarkMode,
} from '../features/theme/themeSlice';

export default function ThemeControls() {
  const dispatch = useAppDispatch();

  // READING STATE from Redux
  const themeMode = useAppSelector(selectThemeMode);
  const fontSize = useAppSelector(selectFontSize);
  const colorScheme = useAppSelector(selectColorScheme);
  const isDarkMode = useAppSelector(selectIsDarkMode);

  // Apply theme to document when Redux state changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    document.documentElement.setAttribute('data-font-size', fontSize);
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
  }, [themeMode, fontSize, colorScheme]);

  return (
    <div className="card fade-in">
      <h2 className="card-title">
        🎨 Theme Settings
      </h2>
      <p className="card-description">
        Simple state management: UI preferences and settings
      </p>

      {/* CURRENT SETTINGS DISPLAY */}
      <div style={{
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-lg)',
      }}>
        <div className="flex gap-sm flex-wrap">
          <span className={`badge ${isDarkMode ? 'badge-primary' : 'badge-secondary'}`}>
            {themeMode === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </span>
          <span className="badge badge-secondary">
            Font: {fontSize}
          </span>
          <span className="badge badge-secondary">
            Color: {colorScheme}
          </span>
        </div>
      </div>

      {/* THEME MODE TOGGLE */}
      <div className="input-group">
        <label className="input-label">Theme Mode</label>
        <div className="flex gap-sm">
          <button
            className={`btn ${themeMode === 'light' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(toggleTheme())}
            style={{ flex: 1 }}
          >
            ☀️ Light
          </button>
          <button
            className={`btn ${themeMode === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(toggleTheme())}
            style={{ flex: 1 }}
          >
            🌙 Dark
          </button>
        </div>
      </div>

      {/* FONT SIZE */}
      <div className="input-group">
        <label className="input-label">Font Size</label>
        <div className="flex gap-sm">
          <button
            className={`btn btn-sm ${fontSize === 'small' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(setFontSize('small'))}
            style={{ flex: 1 }}
          >
            Small
          </button>
          <button
            className={`btn btn-sm ${fontSize === 'medium' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(setFontSize('medium'))}
            style={{ flex: 1 }}
          >
            Medium
          </button>
          <button
            className={`btn btn-sm ${fontSize === 'large' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(setFontSize('large'))}
            style={{ flex: 1 }}
          >
            Large
          </button>
        </div>
      </div>

      {/* COLOR SCHEME */}
      <div className="input-group">
        <label className="input-label">Color Scheme</label>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
          <button
            className={`btn btn-sm ${colorScheme === 'default' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(setColorScheme('default'))}
          >
            Default
          </button>
          <button
            className={`btn btn-sm ${colorScheme === 'blue' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(setColorScheme('blue'))}
          >
            Blue
          </button>
          <button
            className={`btn btn-sm ${colorScheme === 'green' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(setColorScheme('green'))}
          >
            Green
          </button>
          <button
            className={`btn btn-sm ${colorScheme === 'purple' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => dispatch(setColorScheme('purple'))}
          >
            Purple
          </button>
        </div>
      </div>

      {/* RESET BUTTON */}
      <button
        className="btn btn-secondary"
        onClick={() => dispatch(resetTheme())}
        style={{ width: '100%' }}
      >
        Reset to Defaults
      </button>

      {/* COLOR SWATCHES */}
      <div style={{ marginTop: 'var(--spacing-lg)' }}>
        <h3 style={{ fontSize: 'var(--font-base)', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
          Current Color Palette
        </h3>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
          {[
            { name: 'Primary', var: '--accent-primary' },
            { name: 'Success', var: '--success' },
            { name: 'Warning', var: '--warning' },
            { name: 'Danger', var: '--danger' },
            { name: 'Info', var: '--info' },
          ].map((color) => (
            <div key={color.name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: '60px',
                  backgroundColor: `var(${color.var})`,
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              />
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
                {color.name}
              </div>
            </div>
          ))}
        </div>
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
{`// Reading theme state
const themeMode = useAppSelector(selectThemeMode);
const isDarkMode = useAppSelector(selectIsDarkMode);

// Dispatching theme actions
dispatch(toggleTheme());
dispatch(setFontSize('large'));
dispatch(setColorScheme('blue'));
dispatch(resetTheme());

// React to theme changes with useEffect
useEffect(() => {
  document.documentElement.setAttribute('data-theme', themeMode);
}, [themeMode]);

// Persist to localStorage (optional)
useEffect(() => {
  localStorage.setItem('theme', JSON.stringify(theme));
}, [theme]);`}
        </pre>
      </details>
    </div>
  );
}
