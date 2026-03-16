/**
 * COUNTER COMPONENT
 * =================
 * Demonstrates basic Redux usage:
 * - Reading state with useAppSelector
 * - Dispatching actions with useAppDispatch
 * - Using action creators
 */

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  setStep,
  reset,
  multiply,
  selectCounterValue,
  selectCounterStep,
  selectCounterHistory,
  selectIsEven,
  selectIsPositive,
} from '../features/counter/counterSlice';
import { useState } from 'react';

export default function Counter() {
  // READING STATE: Use selectors to get data from Redux store
  const count = useAppSelector(selectCounterValue);
  const step = useAppSelector(selectCounterStep);
  const history = useAppSelector(selectCounterHistory);
  const isEven = useAppSelector(selectIsEven);
  const isPositive = useAppSelector(selectIsPositive);

  // DISPATCHING ACTIONS: Get dispatch function
  const dispatch = useAppDispatch();

  // Local component state (not Redux) for input fields
  const [customAmount, setCustomAmount] = useState('5');
  const [customStep, setCustomStep] = useState(step.toString());
  const [multiplier, setMultiplier] = useState('2');

  return (
    <div className="card fade-in">
      <h2 className="card-title">
        🔢 Counter
      </h2>
      <p className="card-description">
        Basic Redux concepts: actions, reducers, and state management
      </p>

      {/* DISPLAY STATE */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
          {count}
        </div>
        <div className="flex justify-center gap-sm" style={{ marginTop: '1rem' }}>
          <span className={`badge ${isEven ? 'badge-success' : 'badge-secondary'}`}>
            {isEven ? 'EVEN' : 'ODD'}
          </span>
          <span className={`badge ${isPositive ? 'badge-primary' : 'badge-danger'}`}>
            {isPositive ? 'POSITIVE' : 'NEGATIVE'}
          </span>
          <span className="badge badge-secondary">
            Step: {step}
          </span>
        </div>
      </div>

      {/* BASIC ACTIONS: Increment/Decrement */}
      <div className="flex gap-md mb-lg" style={{ justifyContent: 'center' }}>
        <button
          className="btn btn-danger btn-lg"
          onClick={() => dispatch(decrement())}
        >
          - {step}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
        <button
          className="btn btn-success btn-lg"
          onClick={() => dispatch(increment())}
        >
          + {step}
        </button>
      </div>

      {/* CUSTOM AMOUNT ACTIONS */}
      <div className="input-group">
        <label className="input-label">Custom Amount</label>
        <div className="flex gap-sm">
          <input
            type="number"
            className="input"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <button
            className="btn btn-danger"
            onClick={() => dispatch(decrementByAmount(Number(customAmount)))}
          >
            Subtract
          </button>
          <button
            className="btn btn-success"
            onClick={() => dispatch(incrementByAmount(Number(customAmount)))}
          >
            Add
          </button>
        </div>
      </div>

      {/* MULTIPLY ACTION */}
      <div className="input-group">
        <label className="input-label">Multiply</label>
        <div className="flex gap-sm">
          <input
            type="number"
            className="input"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            placeholder="Multiplier"
          />
          <button
            className="btn btn-primary"
            onClick={() => dispatch(multiply(Number(multiplier)))}
          >
            Multiply by {multiplier}
          </button>
        </div>
      </div>

      {/* CHANGE STEP */}
      <div className="input-group">
        <label className="input-label">Change Step Value</label>
        <div className="flex gap-sm">
          <input
            type="number"
            className="input"
            value={customStep}
            onChange={(e) => setCustomStep(e.target.value)}
            placeholder="Step value"
          />
          <button
            className="btn btn-secondary"
            onClick={() => {
              dispatch(setStep(Number(customStep)));
            }}
          >
            Set Step
          </button>
        </div>
      </div>

      {/* HISTORY DISPLAY */}
      <div className="mt-md">
        <h3 style={{ fontSize: 'var(--font-lg)', marginBottom: 'var(--spacing-sm)' }}>
          History
        </h3>
        <div className="flex gap-sm flex-wrap">
          {history.map((value, index) => (
            <span
              key={index}
              className="badge badge-secondary"
              style={{ fontSize: 'var(--font-sm)' }}
            >
              {value}
            </span>
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
{`// Reading state
const count = useAppSelector(selectCounterValue);

// Dispatching actions
const dispatch = useAppDispatch();
dispatch(increment());
dispatch(incrementByAmount(5));`}
        </pre>
      </details>
    </div>
  );
}
