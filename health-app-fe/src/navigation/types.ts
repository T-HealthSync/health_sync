export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
  Home: undefined;
  Main: undefined;
  Teleconsultation: { doctorId: string };
  AppointmentDetails: { appointmentId: string };
  HealthTracking: { date?: string };
  AIInsights: undefined;
  Profile: undefined;
  Settings: undefined;
  Notifications: undefined;
  USSDSupport: undefined;
};

export type MainTabParamList = {
  Health: undefined;
  Appointments: undefined;
  AI: undefined;
  Profile: undefined;
}; 