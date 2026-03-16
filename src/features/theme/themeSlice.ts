import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

interface ThemeState {
  mode: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  colorScheme: 'default' | 'blue' | 'green' | 'purple';
}

// Could load from localStorage here if you want persistence across sessions
const initialState: ThemeState = {
  mode: 'light',
  fontSize: 'medium',
  colorScheme: 'default',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,

  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },

    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
    },

    setFontSize: (
      state,
      action: PayloadAction<'small' | 'medium' | 'large'>
    ) => {
      state.fontSize = action.payload;
    },

    setColorScheme: (
      state,
      action: PayloadAction<'default' | 'blue' | 'green' | 'purple'>
    ) => {
      state.colorScheme = action.payload;
    },

    resetTheme: () => initialState,
  },
});

export const {
  toggleTheme,
  setThemeMode,
  setFontSize,
  setColorScheme,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;

// Selectors
export const selectThemeMode = (state: RootState) => state.theme.mode;
export const selectFontSize = (state: RootState) => state.theme.fontSize;
export const selectColorScheme = (state: RootState) => state.theme.colorScheme;
export const selectTheme = (state: RootState) => state.theme;
export const selectIsDarkMode = (state: RootState) => state.theme.mode === 'dark';
