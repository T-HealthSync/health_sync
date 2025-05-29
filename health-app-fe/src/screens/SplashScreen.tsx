import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Text } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/theme";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onFinish?: () => void;
}

const Particles = () => {
  const particles = Array(40)
    .fill(0)
    .map((_, i) => ({
      id: i,
      size: Math.random() * 12 + 2,
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 10,
      duration: Math.random() * 3000 + 3000,
      delay: Math.random() * 2000,
      rotateX: Math.random() * 360,
      rotateY: Math.random() * 360,
      rotateZ: Math.random() * 360,
    }));

  return (
    <View style={styles.particlesContainer}>
      {particles.map((particle) => (
        <Animatable.View
          key={particle.id}
          style={[
            styles.particle,
            {
              width: particle.size,
              height: particle.size,
              borderRadius: particle.size / 2,
              left: particle.x,
              top: particle.y,
              zIndex: Math.floor(particle.z),
              backgroundColor: `rgba(59, 130, 246, ${Math.random() * 0.6 + 0.1})`,
            },
          ]}
          animation={{
            0: {
              opacity: 0,
              scale: 0,
              translateX: -20,
              translateY: -20,
              rotateX: `${particle.rotateX}deg`,
              rotateY: `${particle.rotateY}deg`,
              rotateZ: `${particle.rotateZ}deg`,
            },
            0.5: {
              opacity: 0.7,
              scale: 1,
              translateX: 20,
              translateY: 20,
              rotateX: "0deg",
              rotateY: "0deg",
              rotateZ: "0deg",
            },
            1: {
              opacity: 0,
              scale: 0,
              translateX: -20,
              translateY: -20,
              rotateX: `${-particle.rotateX}deg`,
              rotateY: `${-particle.rotateY}deg`,
              rotateZ: `${-particle.rotateZ}deg`,
            },
          }}
          duration={particle.duration}
          delay={particle.delay}
          iterationCount="infinite"
          useNativeDriver
          easing="ease-in-out"
        />
      ))}
    </View>
  );
};

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const logoAnimation = useRef(null);
  const pulseAnim = {
    0: { scale: 1 },
    0.5: { scale: 1.1 },
    1: { scale: 1 },
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          colors.background.default,
          colors.background.paper,
          colors.primary.light,
        ]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Particles />

        <Animatable.View
          animation="fadeIn"
          duration={1500}
          style={styles.contentContainer}
        >
          {/* App Logo */}
          <Animatable.View
            ref={logoAnimation}
            animation={pulseAnim}
            easing="ease-in-out"
            iterationCount="infinite"
            duration={3000}
            style={styles.logoContainer}
          >
            <View style={styles.logoShadow}>
              <View style={styles.logo}>
                <Image
                  source={require("../assets/images/logo.png")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </Animatable.View>

          {/* App Name with Staggered Animation */}
          <Animatable.View
            animation="fadeInUp"
            delay={500}
            duration={800}
            style={styles.titleContainer}
          >
            <Text style={styles.title}>HealthApp</Text>
            <Animatable.Text
              animation="fadeIn"
              delay={1200}
              duration={800}
              style={styles.subtitle}
            >
              Your Health, Your Way
            </Animatable.Text>
          </Animatable.View>

          {/* Loading Animation */}
          <Animatable.View
            animation="fadeIn"
            delay={1500}
            style={styles.loadingContainer}
          >
            <View style={styles.loadingBar}>
              <Animatable.View
                animation={{
                  0: { width: "0%" },
                  1: { width: "100%" },
                }}
                duration={2000}
                style={styles.loadingProgress}
              />
            </View>
          </Animatable.View>
        </Animatable.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  particlesContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  particle: {
    position: "absolute",
    backgroundColor: colors.primary.light,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  logoShadow: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(42, 157, 143, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary.dark,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    overflow: "hidden",
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  logoText: {
    fontSize: 60,
    fontWeight: "bold",
    color: colors.primary.main,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  loadingContainer: {
    width: "80%",
    alignItems: "center",
  },
  loadingBar: {
    height: 6,
    width: "100%",
    backgroundColor: colors.grey[200],
    borderRadius: 3,
    overflow: "hidden",
  },
  loadingProgress: {
    height: "100%",
    backgroundColor: colors.primary.main,
    borderRadius: 3,
  },
});
