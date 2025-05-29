import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Animated,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { colors, shadows } from "../theme/theme";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline" | "text" | "gradient";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  animation?: "pulse" | "bounce" | "flash" | "none";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "medium",
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
  animation = "none",
  loading = false,
}) => {
  const theme = useTheme();
  const [pressed, setPressed] = useState(false);

  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.6 : 1,
      overflow: "hidden",
    };

    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        minHeight: 32,
      },
      medium: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        minHeight: 40,
      },
      large: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        minHeight: 48,
      },
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: colors.primary.main,
        ...shadows.small,
      },
      secondary: {
        backgroundColor: colors.secondary.main,
        ...shadows.small,
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.primary.main,
      },
      text: {
        backgroundColor: "transparent",
        paddingHorizontal: 8,
      },
      gradient: {
        backgroundColor: "transparent",
        ...shadows.small,
      },
    };

    // Add pressed state styling
    const pressedStyle: ViewStyle =
      pressed && !disabled
        ? {
            transform: [{ scale: 0.98 }],
            opacity: 0.9,
          }
        : {};

    return StyleSheet.create({
      button: {
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...(fullWidth && { width: "100%" }),
        ...pressedStyle,
        ...style,
      },
      gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 10,
      },
      loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      iconContainer: {
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
      },
    });
  };

  const getTextStyle = () => {
    const baseStyle: TextStyle = {
      fontSize: 14,
      fontWeight: "600",
      letterSpacing: 0.3,
    };

    const sizeTextStyles: Record<string, TextStyle> = {
      small: {
        fontSize: 13,
      },
      medium: {
        fontSize: 14,
      },
      large: {
        fontSize: 16,
      },
    };

    const variantTextStyles: Record<string, TextStyle> = {
      primary: {
        color: colors.primary.contrast,
      },
      secondary: {
        color: colors.secondary.contrast,
      },
      outline: {
        color: colors.primary.main,
      },
      text: {
        color: colors.primary.main,
      },
      gradient: {
        color: "#FFFFFF",
      },
    };

    return StyleSheet.create({
      text: {
        ...baseStyle,
        ...sizeTextStyles[size],
        ...variantTextStyles[variant],
        ...textStyle,
      },
    });
  };

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  const styles = getButtonStyle();
  const textStyles = getTextStyle();

  const renderContent = () => (
    <>
      {variant === "gradient" && (
        <LinearGradient
          colors={[colors.primary.main, colors.primary.dark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      )}
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={textStyles.text}>{title}</Text>
      {loading && (
        <View style={styles.loadingOverlay}>
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            duration={1000}
          >
            {/* Loading indicator */}
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.primary.main,
              }}
            />
          </Animatable.View>
        </View>
      )}
    </>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={disabled || loading ? undefined : onPress}
      disabled={disabled || loading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.button}
    >
      {animation !== "none" ? (
        <Animatable.View
          animation={animation}
          iterationCount={animation === "pulse" ? "infinite" : 1}
          duration={2000}
        >
          {renderContent()}
        </Animatable.View>
      ) : (
        <View>{renderContent()}</View>
      )}
    </TouchableOpacity>
  );
};
