import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Navigation } from "./src/navigation/Navigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import { ToastProvider } from "./src/components/Toast";
import { SplashScreen } from "./src/screens/SplashScreen";
import { theme } from "./src/theme/theme";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  // Handle when splash screen finishes
  const handleSplashFinish = () => {
    setIsAppReady(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <ToastProvider>
              {!isAppReady ? (
                <SplashScreen onFinish={handleSplashFinish} />
              ) : (
                <Navigation initialRoute="Main" />
              )}
              <StatusBar style="auto" />
            </ToastProvider>
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
