import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';

export const useFadeAnimation = (currentColor: string) => {
  const opacity = useSharedValue(1);
  const colorProgress = useSharedValue(0);
  const previousColor = useSharedValue(currentColor);

  const triggerAnimation = useCallback(() => {
    previousColor.value = currentColor;
    
    opacity.value = withSequence(
      withTiming(0.5, {
        duration: 150,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
      withTiming(1, {
        duration: 300,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      })
    );

    colorProgress.value = withTiming(1, {
      duration: 450,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    }, () => {
      colorProgress.value = 0;
    });
  }, [currentColor, opacity, colorProgress, previousColor]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      backgroundColor: interpolateColor(
        colorProgress.value,
        [0, 1],
        [previousColor.value, currentColor]
      ),
    };
  });

  return {
    animatedStyle,
    triggerAnimation,
  };
}; 