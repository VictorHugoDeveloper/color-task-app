import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

interface ActionButtonProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  isActive?: boolean;
}

export function ActionButton({ iconName, onPress, isActive = false }: ActionButtonProps) {
  return (
    <Pressable 
      style={styles.iconButton}
      onPress={onPress}
    >
      <MaterialIcons 
        name={iconName} 
        size={24} 
        color={theme.colors.white}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: theme.colors.overlay,
    padding: 12,
    borderRadius: theme.borderRadius.circle,
  },
}); 