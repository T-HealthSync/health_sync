import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Animated,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { colors, shadows } from "../theme/theme";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "flat" | "gradient";
  style?: ViewStyle;
  onPress?: () => void;
  animation?: "fadeIn" | "slideInUp" | "zoomIn" | "pulse" | "none";
  animationDelay?: number;
  animationDuration?: number;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  variant = "elevated",
  style,
  onPress,
  animation = "none",
  animationDelay = 0,
  animationDuration = 500,
}) => {
  const theme = useTheme();
  const [pressedIn, setPressedIn] = useState(false);

  const getCardStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 20,
      padding: 16,
      backgroundColor: colors.background.paper,
      overflow: "hidden",
    };

    const variantStyles: Record<string, ViewStyle> = {
      elevated: {
        ...shadows.card,
        borderWidth: 0,
      },
      outlined: {
        borderWidth: 1,
        borderColor: colors.grey[300],
      },
      flat: {
        backgroundColor: colors.background.default,
      },
      gradient: {
        backgroundColor: colors.background.paper,
      },
    };

    // Add pressed-in state styling
    const pressedStyle: ViewStyle =
      onPress && pressedIn
        ? {
            transform: [{ scale: 0.98 }],
            backgroundColor:
              variant === "flat" ? colors.grey[200] : colors.background.paper,
          }
        : {};

    return StyleSheet.create({
      container: {
        ...baseStyle,
        ...variantStyles[variant],
        ...pressedStyle,
        ...style,
      },
      header: {
        marginBottom: 14,
      },
      title: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.text.primary,
        marginBottom: 2,
      },
      subtitle: {
        fontSize: 14,
        color: colors.text.secondary,
      },
    });
  };

  const styles = getCardStyle();

  const handlePressIn = () => {
    if (onPress) {
      setPressedIn(true);
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      setPressedIn(false);
    }
  };

  const CardContainer = animation !== "none" ? Animatable.View : View;
  const animationProps =
    animation !== "none"
      ? {
          animation,
          delay: animationDelay,
          duration: animationDuration,
          useNativeDriver: true,
        }
      : {};

  const renderCardContent = () => (
    <CardContainer style={styles.container} {...animationProps}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </CardContainer>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {renderCardContent()}
      </TouchableOpacity>
    );
  }

  return renderCardContent();
};
