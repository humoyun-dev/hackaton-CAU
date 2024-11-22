import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../providers/theme.provider";
import {
  Activity,
  Heart,
  Droplets,
  Moon,
  Dumbbell,
  TrendingUp,
} from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";
import { ActivityRingsCard } from "../../ui/animated-circle";

const userProfile = {
  name: "John Appleseed",
  profilePicture:
    "https://i.pinimg.com/736x/b4/3a/89/b43a892e3f68c50a5b7ce996aa41a1af.jpg",
  steps: 8534,
  calories: 420,
  distance: 6.2,
  standHours: 10,
  exerciseMinutes: 22,
  heartRate: 72,
  bloodOxygen: 98,
  sleepHours: 7.5,
};

const activityData = [
  { day: "Mon", move: 400, exercise: 25, stand: 8 },
  { day: "Tue", move: 450, exercise: 30, stand: 9 },
  { day: "Wed", move: 500, exercise: 35, stand: 10 },
  { day: "Thu", move: 420, exercise: 22, stand: 7 },
  { day: "Fri", move: 480, exercise: 28, stand: 12 },
  { day: "Sat", move: 530, exercise: 40, stand: 11 },
  { day: "Sun", move: 600, exercise: 45, stand: 10 },
];

const heartRateData = {
  labels: ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM", "11 PM"],
  datasets: [{ data: [62, 58, 70, 75, 72, 68, 65] }],
};

const AccountSummary: React.FC = () => {
  const { isDark } = useTheme();
  const screenWidth = Dimensions.get("window").width;

  const colors = {
    background: isDark ? "#000000" : "#F2F2F7",
    text: {
      primary: isDark ? "#FFFFFF" : "#000000",
      secondary: isDark ? "#8E8E93" : "#6E6E73",
    },
    card: {
      background: isDark ? "#1C1C1E" : "#FFFFFF",
    },
    activityRings: {
      move: "#FF3B30",
      exercise: "#020617",
      stand: "#14532d",
    },
  };

  const chartConfig = {
    backgroundGradientFrom: colors.card.background,
    backgroundGradientTo: colors.card.background,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const renderActivityRings = () => (
    <>
      <ActivityRingsCard />
    </>
  );

  const renderActivityChart = () => {
    const screenWidth = Dimensions.get("window").width * 0.9; 
    const activityData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], 
      datasets: [
        {
          data: [400, 450, 500, 420, 480, 530, 600], 
          color: () => colors.activityRings.move,
        },
        {
          data: [20, 25, 30, 22, 27, 35, 40], 
          color: () => colors.activityRings.exercise, 
        },
        {
          data: [8, 9, 10, 7, 12, 11, 10], 
          color: () => colors.activityRings.stand, 
        },
      ],
    };

    return (
      <View
        style={[
          styles.chartContainer,
          { backgroundColor: colors.card.background },
        ]}
      >
        <Text style={[styles.chartTitle, { color: colors.text.primary }]}>
          Activity Trends
        </Text>
        <LineChart
          data={activityData}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundGradientFrom: colors.background,
            backgroundGradientTo: colors.background,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => colors.text.secondary,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: colors.card.background,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    );
  };

  const renderHeartRateChart = () => (
    <View style={[styles.card, { backgroundColor: colors.card.background }]}>
      <Text style={[styles.chartTitle, { color: colors.text.primary }]}>
        Heart Rate
      </Text>
      <LineChart
        data={heartRateData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1) => `rgba(255, 45, 85, ${opacity})`,
        }}
        style={styles.chart}
        bezier
      />
    </View>
  );

  const renderSummaryCard = (
    icon: React.ReactNode,
    title: string,
    value: string,
    subtitle: string
  ) => (
    <View
      style={[styles.summaryCard, { backgroundColor: colors.card.background }]}
    >
      <View style={styles.summaryCardIcon}>{icon}</View>
      <Text style={[styles.summaryCardTitle, { color: colors.text.secondary }]}>
        {title}
      </Text>
      <Text style={[styles.summaryCardValue, { color: colors.text.primary }]}>
        {value}
      </Text>
      <Text
        style={[styles.summaryCardSubtitle, { color: colors.text.secondary }]}
      >
        {subtitle}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Summary
          </Text>
          <TouchableOpacity>
            <Image
              source={{ uri: userProfile.profilePicture }}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
        </View>

        {renderActivityRings()}
        {renderActivityChart()}
        {renderHeartRateChart()}

        <View style={styles.summaryContainer}>
          {renderSummaryCard(
            <Activity size={24} color={colors.text.primary} />,
            "Steps",
            userProfile.steps.toString(),
            `${userProfile.distance} mi | ${userProfile.calories} CAL`
          )}
          {renderSummaryCard(
            <Heart size={24} color={colors.text.primary} />,
            "Heart Rate",
            `${userProfile.heartRate} BPM`,
            "58-102 BPM"
          )}
          {renderSummaryCard(
            <Droplets size={24} color={colors.text.primary} />,
            "Blood Oxygen",
            `${userProfile.bloodOxygen}%`,
            "95-100%"
          )}
          {renderSummaryCard(
            <Moon size={24} color={colors.text.primary} />,
            "Sleep",
            `${userProfile.sleepHours} hrs`,
            "In bed 11PM - 7AM"
          )}
          {renderSummaryCard(
            <Dumbbell size={24} color={colors.text.primary} />,
            "Workouts",
            "1 workout",
            "22 min | 102 CAL"
          )}
          {renderSummaryCard(
            <TrendingUp size={24} color={colors.text.primary} />,
            "Trends",
            "View All",
            "Last 90 days"
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  activityRingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityRings: {
    width: 150,
    height: 150,
    marginRight: 16,
    borderRadius: "100%",
  },
  activityStats: {
    flex: 1,
  },
  activityStatsText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  summaryCard: {
    width: "48%",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryCardIcon: {
    marginBottom: 8,
  },
  summaryCardTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  summaryCardValue: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  summaryCardSubtitle: {
    fontSize: 14,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartContainer: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 24,
  },
});

export default AccountSummary;
