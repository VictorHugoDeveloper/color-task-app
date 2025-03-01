import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorState {
  currentColor: string;
  colorHistory: string[];
  favoriteColors: string[];
  intensity: number;
  savedColors: string[];
}

const initialState: ColorState = {
  currentColor: '#ffffff',
  colorHistory: [],
  favoriteColors: [],
  intensity: 1,
  savedColors: [],
};

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setNewColor: (state) => {
      const newColor = generateRandomColor();
      if (state.currentColor !== '#ffffff') {
        state.colorHistory = [state.currentColor, ...state.colorHistory].slice(0, 10);
      }
      state.currentColor = newColor;
    },
    setCurrentColor: (state, action: PayloadAction<string>) => {
      if (state.currentColor !== '#ffffff') {
        state.colorHistory = [state.currentColor, ...state.colorHistory].slice(0, 10);
      }
      state.currentColor = action.payload;
    },
    setIntensity: (state, action: PayloadAction<number>) => {
      state.intensity = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const colorIndex = state.favoriteColors.indexOf(action.payload);
      if (colorIndex === -1) {
        state.favoriteColors = [...state.favoriteColors, action.payload];
        state.savedColors = Array.from(new Set([...state.savedColors, action.payload]));
      } else {
        state.favoriteColors = state.favoriteColors.filter(color => color !== action.payload);
      }
    },
    goToPreviousColor: (state) => {
      if (state.colorHistory.length > 0) {
        const [previousColor, ...remainingHistory] = state.colorHistory;
        state.currentColor = previousColor;
        state.colorHistory = remainingHistory;
      }
    },
    loadSavedState: (state, action: PayloadAction<Partial<ColorState>>) => {
      return { ...state, ...action.payload };
    },
    clearSavedColors: (state) => {
      state.savedColors = [];
      state.favoriteColors = [];
    },
  },
});

export const { 
  setNewColor, 
  setCurrentColor,
  setIntensity, 
  toggleFavorite, 
  goToPreviousColor,
  loadSavedState,
  clearSavedColors
} = colorSlice.actions;

export default colorSlice.reducer; 