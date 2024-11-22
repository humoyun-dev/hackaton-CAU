// src/components/ActivityRings.tsx

import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ActivityRingsProps {
  move: number; // Current move value
  moveGoal: number; // Move goal
  exercise: number; // Current exercise value
  exerciseGoal: number; // Exercise goal
  stand: number; // Current stand value
  standGoal: number; // Stand goal
  size?: number; // Diameter of the component
}

const ActivityRings: React.FC<ActivityRingsProps> = ({
  move,
  moveGoal,
  exercise,
  exerciseGoal,
  stand,
  standGoal,
  size = 150,
}) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate progress percentages
  const moveProgress = Math.min(move / moveGoal, 1);
  const exerciseProgress = Math.min(exercise / exerciseGoal, 1);
  const standProgress = Math.min(stand / standGoal, 1);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Stand Ring */}
        <Circle
          stroke="#4CD964"
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={
            circumference - circumference * standProgress
          }
          strokeLinecap="round"
        />
        {/* Exercise Ring */}
        <Circle
          stroke="#FF9500"
          fill="none"
          cx={center}
          cy={center}
          r={radius - strokeWidth - 2}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={
            circumference - circumference * exerciseProgress
          }
          strokeLinecap="round"
        />
        {/* Move Ring */}
        <Circle
          stroke="#FF3B30"
          fill="none"
          cx={center}
          cy={center}
          r={radius - (strokeWidth + 2) * 2}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={
            circumference - circumference * moveProgress
          }
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default ActivityRings;
