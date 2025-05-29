import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Text, useTheme, Button as PaperButton } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { colors, spacing } from "../theme/theme";
import { useAuth } from "../contexts/AuthContext";
import { RootStackParamList } from "../navigation/types";

export const OnboardingScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { completeOnboarding } = useAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    slide: {
      width,
      padding: spacing.xl,
      alignItems: "center",
      justifyContent: "center",
    },
    iconContainer: {
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: colors.primary.light,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: 28,
      fontWeight: "600",
      color: colors.text.primary,
      textAlign: "center",
      marginBottom: spacing.md,
    },
    description: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "center",
      marginBottom: spacing.xl,
      lineHeight: 24,
    },
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: spacing.xl,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.grey[300],
      marginHorizontal: 4,
    },
    dotActive: {
      backgroundColor: colors.primary.main,
      width: 24,
    },
    buttonContainer: {
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xl,
    },
    skipButton: {
      marginBottom: spacing.md,
    },
  });

  const slides = [
    {
      id: "1",
      title: "Welcome to TeleHealth",
      description:
        "Your personal healthcare companion for managing chronic conditions and staying connected with your healthcare providers.",
      icon: "hospital-building",
    },
    {
      id: "2",
      title: "Track Your Health",
      description:
        "Monitor your vital signs, medications, and symptoms with our easy-to-use tracking tools and AI-powered insights.",
      icon: "heart-pulse",
    },
    {
      id: "3",
      title: "Connect with Doctors",
      description:
        "Schedule virtual consultations, chat with healthcare providers, and receive personalized care from the comfort of your home.",
      icon: "doctor",
    },
    {
      id: "4",
      title: "USSD Support",
      description:
        "Access basic features even without a smartphone through our USSD service, ensuring healthcare is accessible to everyone.",
      icon: "cellphone-basic",
    },
  ];

  const renderSlide = ({ item }: { item: (typeof slides)[0] }) => (
    <View style={styles.slide}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={80} color={colors.primary.main} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding?.();
      navigation.navigate("Home");
    }
  };

  const handleSkip = () => {
    completeOnboarding?.();
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width
          );
          setCurrentIndex(index);
        }}
      />

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <PaperButton mode="text" onPress={handleSkip} style={styles.skipButton}>
          Skip
        </PaperButton>
        <PaperButton mode="contained" onPress={handleNext}>
          {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
        </PaperButton>
      </View>
    </View>
  );
};
