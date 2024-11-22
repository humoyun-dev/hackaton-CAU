import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface ActivityChartProps {
  data: number[];
  labels: string[];
  color: string;
  title: string;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ data, labels, color, title }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: data }],
        }}
        width={screenWidth - 40} // Adjust for consistent margins
        height={220}
        chartConfig={{
          backgroundColor: '#f9f9f9',
          backgroundGradientFrom: '#f9f9f9',
          backgroundGradientTo: '#f9f9f9',
          decimalPlaces: 0,
          color: (opacity = 1) =>
            `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`,
          labelColor: () => '#8E8E93',
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: color,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 20, // Add consistent horizontal margins
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
  },
});


import Svg, { Circle } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ActivityRingProps {
  progress: number;
  color: string;
  icon: string;
  value: string;
  label: string;
}

export const ActivityRing: React.FC<ActivityRingProps> = ({ progress, color, icon, value, label }) => {
  const size = 100;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={Styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E5E5EA"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={Styles.content}>
        {/* @ts-ignore */}
        <MaterialCommunityIcons name={icon} size={24} color={color} />
        <Text style={[Styles.value, { color }]}>{value}</Text>
        <Text style={Styles.label}>{label}</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16, // Consistent spacing between components
  },
  content: {
    position: 'absolute',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
  },
  label: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
    textAlign: 'center',
  },
});
