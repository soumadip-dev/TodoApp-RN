import useTheme from '@/hooks/useTheme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { toggleDarkMode } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Welcome to TODO APP🎉</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text style={styles.content}>Toggle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#113F67',
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FDF5AA',
  },
});
