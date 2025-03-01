import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { theme } from '../theme';
import { toggleFavorite } from '../store/colorSlice';

interface ColorItemProps {
  color: string;
  onPress: () => void;
  onLongPress: () => void;
  isFavorite: boolean;
}

interface SavedColorsListProps {
  onColorSelect: (color: string) => void;
}

const ColorItem = ({ color, onPress, onLongPress, isFavorite }: ColorItemProps) => (
  <TouchableOpacity 
    onPress={onPress} 
    onLongPress={onLongPress}
    style={styles.colorItemContainer}
  >
    <View style={[styles.colorPreview, { backgroundColor: color }]} />
    <Text style={styles.colorText}>{color}</Text>
    <Text style={styles.favoriteIndicator}>❤️</Text>
  </TouchableOpacity>
);

export const SavedColorsList = ({ onColorSelect }: SavedColorsListProps) => {
  const favoriteColors = useSelector((state: RootState) => state.color.favoriteColors);
  const dispatch = useDispatch();

  const handleColorRemove = (color: string) => {
    dispatch(toggleFavorite(color));
  };

  if (favoriteColors.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite colors yet</Text>
        <Text style={styles.subText}>Tap the heart icon to save colors</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Colors</Text>
      <ScrollView style={styles.scrollView}>
        {favoriteColors.map((color) => (
          <ColorItem
            key={color}
            color={color}
            isFavorite={true}
            onPress={() => onColorSelect(color)}
            onLongPress={() => handleColorRemove(color)}
          />
        ))}
      </ScrollView>
      <Text style={styles.hint}>Long press to remove from favorites</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 200,
    marginVertical: 20,
  },
  title: {
    fontSize: theme.typography.medium,
    color: theme.colors.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: theme.colors.overlay,
    borderRadius: theme.borderRadius.medium,
    padding: 10,
  },
  colorItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.small,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.small,
    marginRight: 10,
  },
  colorText: {
    color: theme.colors.white,
    flex: 1,
  },
  favoriteIndicator: {
    marginLeft: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: theme.colors.white,
    opacity: 0.7,
    fontSize: theme.typography.small,
    marginBottom: 8,
  },
  subText: {
    color: theme.colors.white,
    opacity: 0.5,
    fontSize: theme.typography.small * 0.8,
  },
  hint: {
    color: theme.colors.white,
    opacity: 0.5,
    fontSize: theme.typography.small * 0.8,
    textAlign: 'center',
    marginTop: 8,
  },
}); 