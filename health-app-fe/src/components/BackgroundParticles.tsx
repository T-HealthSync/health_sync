import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { colors } from "../theme/theme";

const { width, height } = Dimensions.get("window");

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: Animated.Value;
  position: Animated.ValueXY;
}

interface BackgroundParticlesProps {
  count?: number;
  color?: string;
  maxSize?: number;
  minSize?: number;
  style?: object;
}

export const BackgroundParticles = ({
  count = 25,
  color = colors.primary.main,
  maxSize = 8,
  minSize = 2,
  style = {},
}: BackgroundParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastTime = useRef<number>(Date.now());

  useEffect(() => {
    // Create particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push(createParticle(i));
    }
    setParticles(newParticles);

    // Start animation
    animateParticles();

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count]);

  const createParticle = (id: number): Particle => {
    const size = Math.random() * (maxSize - minSize) + minSize;
    const speed = Math.random() * 0.5 + 0.1;

    return {
      id,
      x: Math.random() * width,
      y: Math.random() * height,
      size,
      speed,
      opacity: new Animated.Value(Math.random() * 0.5 + 0.1),
      position: new Animated.ValueXY({
        x: Math.random() * width,
        y: Math.random() * height,
      }),
    };
  };

  const animateParticles = () => {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTime.current) / 1000;
    lastTime.current = currentTime;

    // Update particle positions
    particles.forEach((particle) => {
      const newY = particle.y - particle.speed * deltaTime * 30;

      // Reset particle if it goes off screen
      if (newY < -particle.size) {
        particle.y = height + particle.size;
        particle.x = Math.random() * width;
      } else {
        particle.y = newY;
      }

      // Update Animated value
      particle.position.setValue({ x: particle.x, y: particle.y });

      // Pulse opacity
      Animated.sequence([
        Animated.timing(particle.opacity, {
          toValue: Math.random() * 0.4 + 0.1,
          duration: Math.random() * 2000 + 1000,
          useNativeDriver: true,
        }),
        Animated.timing(particle.opacity, {
          toValue: Math.random() * 0.2 + 0.05,
          duration: Math.random() * 2000 + 1000,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Request next animation frame
    animationRef.current = requestAnimationFrame(animateParticles);
  };

  return (
    <View style={[styles.container, style]}>
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              width: particle.size,
              height: particle.size,
              borderRadius: particle.size / 2,
              backgroundColor: color,
              opacity: particle.opacity,
              transform: [
                { translateX: particle.position.x },
                { translateY: particle.position.y },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  particle: {
    position: "absolute",
    backgroundColor: colors.primary.main,
  },
});
