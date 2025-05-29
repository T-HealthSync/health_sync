import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import {
  Text,
  useTheme,
  Button as PaperButton,
  Avatar,
  ActivityIndicator,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Card } from "../components/Card";
import { colors, spacing } from "../theme/theme";

const screenWidth = Dimensions.get("window").width;

// Define cardShadow outside of StyleSheet.create to avoid circular reference
const cardShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

export const AIScreen = () => {
  const theme = useTheme();
  const [selectedInsight, setSelectedInsight] = useState("overview");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm your AI health assistant. How can I help you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      padding: spacing.md,
      paddingBottom: 100, // Space for the chat input
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    headerContent: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text.primary,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.secondary,
      marginTop: 4,
    },
    aiAvatar: {
      backgroundColor: colors.primary.main,
    },
    healthSummaryCard: {
      marginBottom: spacing.md,
      backgroundColor: "#FFFFFF",
    },
    summaryHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    summaryTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
    },
    summaryDate: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    healthScoreContainer: {
      alignItems: "center",
      marginVertical: spacing.md,
    },
    healthScore: {
      fontSize: 36,
      fontWeight: "700",
      color: colors.primary.main,
    },
    healthScoreLabel: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    scoreProgressContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: spacing.md,
    },
    scoreItem: {
      alignItems: "center",
    },
    scoreValue: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
    },
    scoreLabel: {
      fontSize: 12,
      color: colors.text.secondary,
    },
    insightSelector: {
      flexDirection: "row",
      marginVertical: spacing.md,
    },
    insightButton: {
      marginRight: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
    },
    insightButtonActive: {
      backgroundColor: colors.primary.main,
    },
    insightButtonText: {
      color: colors.text.secondary,
    },
    insightButtonTextActive: {
      color: colors.primary.contrast,
    },
    chartContainer: {
      marginBottom: spacing.md,
      padding: spacing.md,
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      ...cardShadow,
    },
    chart: {
      marginVertical: spacing.sm,
      borderRadius: 16,
    },
    chartTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: spacing.sm,
    },
    insightCard: {
      marginBottom: spacing.md,
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      overflow: "hidden",
    },
    insightHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
      padding: spacing.md,
    },
    insightIconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.sm,
    },
    insightTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
    },
    insightContent: {
      padding: spacing.md,
      paddingTop: 0,
    },
    insightText: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 22,
    },
    recommendationList: {
      marginTop: spacing.md,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text.primary,
      marginBottom: spacing.md,
    },
    recommendationCard: {
      marginBottom: spacing.md,
    },
    recommendationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    recommendationTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
    },
    recommendationContent: {
      marginTop: spacing.sm,
    },
    recommendationText: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
    },
    actionButton: {
      marginTop: spacing.md,
    },
    chatContainer: {
      marginTop: spacing.lg,
    },
    chatHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    chatTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
      marginLeft: spacing.sm,
    },
    messageContainer: {
      marginBottom: spacing.md,
    },
    botMessageContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: spacing.md,
    },
    botAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.primary.main,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.sm,
    },
    botMessageBubble: {
      backgroundColor: colors.background.paper,
      borderRadius: 16,
      borderTopLeftRadius: 4,
      padding: spacing.sm,
      marginRight: 40,
      flex: 1,
    },
    userMessageBubble: {
      backgroundColor: colors.primary.main,
      borderRadius: 16,
      borderBottomRightRadius: 4,
      padding: spacing.sm,
      marginLeft: 40,
      alignSelf: "flex-end",
    },
    userMessageText: {
      color: "#FFF",
      fontSize: 16,
    },
    botMessageText: {
      color: colors.text.primary,
      fontSize: 16,
    },
    chatInputContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFF",
      padding: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.grey[200],
    },
    chatInput: {
      flex: 1,
      backgroundColor: colors.background.default,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: spacing.sm,
      fontSize: 16,
    },
    sendButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary.main,
      alignItems: "center",
      justifyContent: "center",
    },
    typingIndicator: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 50,
      marginTop: -spacing.md,
      marginBottom: spacing.sm,
    },
    typingText: {
      fontSize: 14,
      color: colors.text.secondary,
      marginLeft: spacing.xs,
    },
  });

  const healthScoreData = {
    labels: ["Sleep", "Activity", "Nutrition", "Stress"],
    data: [0.8, 0.65, 0.7, 0.85],
  };

  const insights = [
    {
      id: "overview",
      title: "Health Overview",
      icon: "chart-line",
      iconBg: colors.primary.main,
      content:
        "Your health score is 82, which is above average for your age group. There have been improvements in sleep patterns and stress management, but your physical activity levels have decreased by 15% this month.",
    },
    {
      id: "heart",
      title: "Heart Health",
      icon: "heart-pulse",
      iconBg: "#E53E3E",
      content:
        "Your average heart rate (72 bpm) and blood pressure (118/78 mmHg) are within normal ranges. Heart rate variability has improved by 8%, indicating better cardiovascular health and stress recovery.",
    },
    {
      id: "sleep",
      title: "Sleep Quality",
      icon: "sleep",
      iconBg: "#805AD5",
      content:
        "Your sleep quality score is 78/100. You average 7.2 hours of sleep with 21% deep sleep and 25% REM sleep. Your sleep consistency has improved, but screen time before bed may be affecting sleep quality.",
    },
    {
      id: "activity",
      title: "Physical Activity",
      icon: "run",
      iconBg: "#38A169",
      content:
        "You're averaging 6,420 steps daily, below your target of 10,000. Your active minutes (32 min/day) are also below recommended levels (45-60 min/day). Consider scheduling short walks throughout the day.",
    },
  ];

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [85, 88, 82, 90, 87, 89, 86],
        color: (opacity = 1) => colors.primary.main,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#FFF",
    color: (opacity = 1) => colors.primary.main,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForLabels: {
      fontSize: 12,
    },
  };

  const progressChartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#FFF",
    color: (opacity = 1) => colors.primary.main,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const recommendations = [
    {
      id: "1",
      title: "Improve Sleep Quality",
      content:
        "Try to maintain a consistent sleep schedule even on weekends. Consider reducing screen time at least 1 hour before bedtime to improve sleep quality.",
      action: "View Sleep Plan",
    },
    {
      id: "2",
      title: "Increase Physical Activity",
      content:
        "Your daily steps have decreased this month. Aim for short 10-minute walks throughout the day to reach your step goal.",
      action: "Set Reminders",
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setChatMessages([...chatMessages, { type: "user", text: message }]);
    setMessage("");

    // Simulate typing indicator
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Based on your recent health data, I recommend focusing on improving your sleep quality and increasing physical activity levels. Would you like specific recommendations?",
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const selectedInsightData = insights.find((i) => i.id === selectedInsight);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>AI Health Insights</Text>
            <Text style={styles.subtitle}>
              Personalized recommendations based on your health data
            </Text>
          </View>
          <Avatar.Icon size={50} icon="robot" style={styles.aiAvatar} />
        </View>

        <Card style={styles.healthSummaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Your Health Score</Text>
            <Text style={styles.summaryDate}>Last updated: Today</Text>
          </View>

          <View style={styles.healthScoreContainer}>
            <Text style={styles.healthScore}>82</Text>
            <Text style={styles.healthScoreLabel}>Good • Above Average</Text>
          </View>

          <View style={styles.chartContainer}>
            <ProgressChart
              data={healthScoreData}
              width={screenWidth - spacing.md * 4}
              height={180}
              strokeWidth={12}
              radius={32}
              chartConfig={progressChartConfig}
              hideLegend={false}
            />
          </View>

          <View style={styles.scoreProgressContainer}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreValue}>+3%</Text>
              <Text style={styles.scoreLabel}>From last week</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreValue}>+12%</Text>
              <Text style={styles.scoreLabel}>From last month</Text>
            </View>
          </View>
        </Card>

        <View style={styles.insightSelector}>
          {insights.map((insight) => (
            <TouchableOpacity
              key={insight.id}
              style={[
                styles.insightButton,
                selectedInsight === insight.id && styles.insightButtonActive,
              ]}
              onPress={() => setSelectedInsight(insight.id)}
            >
              <Text
                style={[
                  styles.insightButtonText,
                  selectedInsight === insight.id &&
                    styles.insightButtonTextActive,
                ]}
              >
                {insight.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedInsightData && (
          <View style={styles.insightCard}>
            <LinearGradient
              colors={[
                selectedInsightData.iconBg,
                selectedInsightData.iconBg + "99",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ padding: spacing.sm }}
            >
              <View style={styles.insightHeader}>
                <View
                  style={[
                    styles.insightIconContainer,
                    { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                  ]}
                >
                  <Icon
                    name={selectedInsightData.icon}
                    size={28}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={[styles.insightTitle, { color: "#FFFFFF" }]}>
                  {selectedInsightData.title}
                </Text>
              </View>
            </LinearGradient>
            <View style={styles.insightContent}>
              <Text style={styles.insightText}>
                {selectedInsightData.content}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Weekly Health Trend</Text>
          <LineChart
            data={chartData}
            width={screenWidth - spacing.md * 4}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.recommendationList}>
          <Text style={styles.sectionHeader}>Personalized Recommendations</Text>

          {recommendations.map((recommendation) => (
            <Card key={recommendation.id} style={styles.recommendationCard}>
              <View style={styles.recommendationHeader}>
                <Text style={styles.recommendationTitle}>
                  {recommendation.title}
                </Text>
              </View>
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationText}>
                  {recommendation.content}
                </Text>
                <PaperButton
                  mode="outlined"
                  onPress={() => {}}
                  style={styles.actionButton}
                >
                  {recommendation.action}
                </PaperButton>
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Icon
              name="chat-processing-outline"
              size={24}
              color={colors.primary.main}
            />
            <Text style={styles.chatTitle}>Ask Your AI Health Assistant</Text>
          </View>

          <View style={styles.messageContainer}>
            {chatMessages.map((msg, index) =>
              msg.type === "bot" ? (
                <View key={index} style={styles.botMessageContainer}>
                  <View style={styles.botAvatar}>
                    <Icon name="robot" size={20} color="#FFF" />
                  </View>
                  <View style={styles.botMessageBubble}>
                    <Text style={styles.botMessageText}>{msg.text}</Text>
                  </View>
                </View>
              ) : (
                <View key={index} style={styles.userMessageBubble}>
                  <Text style={styles.userMessageText}>{msg.text}</Text>
                </View>
              )
            )}

            {isTyping && (
              <View style={styles.typingIndicator}>
                <ActivityIndicator size={18} color={colors.primary.main} />
                <Text style={styles.typingText}>AI is typing...</Text>
              </View>
            )}
          </View>
        </View>

        {/* Add extra space at bottom for scrolling past the input box */}
        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.chatInputContainer}>
        <TextInput
          style={styles.chatInput}
          placeholder="Ask about your health..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Icon name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
