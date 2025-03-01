import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setNewColor, setCurrentColor, setIntensity, toggleFavorite, goToPreviousColor } from '../store/colorSlice';
import { useColorPersistence } from '../hooks/useColorPersistence';
import { useFadeAnimation } from '../hooks/useFadeAnimation';
import Animated from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import type { RootState } from '../store/store';
import { theme } from '../theme';
import { ActionButton } from '../components/ActionButton';
import { SavedColorsList } from '../components/SavedColorsList';

const { width } = Dimensions.get('window');

interface TapEvent {
  absoluteX: number;
  absoluteY: number;
}

export function HomeScreen() {
  const dispatch = useDispatch();
  const currentColor = useSelector((state: RootState) => state.color.currentColor);
  const intensity = useSelector((state: RootState) => state.color.intensity);
  const favoriteColors = useSelector((state: RootState) => state.color.favoriteColors);
  const colorHistory = useSelector((state: RootState) => state.color.colorHistory);
  const controlsRef = useRef<View>(null);
  
  useColorPersistence();

  const adjustedColor = currentColor.replace(/[^#]/g, (c: string) => {
    const hex = parseInt(c, 16);
    return Math.round(hex * intensity).toString(16);
  });

  const { animatedStyle, triggerAnimation } = useFadeAnimation(adjustedColor);

  useEffect(() => {
    triggerAnimation();
  }, [currentColor, triggerAnimation]);

  useEffect(() => {
    triggerAnimation();
  }, [intensity, triggerAnimation]);

  const onTap = useCallback((event: TapEvent) => {
    const { absoluteX, absoluteY } = event;
    const controlsElement = controlsRef.current;
    
    if (controlsElement) {
      controlsElement.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        const isInControlsArea = (
          absoluteX >= pageX &&
          absoluteX <= pageX + width &&
          absoluteY >= pageY &&
          absoluteY <= pageY + height
        );
        
        if (!isInControlsArea) {
          dispatch(setNewColor());
        }
      });
    } else {
      dispatch(setNewColor());
    }
  }, [dispatch]);

  const gesture = Gesture.Tap()
    .onStart(onTap)
    .shouldCancelWhenOutside(false);

  const handleToggleFavorite = useCallback(() => {
    dispatch(toggleFavorite(currentColor));
  }, [dispatch, currentColor]);

  const handleUndo = useCallback(() => {
    if (colorHistory.length > 0) {
      dispatch(goToPreviousColor());
    }
  }, [dispatch, colorHistory.length]);

  const handleColorSelect = useCallback((color: string) => {
    dispatch(setCurrentColor(color));
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <StatusBar style="auto" />
          
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <Text style={styles.colorText}>Hello there</Text>
              <Text style={styles.subText}>Tap anywhere to change color</Text>
              <Text style={styles.colorCode}>{currentColor}</Text>
              
              <View ref={controlsRef} style={styles.controls} collapsable={false}>
                <ActionButton 
                  iconName="undo"
                  onPress={handleUndo}
                />
                
                <ActionButton 
                  iconName={favoriteColors.includes(currentColor) ? "favorite" : "favorite-border"}
                  onPress={handleToggleFavorite}
                  isActive={favoriteColors.includes(currentColor)}
                />
              </View>

              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Intensity</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0.1}
                  maximumValue={1}
                  value={intensity}
                  onValueChange={(value: number) => dispatch(setIntensity(value))}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                />
              </View>

              <SavedColorsList onColorSelect={handleColorSelect} />
            </View>
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  tapArea: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
    width: '100%',
    minHeight: 200,
  },
  controlsContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
  },
  colorText: {
    fontSize: theme.typography.large,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 10,
    textShadowColor: theme.colors.shadow,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subText: {
    fontSize: theme.typography.small,
    color: theme.colors.white,
    opacity: 0.8,
    marginBottom: 20,
  },
  colorCode: {
    fontSize: theme.typography.medium,
    color: theme.colors.white,
    backgroundColor: theme.colors.overlay,
    padding: 10,
    borderRadius: theme.borderRadius.medium,
    marginBottom: 30,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  sliderContainer: {
    width: width * 0.8,
    alignItems: 'center',
  },
  sliderLabel: {
    color: theme.colors.white,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
}); 