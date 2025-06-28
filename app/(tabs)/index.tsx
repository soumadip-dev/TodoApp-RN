import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Welcome to TODO APP🎉</Text>
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
