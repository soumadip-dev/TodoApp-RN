import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

//  Component for adding a new todo item
const TodoInput = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  // State for the new todo item
  const [newTodo, setNewTodo] = useState<string>('');

  // Convex mutation for adding a new todo item
  const addTodo = useMutation(api.todos.addTodo);

  // Handle adding a new todo item
  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        // Call the Convex mutation to add the new todo item
        await addTodo({ text: newTodo.trim() });
        // Clear the new todo state
        setNewTodo('');
      } catch (error) {
        console.log('Error adding a todo', error);
        // Show an alert if there's an error
        Alert.alert('Error', 'Failed to add todo');
      }
    }
  };

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="What needs to be done?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} disabled={!newTodo.trim()}>
          <LinearGradient
            colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
            style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
          >
            <Ionicons name="add" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
