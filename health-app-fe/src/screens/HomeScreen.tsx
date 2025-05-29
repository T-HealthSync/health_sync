import React, { useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import {
  Text,
  useTheme,
  Button as PaperButton,
  Avatar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import { Card } from "../components/Card";
import { HealthMetric } from "../components/HealthMetric";
import { Button } from "../components/Button";
import { BackgroundParticles } from "../components/BackgroundParticles";
import { useToast } from "../components/Toast";
import { colors, spacing } from "../theme/theme";

const { width } = Dimensions.get("window");

export const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    // Show welcome toast when screen loads
    toast.showToast("Welcome back to your health dashboard", "success", 3000);
  }, []);

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
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
    userSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      backgroundColor: colors.primary.main,
      marginRight: spacing.md,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text.primary,
    },
    nameText: {
      fontSize: 16,
      color: colors.text.secondary,
      marginTop: 4,
    },
    notificationButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.background.paper,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    searchContainer: {
      flexDirection: "row",
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      padding: spacing.sm,
      alignItems: "center",
      marginBottom: spacing.lg,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    searchIcon: {
      marginHorizontal: spacing.sm,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text.secondary,
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: spacing.md,
    },
    categoriesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -4,
      marginBottom: spacing.lg,
    },
    categoryItem: {
      width: width / 4 - spacing.md,
      alignItems: "center",
      marginHorizontal: 4,
      marginBottom: spacing.md,
    },
    categoryIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.xs,
      backgroundColor: colors.primary.light + "30",
    },
    categoryIcon: {
      color: colors.primary.main,
    },
    categoryLabel: {
      fontSize: 12,
      textAlign: "center",
      color: colors.text.secondary,
      marginTop: 4,
    },
    metricsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -spacing.sm,
      marginBottom: spacing.lg,
    },
    metricItem: {
      width: "50%",
      paddingHorizontal: spacing.sm,
      marginBottom: spacing.md,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text.primary,
    },
    seeAllButton: {
      color: colors.primary.main,
      fontSize: 14,
    },
    upcomingAppointments: {
      marginBottom: spacing.md,
    },
    appointmentCard: {
      marginBottom: spacing.sm,
    },
    doctorItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background.paper,
      borderRadius: 16,
      padding: spacing.md,
      marginBottom: spacing.md,
      ...theme.shadows.card,
    },
    doctorAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: spacing.md,
    },
    doctorInfo: {
      flex: 1,
    },
    doctorName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
    },
    doctorSpecialty: {
      fontSize: 14,
      color: colors.text.secondary,
      marginVertical: 2,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      marginLeft: 4,
      fontSize: 12,
      color: colors.text.secondary,
    },
    bookButton: {
      marginLeft: spacing.md,
    },
    gradientHeader: {
      width: "100%",
      height: 180,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: -1,
    },
  });

  const categories = [
    { icon: "heart-pulse", name: "Cardiology" },
    { icon: "tooth", name: "Dentistry" },
    { icon: "eye", name: "Ophthalmology" },
    { icon: "brain", name: "Neurology" },
    { icon: "bone", name: "Orthopedics" },
    { icon: "needle", name: "Dermatology" },
    { icon: "stomach", name: "Gastro" },
    { icon: "magnify", name: "More" },
  ];

  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      rating: 4.9,
      reviews: 120,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: "2",
      name: "Dr. John Smith",
      specialty: "Neurologist",
      rating: 4.7,
      reviews: 98,
      avatar: "https://randomuser.me/api/portraits/men/38.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      <BackgroundParticles
        count={10}
        color={colors.primary.light}
        maxSize={6}
        minSize={2}
      />

      <LinearGradient
        colors={[colors.primary.light + "30", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientHeader}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Animatable.View
            animation="fadeIn"
            duration={800}
            style={styles.header}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.welcomeText}>Hello, John</Text>
                <Text style={styles.nameText}>How are you today?</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate("Notifications")}
            >
              <Icon name="bell" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View
            animation="fadeIn"
            delay={200}
            duration={800}
            style={styles.searchContainer}
          >
            <Icon
              name="magnify"
              size={24}
              color={colors.text.secondary}
              style={styles.searchIcon}
            />
            <Text style={styles.searchInput}>Looking for a doctor?</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={300} duration={800}>
            <Text style={styles.categoryTitle}>Categories</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPress={() => {
                    toast.showToast(`${category.name} selected`, "info", 2000);
                  }}
                >
                  <Animatable.View
                    animation="fadeIn"
                    delay={400 + index * 50}
                    style={styles.categoryIconContainer}
                  >
                    <Icon
                      name={category.icon}
                      size={28}
                      style={styles.categoryIcon}
                    />
                  </Animatable.View>
                  <Text style={styles.categoryLabel}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={500} duration={800}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Health</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.metricsGrid}>
              {[
                {
                  title: "Heart Rate",
                  value: 72,
                  unit: "bpm",
                  icon: "heart-pulse",
                  trend: "stable",
                  status: "normal",
                  delay: 600,
                },
                {
                  title: "Blood Pressure",
                  value: "120/80",
                  unit: "mmHg",
                  icon: "heart",
                  status: "normal",
                  delay: 700,
                },
                {
                  title: "Blood Sugar",
                  value: 95,
                  unit: "mg/dL",
                  icon: "needle",
                  trend: "down",
                  status: "normal",
                  delay: 800,
                },
                {
                  title: "Temperature",
                  value: 98.6,
                  unit: "°F",
                  icon: "thermometer",
                  status: "normal",
                  delay: 900,
                },
              ].map((metric, index) => (
                <Animatable.View
                  key={metric.title}
                  style={styles.metricItem}
                  animation="fadeInUp"
                  delay={metric.delay}
                  duration={500}
                >
                  <HealthMetric
                    title={metric.title}
                    value={metric.value}
                    unit={metric.unit}
                    icon={metric.icon}
                    trend={metric.trend}
                    status={metric.status}
                  />
                </Animatable.View>
              ))}
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={1000} duration={800}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Doctors</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>

            {doctors.map((doctor, index) => (
              <Animatable.View
                key={doctor.id}
                animation="fadeInUp"
                delay={1100 + index * 100}
                duration={500}
              >
                <View style={styles.doctorItem}>
                  <Image
                    source={{ uri: doctor.avatar }}
                    style={styles.doctorAvatar}
                  />
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorSpecialty}>
                      {doctor.specialty}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Icon name="star" size={14} color="#F59E0B" />
                      <Text style={styles.ratingText}>
                        {doctor.rating} ({doctor.reviews} reviews)
                      </Text>
                    </View>
                  </View>
                  <Button
                    title="Book Now"
                    variant="primary"
                    size="small"
                    style={styles.bookButton}
                    onPress={() =>
                      navigation.navigate("Teleconsultation", {
                        doctorId: doctor.id,
                      })
                    }
                  />
                </View>
              </Animatable.View>
            ))}
          </Animatable.View>
        </View>
      </ScrollView>
    </View>
  );
};
