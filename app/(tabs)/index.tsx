import { createHomeStyles } from '@/assets/styles/home.styles';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { useMutation, useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Type for a todo item
type Todo = Doc<'todos'>;

// Main component for the home page
export default function Index() {
  const { colors } = useTheme();

  // State for the editing todo item
  const [editingId, setEditingId] = useState<Id<'todos'> | null>(null);
  const [editText, setEditText] = useState('');

  // Styles for the home page
  const homeStyles = createHomeStyles(colors);

  // Get the todos from the Convex database
  const todos = useQuery(api.todos.getTodos);

  // Mutation to toggle a todo item
  const toggleTodo = useMutation(api.todos.toggleTodo);

  // Mutation to delete a todo item
  const deleteTodo = useMutation(api.todos.deleteTodo);

  // Mutation to update a todo item
  const updateTodo = useMutation(api.todos.updateTodo);

  // Check if the todos are loading
  const isLoading = todos === undefined;
  if (isLoading) return <LoadingSpinner />;

  // Function to toggle a todo item
  const handleToggleTodo = async (id: Id<'todos'>) => {
    try {
      // Call the Convex mutation to toggle the todo item
      await toggleTodo({ id });
    } catch (error) {
      console.log('Error toggling todo', error);
      // Show an alert if there's an error
      Alert.alert('Error', 'Failed to toggle todo');
    }
  };

  // Function to delete a todo item
  const handleDeleteTodo = async (id: Id<'todos'>) => {
    // Show an alert to confirm deletion
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            // Call the Convex mutation to delete the todo item
            await deleteTodo({ id });
          } catch (error) {
            console.log('Error deleting todo', error);
            // Show an alert if there's an error
            Alert.alert('Error', 'Failed to delete todo');
          }
        },
      },
    ]);
  };

  // Function to edit a todo item
  const handleEditTodo = (todo: Todo) => {
    // Set the editing state to the todo item's ID
    setEditingId(todo._id);
    // Set the edit text to the todo item's text
    setEditText(todo.text);
  };

  // Function to save the edited todo item
  const handleSaveEdit = async (todo: Todo) => {
    if (editingId) {
      try {
        // Call the Convex mutation to update the todo item
        await updateTodo({ id: editingId, text: editText.trim() });
        // Reset the editing state
        setEditingId(null);
        // Reset the edit text
        setEditText('');
      } catch (error) {
        console.log('Error updating todo', error);
        // Show an alert if there's an error
        Alert.alert('Error', 'Failed to update todo');
      }
    }
  };

  // Function to cancel editing a todo item
  const handleCancelEdit = () => {
    // Reset the editing state
    setEditingId(null);
    // Reset the edit text
    setEditText('');
  };

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              colors={colors}
              homeStyles={homeStyles}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              handleToggleTodo={handleToggleTodo}
              handleSaveEdit={handleSaveEdit}
              handleCancelEdit={handleCancelEdit}
              handleEditTodo={handleEditTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          )}
          keyExtractor={item => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

