import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Text,
  List,
  Switch,
  Divider,
  Button as PaperButton,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, spacing } from "../theme/theme";
import { useAuth } from "../contexts/AuthContext";

export const SettingsScreen = () => {
  const { logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

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
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.secondary,
      marginBottom: spacing.xs,
      paddingHorizontal: spacing.sm,
    },
    listItem: {
      backgroundColor: colors.background.paper,
      paddingVertical: spacing.xs,
    },
    listItemFirst: {
      borderTopLeftRadius: spacing.sm,
      borderTopRightRadius: spacing.sm,
    },
    listItemLast: {
      borderBottomLeftRadius: spacing.sm,
      borderBottomRightRadius: spacing.sm,
    },
    logoutButton: {
      marginTop: spacing.md,
    },
    versionText: {
      textAlign: "center",
      color: colors.text.secondary,
      marginTop: spacing.xl,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <List.Item
            title="Notifications"
            description="Enable push notifications"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color={colors.primary.main}
              />
            )}
            style={[styles.listItem, styles.listItemFirst]}
          />
          <Divider />
          <List.Item
            title="Dark Mode"
            description="Use dark theme"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                color={colors.primary.main}
              />
            )}
            style={styles.listItem}
          />
          <Divider />
          <List.Item
            title="Biometric Authentication"
            description="Use fingerprint or face ID to login"
            left={(props) => <List.Icon {...props} icon="fingerprint" />}
            right={() => (
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                color={colors.primary.main}
              />
            )}
            style={[styles.listItem, styles.listItemLast]}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <List.Item
            title="Personal Information"
            description="Manage your personal details"
            left={(props) => <List.Icon {...props} icon="account" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={[styles.listItem, styles.listItemFirst]}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Data Sharing"
            description="Share your health data with providers"
            left={(props) => <List.Icon {...props} icon="share-variant" />}
            right={() => (
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
                color={colors.primary.main}
              />
            )}
            style={styles.listItem}
          />
          <Divider />
          <List.Item
            title="Change Password"
            description="Update your account password"
            left={(props) => <List.Icon {...props} icon="lock" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={[styles.listItem, styles.listItemLast]}
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          <List.Item
            title="Help Center"
            description="FAQs and support resources"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={[styles.listItem, styles.listItemFirst]}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Contact Support"
            description="Get help from our team"
            left={(props) => <List.Icon {...props} icon="headset" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={styles.listItem}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            description="How we handle your data"
            left={(props) => <List.Icon {...props} icon="shield" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={[styles.listItem, styles.listItemLast]}
            onPress={() => {}}
          />
        </View>

        <PaperButton
          mode="outlined"
          icon="logout"
          style={styles.logoutButton}
          onPress={logout}
        >
          Log Out
        </PaperButton>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};
