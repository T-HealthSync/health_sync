import React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { Text, Avatar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarChart, LineChart, ProgressChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";

import { colors, spacing } from "../theme/theme";

const screenWidth = Dimensions.get("window").width;

export const HealthScreen = () => {
  const theme = useTheme();

  // Blood oxygen data
  const oxygenData = {
    data: [0.92],
  };

  // Blood sugar data for the bar chart
  const sugarData = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: [65, 75, 82, 78, 69, 73],
      },
    ],
  };

  // Heart rate data for the line chart
  const heartRateData = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: [85, 90, 88, 95, 102, 98],
        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const progressChartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(110, 94, 254, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const barChartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 0, // Hide labels
    },
  };

  const lineChartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
    strokeWidth: 2,
    propsForDots: {
      r: "0", // Hide dots
    },
    propsForLabels: {
      fontSize: 0, // Hide labels
    },
    fillShadowGradientFrom: "rgba(255, 165, 0, 0.3)",
    fillShadowGradientTo: "rgba(255, 165, 0, 0.01)",
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={40}
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.name}>Stephen Jack</Text>
        </View>
      </View>

      <View style={styles.quickCheckCard}>
        <View style={styles.quickCheckContent}>
          <Text style={styles.quickCheckText}>
            Quick check your health status
          </Text>
          <View style={styles.timerCircle}>
            <Icon
              name="clock-outline"
              size={24}
              color={colors.secondary.main}
            />
          </View>
        </View>
      </View>

      <View style={styles.healthTipsContainer}>
        <Text style={styles.sectionTitle}>Daily Health Tips</Text>
        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <Icon name="heart-pulse" size={24} color="#FFF" />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Heart Health</Text>
            <Text style={styles.tipText}>
              Regular exercise of at least 30 minutes a day can significantly
              improve your heart health.
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Activity</Text>

      <View style={styles.metricsContainer}>
        {/* Blood Oxygen */}
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Blood Oxygen</Text>
            <Icon
              name="water-percent"
              size={20}
              color="#6E5EFE"
              style={styles.metricIcon}
            />
          </View>

          <View style={styles.oxygenChartContainer}>
            <ProgressChart
              data={oxygenData}
              width={screenWidth * 0.4 - spacing.md * 2}
              height={100}
              strokeWidth={8}
              radius={40}
              chartConfig={progressChartConfig}
              hideLegend={true}
            />
            <Text style={styles.oxygenValue}>92%</Text>
          </View>
          <Text style={styles.metricDescription}>Normal range: 95-100%</Text>
        </View>

        {/* Blood Sugar */}
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Blood Sugar</Text>
            <Icon
              name="diabetes"
              size={20}
              color="#2ECC71"
              style={styles.metricIcon}
            />
          </View>

          <View style={styles.metricContent}>
            <BarChart
              data={sugarData}
              width={screenWidth * 0.4 - spacing.md * 2}
              height={80}
              chartConfig={barChartConfig}
              showBarTops={false}
              fromZero
              withInnerLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              yAxisLabel=""
              yAxisSuffix=""
              style={styles.barChart}
            />
            <Text style={[styles.metricValue, styles.sugarValue]}>82</Text>
          </View>
          <Text style={styles.metricDescription}>Fasting: 70-100 mg/dL</Text>
        </View>

        {/* Body Temperature */}
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Body Temperature</Text>
            <Icon
              name="thermometer"
              size={20}
              color="#FF5757"
              style={styles.metricIcon}
            />
          </View>

          <View style={styles.tempContainer}>
            <Icon
              name="human-male"
              size={40}
              color="#FF5757"
              style={styles.humanIcon}
            />
            <Text style={styles.tempValue}>98.8°F</Text>
          </View>
          <Text style={styles.metricDescription}>Normal: 97.7-99.5°F</Text>
        </View>

        {/* Heart Rate */}
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricTitle}>Heart Rate</Text>
            <Icon
              name="heart-pulse"
              size={20}
              color="#FFA500"
              style={styles.metricIcon}
            />
          </View>

          <View style={styles.metricContent}>
            <LineChart
              data={heartRateData}
              width={screenWidth * 0.4 - spacing.md * 2}
              height={80}
              chartConfig={lineChartConfig}
              bezier
              withInnerLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              withDots={false}
              style={styles.lineChart}
            />
            <Text style={[styles.metricValue, styles.heartRateValue]}>102</Text>
          </View>
          <Text style={styles.metricDescription}>Resting: 60-100 bpm</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.sectionTitle}>Your Health Goals</Text>
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Daily Steps</Text>
            <Text style={styles.goalProgress}>8,240 / 10,000</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: "82%" }]} />
          </View>
          <Text style={styles.goalMessage}>
            You're on track! 1,760 steps to go.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f8",
    padding: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  avatar: {
    marginRight: spacing.md,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  name: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  quickCheckCard: {
    backgroundColor: "#FFF1EC",
    borderRadius: 22,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  quickCheckContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quickCheckText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    flex: 1,
  },
  timerCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  metricCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: spacing.md,
    width: screenWidth * 0.44,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.secondary,
  },
  metricIcon: {
    alignSelf: "flex-start",
  },
  metricContent: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: "700",
    position: "absolute",
  },
  oxygenChartContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  oxygenValue: {
    fontSize: 26,
    fontWeight: "700",
    position: "absolute",
    color: "#6E5EFE",
  },
  sugarValue: {
    color: "#2ECC71",
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 100,
  },
  humanIcon: {
    marginRight: spacing.md,
  },
  tempValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF5757",
  },
  heartRateValue: {
    color: "#FFA500",
  },
  barChart: {
    marginLeft: -16,
    borderRadius: 16,
  },
  lineChart: {
    marginLeft: -16,
    borderRadius: 16,
  },
  healthTipsContainer: {
    marginBottom: spacing.lg,
  },
  tipCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  tipIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary.main,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  metricDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  progressContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  goalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  goalProgress: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary.main,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.primary.main,
    borderRadius: 4,
  },
  goalMessage: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
