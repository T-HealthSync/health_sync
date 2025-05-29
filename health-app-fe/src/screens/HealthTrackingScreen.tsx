import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, TextInput, Button as PaperButton } from "react-native-paper";
import { useRoute, RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import { RootStackParamList } from "../navigation/types";
import { Card } from "../components/Card";
import { colors, spacing } from "../theme/theme";

type HealthTrackingRouteProp = RouteProp<RootStackParamList, "HealthTracking">;

const screenWidth = Dimensions.get("window").width;

export const HealthTrackingScreen = () => {
  const route = useRoute<HealthTrackingRouteProp>();
  const { date } = route.params || {};

  const [selectedMetric, setSelectedMetric] = useState("bloodPressure");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      padding: spacing.md,
    },
    header: {
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.secondary,
    },
    chartContainer: {
      marginVertical: spacing.md,
    },
    chart: {
      marginVertical: spacing.sm,
      borderRadius: 16,
    },
    metricsSelector: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: spacing.md,
    },
    metricButton: {
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
    },
    metricButtonActive: {
      backgroundColor: colors.primary.main,
    },
    metricButtonText: {
      color: colors.text.primary,
    },
    metricButtonTextActive: {
      color: colors.primary.contrast,
    },
    inputContainer: {
      marginBottom: spacing.sm,
    },
    input: {
      backgroundColor: colors.background.paper,
    },
    addButton: {
      marginTop: spacing.md,
    },
  });

  // Mock health data
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [120, 118, 124, 115, 126, 124, 120],
        color: () => colors.primary.main,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.background.paper,
    backgroundGradientTo: colors.background.paper,
    decimalPlaces: 0,
    color: () => colors.primary.main,
    labelColor: () => colors.text.secondary,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: colors.primary.main,
      fill: colors.background.paper,
    },
  };

  const metrics = [
    { id: "bloodPressure", label: "Blood Pressure" },
    { id: "heartRate", label: "Heart Rate" },
    { id: "bloodSugar", label: "Blood Sugar" },
    { id: "weight", label: "Weight" },
    { id: "temperature", label: "Temperature" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Tracking</Text>
          <Text style={styles.subtitle}>
            {date || "Today's"} Health Metrics
          </Text>
        </View>

        <View style={styles.metricsSelector}>
          {metrics.map((metric) => (
            <PaperButton
              key={metric.id}
              mode="text"
              style={[
                styles.metricButton,
                selectedMetric === metric.id && styles.metricButtonActive,
              ]}
              labelStyle={[
                styles.metricButtonText,
                selectedMetric === metric.id && styles.metricButtonTextActive,
              ]}
              onPress={() => setSelectedMetric(metric.id)}
            >
              {metric.label}
            </PaperButton>
          ))}
        </View>

        <Card title={metrics.find((m) => m.id === selectedMetric)?.label}>
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={screenWidth - spacing.md * 4}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </Card>

        <Card title="Add New Reading">
          <View style={styles.inputContainer}>
            <TextInput
              label="Value"
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
              value={value}
              onChangeText={setValue}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="Notes"
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
              value={notes}
              onChangeText={setNotes}
            />
          </View>
          <PaperButton
            mode="contained"
            onPress={() => {
              // Save reading logic would go here
              setValue("");
              setNotes("");
            }}
            style={styles.addButton}
          >
            Save Reading
          </PaperButton>
        </Card>
      </View>
    </ScrollView>
  );
};
