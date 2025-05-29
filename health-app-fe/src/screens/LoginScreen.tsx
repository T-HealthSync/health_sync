import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import {
  Text,
  TextInput,
  Button as PaperButton,
  useTheme,
} from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

import { colors, spacing } from "../theme/theme";
import { RootStackParamList } from "../navigation/types";
import { useAuth } from "../contexts/AuthContext";

const { width, height } = Dimensions.get("window");

export const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Animation values
  const logoAnim = new Animated.Value(0);
  const formAnim = new Animated.Value(0);
  const socialAnim = new Animated.Value(0);

  useEffect(() => {
    // Run animations sequentially
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(socialAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    backgroundGradient: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    content: {
      flex: 1,
      padding: spacing.lg,
      justifyContent: "center",
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    logoInner: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.primary.main,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 10,
    },
    logoBg: {
      position: "absolute",
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary.light,
    },
    logoIcon: {
      fontSize: 50,
      color: colors.primary.main,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      color: colors.text.primary,
      textAlign: "center",
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "center",
      marginBottom: spacing.xl,
    },
    form: {
      marginBottom: spacing.xl,
    },
    inputContainer: {
      marginBottom: spacing.md,
    },
    input: {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      borderRadius: 12,
      height: 56,
      borderColor: "rgba(255, 255, 255, 0.12)",
    },
    inputLabel: {
      fontSize: 14,
      marginBottom: spacing.xs,
      color: colors.text.secondary,
    },
    forgotPassword: {
      alignSelf: "flex-end",
      marginBottom: spacing.lg,
    },
    forgotPasswordText: {
      color: colors.primary.main,
      fontSize: 14,
    },
    loginButton: {
      marginTop: spacing.lg,
      borderRadius: 12,
      height: 56,
      justifyContent: "center",
    },
    loginButtonLabel: {
      fontSize: 16,
      fontWeight: "600",
    },
    orContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: spacing.xl,
    },
    orLine: {
      flex: 1,
      height: 1,
      backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
    orText: {
      marginHorizontal: spacing.md,
      color: colors.text.secondary,
    },
    socialButtons: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: spacing.xl,
    },
    socialButton: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: spacing.sm,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.12)",
    },
    signupContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: spacing.md,
    },
    signupText: {
      color: colors.text.secondary,
    },
    signupLink: {
      color: colors.primary.main,
      marginLeft: spacing.xs,
      fontWeight: "600",
    },
  });

  const handleLogin = () => {
    login?.(email, password);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          colors.primary.dark,
          colors.background.default,
          colors.background.default,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoAnim,
              transform: [
                {
                  translateY: logoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.logoInner}>
            <Animated.View
              style={[
                styles.logoBg,
                {
                  transform: [
                    {
                      scale: logoAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Icon name="heart-pulse" style={styles.logoIcon} />
          </View>
          <Text style={styles.title}>HealthSync</Text>
          <Text style={styles.subtitle}>Your personal health companion</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.form,
            {
              opacity: formAnim,
              transform: [
                {
                  translateY: formAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              mode="outlined"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
              outlineStyle={{ borderRadius: 12 }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              mode="outlined"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              outlineStyle={{ borderRadius: 12 }}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <PaperButton
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            labelStyle={styles.loginButtonLabel}
          >
            Sign In
          </PaperButton>
        </Animated.View>

        <Animated.View
          style={{
            opacity: socialAnim,
            transform: [
              {
                translateY: socialAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}
        >
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="google" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="apple" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};
