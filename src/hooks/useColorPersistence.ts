import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { loadSavedState } from '../store/colorSlice';

const STORAGE_KEY = '@color_app/state';

export const useColorPersistence = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.color);

  useEffect(() => {
    const loadPersistedState = async () => {
      try {
        const savedStateJson = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedStateJson) {
          const savedState = JSON.parse(savedStateJson);
          dispatch(loadSavedState(savedState));
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    };

    loadPersistedState();
  }, [dispatch]);

  useEffect(() => {
    const saveState = async () => {
      try {
        const stateToSave = {
          currentColor: state.currentColor,
          favoriteColors: state.favoriteColors,
          savedColors: state.savedColors,
          intensity: state.intensity,
          colorHistory: state.colorHistory,
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      } catch (error) {
        console.error('Error saving state:', error);
      }
    };

    saveState();
  }, [
    state.currentColor,
    state.favoriteColors,
    state.savedColors,
    state.intensity,
    state.colorHistory
  ]);
}; 