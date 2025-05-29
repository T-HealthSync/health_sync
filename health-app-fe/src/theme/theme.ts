import { DefaultTheme } from 'react-native-paper';

export const colors = {
  primary: {
    main: '#2A9D8F', // Teal color from the image
    light: '#8EDED4',
    dark: '#1F7268',
    contrast: '#FFFFFF',
  },
  secondary: {
    main: '#E76F51', // Coral accent color from the image
    light: '#F4A48A',
    dark: '#B5472F',
    contrast: '#FFFFFF',
  },
  background: {
    default: '#F9FAFB',
    paper: '#FFFFFF',
    dark: '#F3F4F6',
  },
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    disabled: '#9CA3AF',
    hint: '#9CA3AF',
  },
  error: {
    main: '#EF4444',
    light: '#FCA5A5',
    dark: '#DC2626',
  },
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
  },
  success: {
    main: '#2A9D8F',
    light: '#8EDED4',
    dark: '#1F7268',
  },
  info: {
    main: '#3498DB',
    light: '#93C5FD',
    dark: '#2563EB',
  },
  grey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  accent: {
    purple: '#8B5CF6',
    lightPurple: '#C4B5FD',
    pink: '#EC4899',
    lightPink: '#F9A8D4',
    indigo: '#6366F1',
    lightIndigo: '#A5B4FC',
    teal: '#2A9D8F',
    coral: '#E76F51',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary.main,
    accent: colors.secondary.main,
    background: colors.background.default,
    surface: colors.background.paper,
    text: colors.text.primary,
    error: colors.error.main,
  },
  spacing,
  typography,
  shadows,
  roundness: 16,
};

export type Theme = typeof theme; 