import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

interface NutritionBarProps {
  label: string;
  value: string;
  max: number;
  color: string;
}

export const NutritionBar: React.FC<NutritionBarProps> = ({ label, value, max, color }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const percentage = (numericValue / max) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barContainer}>
        <Svg width="100%" height="8">
          <Rect width="100%" height="8" rx="4" ry="4" fill="#E5E5EA" />
          <Rect width={`${percentage}%`} height="8" rx="4" ry="4" fill={color} />
        </Svg>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    flex: 2,
    fontSize: 16,
    color: '#8E8E93',
  },
  barContainer: {
    flex: 3,
    marginHorizontal: 8,
  },
  value: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    color: '#3A3A3C',
  },
});

