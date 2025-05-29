import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
  const [user, setUser] = useState<any | null>({
    id: "1",
    email: "user@example.com",
    fullName: "Test User",
  });

  useEffect(() => {
    // Check for stored auth state on app launch
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const [authToken, onboardingCompleted, userData] = await Promise.all([
        AsyncStorage.getItem("authToken"),
        AsyncStorage.getItem("onboardingCompleted"),
        AsyncStorage.getItem("userData"),
      ]);

      // Only update if values exist, otherwise keep defaults
      if (authToken !== null) {
        setIsAuthenticated(!!authToken);
      }

      if (onboardingCompleted !== null) {
        setHasCompletedOnboarding(onboardingCompleted === "true");
      }

      if (userData !== null) {
        setUser(JSON.parse(userData));
      } else {
        // Store default user data if not present
        const defaultUser = {
          id: "1",
          email: "user@example.com",
          fullName: "Test User",
        };
        await AsyncStorage.setItem("authToken", "default-token");
        await AsyncStorage.setItem("userData", JSON.stringify(defaultUser));
        await AsyncStorage.setItem("onboardingCompleted", "true");
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual API call
      // For now, we'll just simulate a successful login
      const mockUser = {
        id: "1",
        email,
        fullName: "John Doe",
      };

      await AsyncStorage.setItem("authToken", "mock-token");
      await AsyncStorage.setItem("userData", JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      // TODO: Implement actual API call
      // For now, we'll just simulate a successful signup
      const mockUser = {
        id: "1",
        email,
        fullName,
      };

      await AsyncStorage.setItem("authToken", "mock-token");
      await AsyncStorage.setItem("userData", JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["authToken", "userData"]);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        hasCompletedOnboarding,
        user,
        login,
        signup,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
