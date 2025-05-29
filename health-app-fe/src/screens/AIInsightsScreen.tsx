import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Text,
  Card as PaperCard,
  Button as PaperButton,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../theme/theme";
import { Card } from "../components/Card";

export const AIInsightsScreen = () => {
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
      marginBottom: spacing.md,
    },
    insightCard: {
      marginBottom: spacing.md,
      backgroundColor: colors.background.paper,
    },
    insightHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    insightIcon: {
      marginRight: spacing.sm,
    },
    insightTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
    },
    insightContent: {
      fontSize: 16,
      color: colors.text.secondary,
      lineHeight: 24,
    },
    insightActions: {
      marginTop: spacing.sm,
    },
    categorySection: {
      marginBottom: spacing.lg,
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: spacing.sm,
    },
  });

  // Mock insights data
  const insights = [
    {
      id: "1",
      category: "blood_pressure",
      title: "Blood Pressure Trend",
      content:
        "Your blood pressure readings have been stable over the past month, which is a positive sign. Continue with your current medication and lifestyle habits.",
      createdAt: "2023-06-10T10:30:00Z",
      icon: "heart-pulse",
      iconColor: colors.success.main,
    },
    {
      id: "2",
      category: "medication",
      title: "Medication Adjustment",
      content:
        "Based on your recent blood glucose readings, we recommend discussing a possible adjustment of your insulin dosage with your doctor during your next appointment.",
      createdAt: "2023-06-08T14:45:00Z",
      icon: "pill",
      iconColor: colors.warning.main,
    },
    {
      id: "3",
      category: "activity",
      title: "Physical Activity",
      content:
        "Your activity level has decreased by 25% compared to last month. Consider incorporating more walking into your daily routine to improve cardiovascular health.",
      createdAt: "2023-06-05T09:15:00Z",
      icon: "run",
      iconColor: colors.info.main,
    },
    {
      id: "4",
      category: "nutrition",
      title: "Dietary Pattern",
      content:
        "Analysis of your food log shows a high sodium intake during weekends. This may contribute to your blood pressure fluctuations. Consider reducing salt in your weekend meals.",
      createdAt: "2023-06-02T16:20:00Z",
      icon: "food-apple",
      iconColor: colors.warning.main,
    },
  ];

  // Group insights by category
  const categoryTitles = {
    blood_pressure: "Blood Pressure Insights",
    medication: "Medication Insights",
    activity: "Physical Activity Insights",
    nutrition: "Nutrition Insights",
  };

  const insightsByCategory = insights.reduce((acc, insight) => {
    if (!acc[insight.category]) {
      acc[insight.category] = [];
    }
    acc[insight.category].push(insight);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Health Insights</Text>
          <Text style={styles.subtitle}>
            Personalized insights based on your health data
          </Text>
        </View>

        {Object.entries(insightsByCategory).map(
          ([category, categoryInsights]) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>
                {categoryTitles[category] || category}
              </Text>
              {categoryInsights.map((insight) => (
                <PaperCard key={insight.id} style={styles.insightCard}>
                  <PaperCard.Content>
                    <View style={styles.insightHeader}>
                      <Icon
                        name={insight.icon}
                        size={24}
                        color={insight.iconColor}
                        style={styles.insightIcon}
                      />
                      <Text style={styles.insightTitle}>{insight.title}</Text>
                    </View>
                    <Text style={styles.insightContent}>{insight.content}</Text>
                  </PaperCard.Content>
                  <PaperCard.Actions style={styles.insightActions}>
                    <PaperButton>Learn More</PaperButton>
                    <PaperButton>Dismiss</PaperButton>
                  </PaperCard.Actions>
                </PaperCard>
              ))}
            </View>
          )
        )}

        <Card title="Ask AI Assistant">
          <PaperButton
            mode="contained"
            icon="chat-processing"
            onPress={() => {}}
          >
            Start a New Conversation
          </PaperButton>
        </Card>
      </View>
    </ScrollView>
  );
};
