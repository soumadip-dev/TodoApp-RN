import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import Header from '@/components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <Text>Welcome to TODO APP🎉</Text>
        <Text onPress={toggleDarkMode}>Toggle Dark Mode</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}
