import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";

import { RootStackParamList, MainTabParamList } from "./types";
import { colors } from "../theme/theme";
import { useAuth } from "../contexts/AuthContext";

// Import screens
import { LoginScreen } from "../screens/LoginScreen";
import { SignupScreen } from "../screens/SignupScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { HealthScreen } from "../screens/HealthScreen";
import { AppointmentsScreen } from "../screens/AppointmentsScreen";
import { AIScreen } from "../screens/AIScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TeleconsultationScreen } from "../screens/TeleconsultationScreen";
import { AppointmentDetailsScreen } from "../screens/AppointmentDetailsScreen";
import { HealthTrackingScreen } from "../screens/HealthTrackingScreen";
import { AIInsightsScreen } from "../screens/AIInsightsScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { USSDSupportScreen } from "../screens/USSDSupportScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom tab bar animation
interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  name: string;
}

const TabBarIcon = ({ focused, color, size, name }: TabBarIconProps) => {
  return (
    <Animatable.View
      animation={focused ? "pulse" : undefined}
      iterationCount={focused ? "infinite" : 1}
      duration={1500}
      style={styles.tabIconContainer}
    >
      <Icon name={name} size={size} color={color} />
    </Animatable.View>
  );
};

const MainTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.grey[600],
        tabBarStyle: {
          backgroundColor: colors.background.paper,
          borderTopWidth: 0,
          elevation: 8,
          shadowOpacity: 0.1,
          height: 60,
          paddingBottom: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        headerStyle: {
          backgroundColor: colors.background.paper,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: colors.text.primary,
          fontSize: 20,
          fontWeight: "600",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Health"
        component={HealthScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              name="heart-pulse"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              name="calendar"
            />
          ),
        }}
      />
      <Tab.Screen
        name="AI"
        component={AIScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              name="brain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              name="account"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

interface NavigationProps {
  initialRoute?: keyof RootStackParamList;
}

export const Navigation: React.FC<NavigationProps> = ({
  initialRoute = "Login",
}) => {
  const { isAuthenticated, hasCompletedOnboarding } = useAuth();

  // Screen transition animations
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    contentStyle: { backgroundColor: colors.background.default },
    animation: "slide_from_right",
    animationDuration: 200,
    gestureEnabled: true,
    gestureDirection: "horizontal" as any, // Type assertion to bypass type check
  };

  // Determine the initial route
  let actualInitialRoute = initialRoute;
  if (isAuthenticated) {
    actualInitialRoute = hasCompletedOnboarding ? "Main" : "Onboarding";
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={actualInitialRoute}
        screenOptions={screenOptions}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : !hasCompletedOnboarding ? (
          // Onboarding Stack
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          // Main App Stack
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{
                animation: "fade",
              }}
            />
            <Stack.Screen
              name="Teleconsultation"
              component={TeleconsultationScreen}
              options={{
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen
              name="AppointmentDetails"
              component={AppointmentDetailsScreen}
            />
            <Stack.Screen
              name="HealthTracking"
              component={HealthTrackingScreen}
            />
            <Stack.Screen name="AIInsights" component={AIInsightsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen name="USSDSupport" component={USSDSupportScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLogo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
});
