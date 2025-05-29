import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import {
  Text,
  TextInput,
  Button as PaperButton,
  useTheme,
} from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { colors, spacing } from "../theme/theme";
import { RootStackParamList } from "../navigation/types";
import { useAuth } from "../contexts/AuthContext";

export const SignupScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signup } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      padding: spacing.lg,
    },
    header: {
      alignItems: "center",
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 28,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "center",
    },
    form: {
      marginTop: spacing.lg,
    },
    input: {
      marginBottom: spacing.md,
      backgroundColor: colors.background.paper,
    },
    termsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    termsText: {
      flex: 1,
      fontSize: 14,
      color: colors.text.secondary,
      marginLeft: spacing.sm,
    },
    termsLink: {
      color: colors.primary.main,
    },
    signupButton: {
      marginTop: spacing.md,
    },
    loginContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: spacing.xl,
      marginBottom: spacing.xl,
    },
    loginText: {
      color: colors.text.secondary,
    },
    loginLink: {
      color: colors.primary.main,
      marginLeft: spacing.xs,
    },
  });

  const handleSignup = () => {
    if (password !== confirmPassword) {
      // In a real app, you'd show an error message
      return;
    }

    // Call signup from AuthContext
    signup?.(email, password, fullName);
    // Navigation happens in AuthContext after successful registration
  };

  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to start managing your health
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />
          <TextInput
            mode="outlined"
            label="Password"
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
          />
          <TextInput
            mode="outlined"
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
            left={<TextInput.Icon icon="lock-check" />}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />

          <TouchableOpacity
            style={styles.termsContainer}
            onPress={toggleTermsAccepted}
          >
            <Icon
              name={
                termsAccepted ? "checkbox-marked" : "checkbox-blank-outline"
              }
              size={24}
              color={colors.primary.main}
            />
            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <PaperButton
            mode="contained"
            onPress={handleSignup}
            style={styles.signupButton}
            disabled={
              !termsAccepted ||
              !email ||
              !password ||
              !confirmPassword ||
              !fullName
            }
          >
            Create Account
          </PaperButton>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
