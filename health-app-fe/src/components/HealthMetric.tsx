import React, { useEffect, useRef } from "react";
import { StyleSheet, View, ViewStyle, Animated } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import { colors, shadows } from "../theme/theme";

interface HealthMetricProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: string;
  trend?: "up" | "down" | "stable";
  status?: "normal" | "warning" | "critical";
  style?: ViewStyle;
}

export const HealthMetric: React.FC<HealthMetricProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  status = "normal",
  style,
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const iconPulseAnim = useRef();

  useEffect(() => {
    // Animate in when component mounts
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Start pulse animation for icon if ref is available
    if (iconPulseAnim.current) {
      iconPulseAnim.current.pulse(1500);
    }
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "normal":
        return colors.success.main;
      case "warning":
        return colors.warning.main;
      case "critical":
        return colors.error.main;
      default:
        return colors.text.primary;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "trending-up";
      case "down":
        return "trending-down";
      case "stable":
        return "trending-neutral";
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return colors.success.main;
      case "down":
        return colors.error.main;
      case "stable":
        return colors.info.main;
      default:
        return colors.text.secondary;
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.paper,
      borderRadius: 20,
      padding: 16,
      ...shadows.small,
      ...style,
    },
    innerContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 16,
      backgroundColor: colors.primary.main + "15",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.text.secondary,
      marginBottom: 4,
    },
    valueContainer: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    value: {
      fontSize: 22,
      fontWeight: "700",
      color: getStatusColor(),
      marginRight: 4,
    },
    unit: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    trendContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 8,
      backgroundColor: `${getTrendColor()}15`,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 12,
    },
    trendIcon: {
      marginRight: 2,
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.innerContainer}>
        {icon && (
          <Animatable.View ref={iconPulseAnim} style={styles.iconContainer}>
            <Icon name={icon} size={24} color={colors.primary.main} />
          </Animatable.View>
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
            {unit && <Text style={styles.unit}>{unit}</Text>}
            {trend && (
              <Animatable.View
                style={styles.trendContainer}
                animation={
                  trend === "up"
                    ? "bounceIn"
                    : trend === "down"
                      ? "fadeIn"
                      : "pulse"
                }
                iterationCount={trend === "stable" ? "infinite" : 1}
                duration={1500}
              >
                <Icon
                  name={getTrendIcon()}
                  size={14}
                  color={getTrendColor()}
                  style={styles.trendIcon}
                />
              </Animatable.View>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
