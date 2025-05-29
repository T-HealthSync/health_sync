import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Text,
  useTheme,
  FAB,
  Portal,
  Modal,
  Button as PaperButton,
  Divider,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

import { Card } from "../components/Card";
import { colors, spacing } from "../theme/theme";

export const AppointmentsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      padding: spacing.md,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text.primary,
    },
    filterContainer: {
      flexDirection: "row",
      marginBottom: spacing.lg,
    },
    filterButton: {
      marginRight: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
    },
    filterButtonActive: {
      backgroundColor: colors.primary.main,
    },
    filterButtonText: {
      color: colors.text.secondary,
    },
    filterButtonTextActive: {
      color: colors.primary.contrast,
    },
    appointmentCard: {
      marginBottom: spacing.md,
    },
    appointmentHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    doctorInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    doctorAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary.light,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.sm,
    },
    doctorName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
    },
    doctorSpecialty: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    appointmentTime: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    appointmentActions: {
      flexDirection: "row",
      marginTop: spacing.sm,
    },
    actionButton: {
      flex: 1,
      marginRight: spacing.sm,
    },
    modalContainer: {
      backgroundColor: colors.background.paper,
      padding: spacing.lg,
      margin: spacing.lg,
      borderRadius: 12,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: spacing.lg,
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: spacing.lg,
    },
    modalButton: {
      marginLeft: spacing.sm,
    },
    greetingHeader: {
      marginBottom: spacing.md,
    },
    greeting: {
      fontSize: 16,
      color: colors.text.secondary,
    },
    reminderCard: {
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.lg,
      flexDirection: "row",
      alignItems: "center",
    },
    reminderIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary.light,
      justifyContent: "center",
      alignItems: "center",
      marginRight: spacing.md,
    },
    reminderContent: {
      flex: 1,
    },
    reminderTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: 4,
    },
    reminderText: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    appointmentTag: {
      paddingHorizontal: spacing.sm,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: colors.primary.light,
      alignSelf: "flex-start",
      marginTop: spacing.xs,
    },
    tagText: {
      color: colors.primary.main,
      fontSize: 12,
      fontWeight: "500",
    },
    upcomingLabel: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: spacing.sm,
      color: colors.text.primary,
    },
    additionalInfo: {
      marginTop: spacing.sm,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.grey[200],
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    infoIcon: {
      marginRight: spacing.xs,
      color: colors.text.secondary,
    },
    infoText: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    doctorModalContent: {
      backgroundColor: colors.background.paper,
      padding: spacing.lg,
      margin: spacing.md,
      borderRadius: 16,
      maxHeight: "80%",
    },
    doctorHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    doctorAvatar: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginRight: spacing.md,
    },
    doctorInfo: {
      flex: 1,
    },
    doctorName: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text.primary,
      marginBottom: 2,
    },
    doctorSpecialty: {
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: 4,
    },
    doctorRating: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingIcon: {
      color: "#FFC107",
      marginRight: 2,
    },
    ratingText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text.secondary,
    },
    doctorSection: {
      marginTop: spacing.md,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: spacing.sm,
      color: colors.text.primary,
    },
    doctorBio: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
      marginBottom: spacing.md,
    },
    separator: {
      height: 1,
      backgroundColor: colors.grey[200],
      marginVertical: spacing.md,
    },
    closeButton: {
      alignSelf: "flex-end",
      marginTop: spacing.md,
    },
  });

  const filters = ["Upcoming", "Past", "Cancelled"];
  const [selectedFilter, setSelectedFilter] = useState("Upcoming");

  const appointments = [
    {
      id: "1",
      doctor: {
        name: "Dr. Sarah Wilson",
        specialty: "Cardiology",
        avatar: "SW",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.9,
        bio: "Dr. Wilson is a board-certified cardiologist with over 15 years of experience treating heart conditions. She specializes in preventive cardiology and heart disease management.",
        location: "Heart & Vascular Institute, 123 Medical Center Dr",
        languages: ["English", "Spanish"],
      },
      date: "Today",
      time: "2:30 PM",
      type: "Video Consultation",
      reason: "Annual checkup",
      duration: "30 min",
    },
    {
      id: "2",
      doctor: {
        name: "Dr. Michael Chen",
        specialty: "Endocrinology",
        avatar: "MC",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.8,
        bio: "Dr. Chen specializes in diabetes management, thyroid disorders, and hormonal imbalances. He takes a holistic approach to endocrine health and emphasizes lifestyle modifications.",
        location: "Endocrine Specialists, 456 Health Parkway",
        languages: ["English", "Mandarin"],
      },
      date: "Tomorrow",
      time: "10:00 AM",
      type: "In-Person",
      reason: "Diabetes follow-up",
      duration: "45 min",
    },
  ];

  const openDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setVisible(true);
  };

  const renderDoctorModal = () => {
    if (!selectedDoctor) return null;

    return (
      <Modal
        visible={visible}
        onDismiss={() => {
          setVisible(false);
          setSelectedDoctor(null);
        }}
        contentContainerStyle={styles.doctorModalContent}
      >
        <ScrollView>
          <View style={styles.doctorHeader}>
            <Image
              source={{ uri: selectedDoctor.image }}
              style={styles.doctorAvatar}
            />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{selectedDoctor.name}</Text>
              <Text style={styles.doctorSpecialty}>
                {selectedDoctor.specialty}
              </Text>
              <View style={styles.doctorRating}>
                <Icon name="star" size={16} style={styles.ratingIcon} />
                <Text style={styles.ratingText}>{selectedDoctor.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.doctorSection}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.doctorBio}>{selectedDoctor.bio}</Text>
          </View>

          <Divider style={styles.separator} />

          <View style={styles.doctorSection}>
            <Text style={styles.sectionTitle}>Location</Text>
            <Text style={styles.infoText}>{selectedDoctor.location}</Text>
          </View>

          <Divider style={styles.separator} />

          <View style={styles.doctorSection}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.infoText}>
              {selectedDoctor.languages.join(", ")}
            </Text>
          </View>

          <PaperButton
            mode="contained"
            onPress={() => {
              setVisible(false);
              setSelectedDoctor(null);
            }}
            style={styles.closeButton}
          >
            Close
          </PaperButton>
        </ScrollView>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Appointments</Text>
        </View>

        <View style={styles.greetingHeader}>
          <Text style={styles.greeting}>Welcome back, Stephen</Text>
          <Text style={styles.title}>Your Medical Schedule</Text>
        </View>

        <View style={styles.reminderCard}>
          <View style={styles.reminderIcon}>
            <Icon name="pill" size={20} color={colors.primary.main} />
          </View>
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>Medication Reminder</Text>
            <Text style={styles.reminderText}>
              Take your blood pressure medication at 2:00 PM today
            </Text>
          </View>
        </View>

        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.filterButtonTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.upcomingLabel}>Upcoming Appointments</Text>

        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            style={styles.appointmentCard}
            onPress={() =>
              navigation.navigate("AppointmentDetails", {
                appointmentId: appointment.id,
              })
            }
          >
            <View style={styles.appointmentHeader}>
              <TouchableOpacity
                style={styles.doctorInfo}
                onPress={() => openDoctorDetails(appointment.doctor)}
              >
                <View style={styles.doctorAvatar}>
                  <Text
                    style={{ color: colors.primary.main, fontWeight: "600" }}
                  >
                    {appointment.doctor.avatar}
                  </Text>
                </View>
                <View>
                  <Text style={styles.doctorName}>
                    {appointment.doctor.name}
                  </Text>
                  <Text style={styles.doctorSpecialty}>
                    {appointment.doctor.specialty}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.appointmentTime}>
                {appointment.date} • {appointment.time}
              </Text>
            </View>

            <View style={styles.appointmentTag}>
              <Text style={styles.tagText}>{appointment.type}</Text>
            </View>

            <View style={styles.additionalInfo}>
              <View style={styles.infoRow}>
                <Icon name="calendar-clock" size={16} style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  Duration: {appointment.duration}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Icon
                  name="clipboard-text-outline"
                  size={16}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoText}>
                  Reason: {appointment.reason}
                </Text>
              </View>
            </View>

            <View style={styles.appointmentActions}>
              <PaperButton
                mode="outlined"
                style={styles.actionButton}
                onPress={() =>
                  navigation.navigate("Teleconsultation", {
                    doctorId: appointment.id,
                  })
                }
              >
                Join Call
              </PaperButton>
              <PaperButton
                mode="outlined"
                style={styles.actionButton}
                onPress={() => setVisible(true)}
              >
                Reschedule
              </PaperButton>
            </View>
          </Card>
        ))}
      </ScrollView>

      <Portal>
        {renderDoctorModal()}

        <Modal
          visible={visible && !selectedDoctor}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Reschedule Appointment</Text>
          {/* Add date and time picker components here */}
          <View style={styles.modalActions}>
            <PaperButton
              mode="outlined"
              onPress={() => setVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </PaperButton>
            <PaperButton
              mode="contained"
              onPress={() => setVisible(false)}
              style={styles.modalButton}
            >
              Confirm
            </PaperButton>
          </View>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: colors.primary.main,
        }}
        onPress={() => {
          // Handle new appointment
        }}
      />
    </View>
  );
};
