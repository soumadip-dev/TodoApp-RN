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

// Color scheme for light mode
const lightColors: ColorScheme = {
  bg: '#f5f7fa',
  surface: '#ffffff',
  text: '#1a202c',
  textMuted: '#718096',
  border: '#e2e8f0',
  primary: '#4f46e5',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  shadow: 'rgba(0, 0, 0, 0.1)',
  gradients: {
    background: ['#f5f7fa', '#e2e8f0'],
    surface: ['#ffffff', '#f8fafc'],
    primary: ['#6366f1', '#4f46e5'],
    success: ['#34d399', '#10b981'],
    warning: ['#fbbf24', '#f59e0b'],
    danger: ['#f87171', '#ef4444'],
    muted: ['#cbd5e0', '#a0aec0'],
    empty: ['#edf2f7', '#e2e8f0'],
  },
  backgrounds: {
    input: '#ffffff',
    editInput: '#f8fafc',
  },
  statusBarStyle: 'dark-content' as const,
};

// Color scheme for dark mode
const darkColors: ColorScheme = {
  bg: '#121826',
  surface: '#1f2937',
  text: '#f3f4f6',
  textMuted: '#9ca3af',
  border: '#374151',
  primary: '#818cf8',
  success: '#6ee7b7',
  warning: '#fcd34d',
  danger: '#fca5a5',
  shadow: 'rgba(0, 0, 0, 0.3)',
  gradients: {
    background: ['#121826', '#1f2937'],
    surface: ['#1f2937', '#374151'],
    primary: ['#818cf8', '#6366f1'],
    success: ['#6ee7b7', '#34d399'],
    warning: ['#fcd34d', '#fbbf24'],
    danger: ['#fca5a5', '#f87171'],
    muted: ['#4b5563', '#6b7280'],
    empty: ['#374151', '#4b5563'],
  },
  backgrounds: {
    input: '#1f2937',
    editInput: '#121826',
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
