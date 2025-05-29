import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button as PaperButton, TextInput } from "react-native-paper";
import { useRoute, RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootStackParamList } from "../navigation/types";
import { colors, spacing } from "../theme/theme";
import { Card } from "../components/Card";

type TeleconsultationRouteProp = RouteProp<
  RootStackParamList,
  "Teleconsultation"
>;

export const TeleconsultationScreen = () => {
  const route = useRoute<TeleconsultationRouteProp>();
  const { doctorId } = route.params;
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "doctor",
      text: "Hello! How are you feeling today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: "2",
      sender: "user",
      text: "I'm feeling better than last week, but still have some discomfort.",
      timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    },
    {
      id: "3",
      sender: "doctor",
      text: "I'm glad to hear you're feeling better. Let's discuss your symptoms in detail.",
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    },
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      padding: spacing.md,
      flex: 1,
    },
    header: {
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.secondary,
    },
    videoContainer: {
      height: 300,
      backgroundColor: colors.grey[800],
      borderRadius: spacing.sm,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    doctorVideo: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "transparent",
    },
    userVideoPreview: {
      position: "absolute",
      width: 100,
      height: 150,
      backgroundColor: colors.grey[700],
      borderRadius: spacing.xs,
      bottom: spacing.sm,
      right: spacing.sm,
    },
    callControls: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: spacing.lg,
    },
    controlButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    muteButton: {
      backgroundColor: isMuted ? colors.grey[600] : colors.grey[800],
    },
    videoButton: {
      backgroundColor: isVideoEnabled ? colors.grey[800] : colors.grey[600],
    },
    endCallButton: {
      backgroundColor: colors.error.main,
    },
    chatContainer: {
      flex: 1,
      marginBottom: spacing.md,
    },
    startCallContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.xl,
    },
    doctorInfo: {
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    doctorAvatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.grey[300],
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    doctorName: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    doctorSpecialty: {
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: spacing.md,
    },
    message: {
      padding: spacing.sm,
      borderRadius: spacing.sm,
      marginBottom: spacing.sm,
      maxWidth: "80%",
    },
    userMessage: {
      backgroundColor: colors.primary.main,
      alignSelf: "flex-end",
    },
    doctorMessage: {
      backgroundColor: colors.background.paper,
      alignSelf: "flex-start",
    },
    messageText: {
      fontSize: 16,
    },
    userMessageText: {
      color: colors.primary.contrast,
    },
    doctorMessageText: {
      color: colors.text.primary,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      backgroundColor: colors.background.paper,
      marginRight: spacing.sm,
    },
  });

  const startCall = () => {
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: "user",
        text: message,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  // Mock doctor data (in a real app, this would come from an API)
  const doctor = {
    id: doctorId,
    name: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    avatarUrl: null,
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Teleconsultation</Text>
          <Text style={styles.subtitle}>Consultation with {doctor.name}</Text>
        </View>

        {isCallActive ? (
          <>
            <View style={styles.videoContainer}>
              <View style={styles.doctorVideo} />
              <View style={styles.userVideoPreview} />
            </View>

            <View style={styles.callControls}>
              <TouchableOpacity
                style={[styles.controlButton, styles.muteButton]}
                onPress={toggleMute}
              >
                <Icon
                  name={isMuted ? "microphone-off" : "microphone"}
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.controlButton, styles.videoButton]}
                onPress={toggleVideo}
              >
                <Icon
                  name={isVideoEnabled ? "video" : "video-off"}
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.controlButton, styles.endCallButton]}
                onPress={endCall}
              >
                <Icon name="phone-hangup" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.startCallContainer}>
            <View style={styles.doctorInfo}>
              <View style={styles.doctorAvatar}>
                <Icon name="doctor" size={50} color={colors.grey[500]} />
              </View>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            </View>
            <PaperButton mode="contained" icon="video" onPress={startCall}>
              Start Video Call
            </PaperButton>
          </View>
        )}

        <Card title="Chat">
          <ScrollView style={styles.chatContainer}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.message,
                  msg.sender === "user"
                    ? styles.userMessage
                    : styles.doctorMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.sender === "user"
                      ? styles.userMessageText
                      : styles.doctorMessageText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
            />
            <PaperButton icon="send" mode="contained" onPress={sendMessage}>
              Send
            </PaperButton>
          </View>
        </Card>
      </View>
    </View>
  );
};
