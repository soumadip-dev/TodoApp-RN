// Import AsyncStorage which is React Native's simple, promise-based API for persisting small bits of data on a user's device. It is similar to the browser's localStorage, but asynchronous and cross-platform.
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import necessary React hooks and functions
import { createContext, useContext, useEffect, useState } from 'react';

// TypeScript interface for our color scheme
export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: 'light-content' | 'dark-content';
}

// Light color scheme
const lightColors: ColorScheme = {
  bg: '#f5f7fa',
  surface: '#ffffff',
  text: '#1a1a1a',
  textMuted: '#6b7280',
  border: '#e5e7eb',
  primary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  shadow: 'rgba(0, 0, 0, 0.1)',
  gradients: {
    background: ['#f5f7fa', '#e9edf2'],
    surface: ['#ffffff', '#f8fafc'],
    primary: ['#818cf8', '#6366f1'],
    success: ['#34d399', '#10b981'],
    warning: ['#fbbf24', '#f59e0b'],
    danger: ['#f87171', '#ef4444'],
    muted: ['#9ca3af', '#6b7280'],
    empty: ['#f3f4f6', '#e5e7eb'],
  },
  backgrounds: {
    input: '#ffffff',
    editInput: '#f9fafb',
  },
  statusBarStyle: 'dark-content' as const,
};

// Dark color scheme
const darkColors: ColorScheme = {
  bg: '#111827',
  surface: '#1f2937',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  border: '#374151',
  primary: '#818cf8',
  success: '#34d399',
  warning: '#fbbf24',
  danger: '#f87171',
  shadow: 'rgba(0, 0, 0, 0.3)',
  gradients: {
    background: ['#111827', '#1f2937'],
    surface: ['#1f2937', '#374151'],
    primary: ['#a5b4fc', '#818cf8'],
    success: ['#6ee7b7', '#34d399'],
    warning: ['#fcd34d', '#fbbf24'],
    danger: ['#fca5a5', '#f87171'],
    muted: ['#4b5563', '#374151'],
    empty: ['#374151', '#4b5563'],
  },
  backgrounds: {
    input: '#1f2937',
    editInput: '#111827',
  },
  statusBarStyle: 'light-content' as const,
};

// TypeScript interface for our theme context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

// Context to hold theme-related data (initially undefined)
const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

// The ThemeProvider component wraps the app and provides theme data to all children
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // State to track whether dark mode is active
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme preference from AsyncStorage when component mounts
  useEffect(() => {
    AsyncStorage.getItem('darkMode').then(value => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  // Function to toggle dark mode on/off
  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Choose colors based on current mode
  const colors = isDarkMode ? darkColors : lightColors;

  // Provide theme data to child components
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme in any component
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export the custom hook for use in components
export default useTheme;
