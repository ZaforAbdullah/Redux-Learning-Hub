import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

interface CounterState {
  value: number;
  step: number;
  history: number[];
}

const initialState: CounterState = {
  value: 0,
  step: 1,
  history: [0],
};

// Uses Immer internally, so the "mutating" writes below actually produce immutable updates
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += state.step;
      state.history.push(state.value);
    },

    decrement: (state) => {
      state.value -= state.step;
      state.history.push(state.value);
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.history.push(state.value);
    },

    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
      state.history.push(state.value);
    },

    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },

    reset: (state) => {
      state.value = 0;
      state.step = 1;
      state.history = [0];
    },
    // reset: () => initialState, // Alternative way to reset state by returning initialState

    multiply: (state, action: PayloadAction<number>) => {
      state.value *= action.payload;
      state.history.push(state.value);
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  setStep,
  reset,
  multiply,
} = counterSlice.actions;

export default counterSlice.reducer;

// Selectors
export const selectCounter = (state: RootState) => state.counter;
export const selectCounterValue = (state: RootState) => state.counter.value;
export const selectCounterStep = (state: RootState) => state.counter.step;
export const selectCounterHistory = (state: RootState) => state.counter.history;

// Derived selectors
export const selectIsEven = (state: RootState) => state.counter.value % 2 === 0;
export const selectIsPositive = (state: RootState) => state.counter.value > 0;
export const selectRecentHistory = (state: RootState) =>
  state.counter.history.slice(-5);
