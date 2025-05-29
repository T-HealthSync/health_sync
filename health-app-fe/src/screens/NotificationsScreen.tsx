import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Button as PaperButton, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../theme/theme";

export const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Appointment Reminder",
      message:
        "You have an appointment with Dr. Sarah Wilson tomorrow at 2:30 PM.",
      timestamp: "2023-06-14T10:30:00Z",
      read: false,
      type: "appointment",
    },
    {
      id: "2",
      title: "Medication Reminder",
      message: "It's time to take your evening medication.",
      timestamp: "2023-06-14T08:00:00Z",
      read: true,
      type: "medication",
    },
    {
      id: "3",
      title: "New Message",
      message:
        "Dr. Sarah Wilson sent you a message regarding your last appointment.",
      timestamp: "2023-06-13T15:45:00Z",
      read: false,
      type: "message",
    },
    {
      id: "4",
      title: "Health Metric Alert",
      message:
        "Your blood pressure reading is higher than usual. Consider resting and measuring again in 30 minutes.",
      timestamp: "2023-06-12T14:20:00Z",
      read: true,
      type: "alert",
    },
    {
      id: "5",
      title: "Teleconsultation Available",
      message:
        "Your requested teleconsultation with Dr. Michael Chen is now available.",
      timestamp: "2023-06-11T09:10:00Z",
      read: true,
      type: "teleconsultation",
    },
    {
      id: "6",
      title: "Prescription Refill",
      message:
        "Your prescription refill has been approved and is ready for pickup.",
      timestamp: "2023-06-10T11:30:00Z",
      read: true,
      type: "medication",
    },
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      padding: spacing.md,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text.primary,
    },
    clearButton: {
      marginLeft: spacing.md,
    },
    notificationItem: {
      flexDirection: "row",
      padding: spacing.md,
      backgroundColor: colors.background.paper,
      borderRadius: spacing.sm,
      marginBottom: spacing.sm,
    },
    notificationUnread: {
      borderLeftWidth: 4,
      borderLeftColor: colors.primary.main,
    },
    notificationIcon: {
      marginRight: spacing.md,
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    notificationMessage: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: spacing.xs,
    },
    notificationTime: {
      fontSize: 12,
      color: colors.text.disabled,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.xl * 2,
    },
    emptyIcon: {
      marginBottom: spacing.md,
    },
    emptyText: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "center",
    },
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment":
        return "calendar-clock";
      case "medication":
        return "pill";
      case "message":
        return "chat";
      case "alert":
        return "alert-circle";
      case "teleconsultation":
        return "video";
      default:
        return "bell";
    }
  };

  const getNotificationIconColor = (type) => {
    switch (type) {
      case "appointment":
        return colors.primary.main;
      case "medication":
        return colors.success.main;
      case "message":
        return colors.info.main;
      case "alert":
        return colors.error.main;
      case "teleconsultation":
        return colors.warning.main;
      default:
        return colors.grey[500];
    }
  };

  const formatTime = (timestamp) => {
    // Simple time formatting, in a real app use a proper date library
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <View style={{ flexDirection: "row" }}>
              <PaperButton
                mode="text"
                onPress={markAllAsRead}
                disabled={!notifications.some((n) => !n.read)}
              >
                Mark All Read
              </PaperButton>
              <PaperButton
                icon="delete"
                mode="text"
                onPress={clearAllNotifications}
                style={styles.clearButton}
                disabled={notifications.length === 0}
              >
                Clear All
              </PaperButton>
            </View>
          </View>

          {notifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon
                name="bell-off"
                size={48}
                color={colors.grey[400]}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>
                You don't have any notifications at the moment.
              </Text>
            </View>
          ) : (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.notificationUnread,
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <Icon
                  name={getNotificationIcon(notification.type)}
                  size={24}
                  color={getNotificationIconColor(notification.type)}
                  style={styles.notificationIcon}
                />
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {formatTime(notification.timestamp)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};
