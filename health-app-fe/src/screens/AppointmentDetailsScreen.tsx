import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import {
  Text,
  useTheme,
  Avatar,
  Badge,
  Button as PaperButton,
  Chip,
} from "react-native-paper";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { colors, spacing } from "../theme/theme";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

type AppointmentDetailsRouteProp = RouteProp<
  RootStackParamList,
  "AppointmentDetails"
>;

const { width } = Dimensions.get("window");

export const AppointmentDetailsScreen = () => {
  const theme = useTheme();
  const route = useRoute<AppointmentDetailsRouteProp>();
  const { appointmentId } = route.params;
  const [expanded, setExpanded] = useState(false);
  const expandedHeight = new Animated.Value(expanded ? 1 : 0);

  // Mock appointment data (in a real app, this would come from an API or store)
  const appointment = {
    id: appointmentId,
    doctorName: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 127,
    date: "June 15, 2023",
    time: "2:30 PM",
    duration: "30 minutes",
    location: "Video Call",
    reason: "Regular checkup for hypertension",
    notes:
      "Remember to have your blood pressure readings for the last week ready.",
    price: "$50",
    status: "Confirmed",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    header: {
      padding: spacing.lg,
      backgroundColor: colors.primary.main,
    },
    statusBadge: {
      position: "absolute",
      top: spacing.md,
      right: spacing.md,
      borderRadius: 12,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs / 2,
      backgroundColor:
        appointment.status === "Confirmed"
          ? colors.success.main
          : colors.warning.main,
    },
    statusText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: "#fff",
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: 16,
      color: "rgba(255, 255, 255, 0.8)",
      marginBottom: spacing.md,
    },
    doctorCard: {
      flexDirection: "row",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderRadius: 16,
      padding: spacing.md,
      marginTop: spacing.md,
    },
    doctorInfo: {
      marginLeft: spacing.md,
      flex: 1,
    },
    doctorName: {
      fontSize: 18,
      fontWeight: "600",
      color: "#fff",
    },
    doctorSpecialty: {
      fontSize: 14,
      color: "rgba(255, 255, 255, 0.8)",
      marginBottom: spacing.xs,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingValue: {
      fontSize: 14,
      fontWeight: "600",
      color: "#fff",
      marginRight: spacing.xs,
    },
    ratingCount: {
      fontSize: 12,
      color: "rgba(255, 255, 255, 0.8)",
    },
    content: {
      marginTop: -spacing.xl,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: colors.background.default,
      padding: spacing.lg,
      paddingTop: spacing.xl,
      flex: 1,
    },
    section: {
      marginBottom: spacing.lg,
      backgroundColor: colors.background.paper,
      borderRadius: 16,
      padding: spacing.md,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text.primary,
      marginBottom: spacing.md,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    detailIcon: {
      marginRight: spacing.sm,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary.light,
      alignItems: "center",
      justifyContent: "center",
    },
    detailTextContainer: {
      flex: 1,
    },
    detailLabel: {
      fontSize: 12,
      color: colors.text.secondary,
    },
    detailText: {
      fontSize: 16,
      color: colors.text.primary,
      fontWeight: "600",
    },
    priceTag: {
      position: "absolute",
      right: spacing.md,
      top: spacing.md,
      backgroundColor: colors.primary.light,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs / 2,
      borderRadius: 8,
    },
    priceText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.primary.main,
    },
    reasonSection: {
      marginBottom: spacing.md,
    },
    reasonText: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 22,
    },
    notesToggle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: "rgba(0, 0, 0, 0.05)",
      marginTop: spacing.sm,
    },
    notesToggleText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primary.main,
    },
    notesContent: {
      height: expandedHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100],
      }),
      overflow: "hidden",
    },
    notesText: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 22,
      paddingTop: spacing.sm,
    },
    buttonContainer: {
      marginTop: spacing.lg,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    actionButton: {
      flex: 1,
      marginHorizontal: spacing.xs,
      height: 56,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonLabel: {
      fontSize: 16,
      fontWeight: "600",
    },
  });

  const toggleNotes = () => {
    setExpanded(!expanded);
    Animated.timing(expandedHeight, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{appointment.status}</Text>
        </View>

        <Text style={styles.title}>Appointment Details</Text>
        <Text style={styles.subtitle}>
          {appointment.date} • {appointment.time}
        </Text>

        <View style={styles.doctorCard}>
          <Avatar.Image
            size={60}
            source={{
              uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(appointment.doctorName)}&background=0D8ABC&color=fff&bold=true`,
            }}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.doctorSpecialty}>{appointment.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingValue}>{appointment.rating}</Text>
              <Icon
                name="star"
                size={14}
                color="#FFD700"
                style={{ marginRight: spacing.xs }}
              />
              <Text style={styles.ratingCount}>
                ({appointment.reviews} reviews)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointment Info</Text>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{appointment.price}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="calendar" size={20} color={colors.primary.main} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailText}>{appointment.date}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon
                name="clock-outline"
                size={20}
                color={colors.primary.main}
              />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailText}>
                {appointment.time} ({appointment.duration})
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="video" size={20} color={colors.primary.main} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailText}>{appointment.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reason for Visit</Text>
          <View style={styles.reasonSection}>
            <Text style={styles.reasonText}>{appointment.reason}</Text>
          </View>

          <View style={styles.notesToggle}>
            <Text style={styles.notesToggleText}>Appointment Notes</Text>
            <TouchableOpacity onPress={toggleNotes}>
              <Icon
                name={expanded ? "chevron-up" : "chevron-down"}
                size={24}
                color={colors.primary.main}
              />
            </TouchableOpacity>
          </View>

          <Animated.View style={styles.notesContent}>
            <Text style={styles.notesText}>{appointment.notes}</Text>
          </Animated.View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: colors.background.paper,
                borderWidth: 1,
                borderColor: colors.primary.main,
                marginRight: spacing.sm,
              },
            ]}
            onPress={() => {}}
          >
            <LinearGradient
              colors={["transparent", "transparent"]}
              style={StyleSheet.absoluteFill}
            />
            <Icon
              name="calendar-clock"
              size={22}
              color={colors.primary.main}
              style={{ marginBottom: spacing.xs }}
            />
            <Text style={[styles.buttonLabel, { color: colors.primary.main }]}>
              Reschedule
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: colors.primary.main,
                marginLeft: spacing.sm,
              },
            ]}
            onPress={() => {}}
          >
            <LinearGradient
              colors={[colors.primary.light, colors.primary.main]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <Icon
              name="video"
              size={22}
              color="#fff"
              style={{ marginBottom: spacing.xs }}
            />
            <Text style={[styles.buttonLabel, { color: "#fff" }]}>
              Join Call
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
