import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './colorSlice';

export const store = configureStore({
  reducer: {
    color: colorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['color/loadSavedState'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 