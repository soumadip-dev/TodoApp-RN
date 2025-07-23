import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

// Header component
const Header = () => {
  // Get theme colors from the custom hook
  const { colors } = useTheme();

  // Create styles based on current theme colors
  const homeStyles = createHomeStyles(colors);

  // Fetch todos using a Convex query
  const todos = useQuery(api.todos.getTodos);

  // Calculate completed and total todos
  const completedCount = todos ? todos.filter(todo => todo.isCompleted).length : 0;
  const totalCount = todos ? todos.length : 0;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View style={homeStyles.header}>
      {/* Header title and icon */}
      <View style={homeStyles.titleContainer}>
        <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
          <Ionicons name="flash-outline" size={28} color="#fff" />
        </LinearGradient>

        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Today&apos;s Tasks 👀</Text>
          <Text style={homeStyles.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[homeStyles.progressFill, { width: `${progressPercentage}%` }]}
            />
          </View>
          <Text style={homeStyles.progressText}>{Math.round(progressPercentage)}%</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

