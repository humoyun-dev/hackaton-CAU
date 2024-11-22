import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  useColorScheme,
} from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ActivityRingProps {
  color: string;
  percentage: number;
  size?: number;
  thickness?: number;
  label: string;
  value: string;
  target: string;
  icon: string;
}

export const ActivityRing: React.FC<ActivityRingProps> = ({
  color,
  percentage,
  size = 80,
  thickness = 8,
  label,
  value,
  target,
  icon,
}) => {
  const animatedValue = new Animated.Value(0);
  const circleRef = React.useRef<any>(null);
  const colorScheme = useColorScheme();

  const radius = (size - thickness) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    animatedValue.addListener(({ value }) => {
      if (circleRef.current) {
        const strokeDashoffset = circumference - circumference * value;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [percentage]);
  // @ts-ignore
  const styles = getStyles(colorScheme);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorScheme === "dark" ? "#ffffff20" : "#00000020"}
            strokeWidth={thickness}
            fill="none"
          />
          <Circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </G>
      </Svg>
      <View style={styles.content}>
        <MaterialCommunityIcons name={icon as any} size={18} color={color} />
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const getStyles = (colorScheme: "light" | "dark" | null) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontSize: 12,
      fontWeight: "bold",
      color: colorScheme === "dark" ? "#ffffff" : "#000000",
      marginTop: 4,
    },
    value: {
      fontSize: 14,
      fontWeight: "bold",
      color: colorScheme === "dark" ? "#ffffff" : "#000000",
      marginTop: 2,
    },
  });
