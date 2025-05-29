import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import { BlurView } from "expo-blur";
import { colors, shadows } from "../theme/theme";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextProps {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const TOAST_HEIGHT = 70;
const { width } = Dimensions.get("window");

const ToastItem = ({ toast, onHide }: { toast: Toast; onHide: () => void }) => {
  const translateY = useRef(new Animated.Value(-TOAST_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const duration = toast.duration || 3000;

    // Animate in with more dynamic animation
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 10,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto hide after duration
    const timer = setTimeout(() => {
      hideToast();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -TOAST_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return {
          backgroundColor: colors.success.light,
          iconName: "check-circle-outline",
          iconColor: colors.success.dark,
        };
      case "error":
        return {
          backgroundColor: colors.error.light,
          iconName: "alert-circle-outline",
          iconColor: colors.error.dark,
        };
      case "warning":
        return {
          backgroundColor: colors.warning.light,
          iconName: "alert-outline",
          iconColor: colors.warning.dark,
        };
      case "info":
      default:
        return {
          backgroundColor: colors.info.light,
          iconName: "information-outline",
          iconColor: colors.info.dark,
        };
    }
  };

  const { backgroundColor, iconName, iconColor } = getToastStyles();

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    >
      <BlurView intensity={90} style={styles.blurEffect}>
        <View
          style={[
            styles.toastInner,
            { backgroundColor: `${backgroundColor}ED` },
          ]}
        >
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            duration={2000}
            style={styles.iconContainer}
          >
            <Icon name={iconName} size={28} color={iconColor} />
          </Animatable.View>
          <Text style={styles.toastText}>{toast.message}</Text>
          <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
            <Icon name="close" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </BlurView>
    </Animated.View>
  );
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    type: ToastType = "info",
    duration = 3000
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <View style={styles.toastWrapper}>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onHide={() => hideToast(toast.id)}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastWrapper: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
  },
  toastContainer: {
    width: width - 40,
    minHeight: TOAST_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
    ...shadows.large,
  },
  blurEffect: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 16,
  },
  toastInner: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  toastContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  toastText: {
    flex: 1,
    marginLeft: 12,
    color: colors.text.primary,
    fontSize: 15,
    fontWeight: "500",
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
