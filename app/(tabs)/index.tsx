import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { useMutation, useQuery } from 'convex/react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { toggleDarkMode } = useTheme();

  const todos = useQuery(api.todos.getTodos);
  console.log('todos', todos);

  const addTodo = useMutation(api.todos.addTodo);
  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  return (
    <View style={styles.container}>
      <Text style={styles.content}>Welcome to TODO APP🎉</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text style={styles.content}>Toggle</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({ text: 'Write a blog' })}>
        <Text style={styles.content}>Add a new todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearAllTodos()}>
        <Text style={styles.content}>Clear all todos</Text>
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
