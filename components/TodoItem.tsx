import { Doc, Id } from '@/convex/_generated/dataModel';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// Define the Todo type using the document type from Convex
type Todo = Doc<'todos'>;

// Define the props expected by the TodoItem component
type Props = {
  item: Todo;
  colors: any;
  homeStyles: any;
  editingId: Id<'todos'> | null;
  editText: string;
  setEditText: (text: string) => void;
  handleToggleTodo: (id: Id<'todos'>) => void;
  handleSaveEdit: (todo: Todo) => void;
  handleCancelEdit: () => void;
  handleEditTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: Id<'todos'>) => void;
};

// TodoItem component for displaying and interacting with a single todo item
export default function TodoItem({
  item,
  colors,
  homeStyles,
  editingId,
  editText,
  setEditText,
  handleToggleTodo,
  handleSaveEdit,
  handleCancelEdit,
  handleEditTodo,
  handleDeleteTodo,
}: Props) {
  // Determine if the current item is being edited
  const isEditing = editingId === item._id;

  return (
    <View style={homeStyles.todoItemWrapper}>
      {/* Background gradient for the todo item */}
      <LinearGradient
        colors={colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Checkbox to toggle the completion status of the todo */}
        <TouchableOpacity
          style={homeStyles.checkbox}
          activeOpacity={0.7}
          onPress={() => handleToggleTodo(item._id)}
        >
          <LinearGradient
            colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
            style={[
              homeStyles.checkboxInner,
              { borderColor: item.isCompleted ? 'transparent' : colors.border },
            ]}
          >
            {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
          </LinearGradient>
        </TouchableOpacity>

        {isEditing ? (
          // Editable text input for the todo item
          <View style={homeStyles.editContainer}>
            <TextInput
              style={homeStyles.editInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              multiline
              placeholder="Edit your todo..."
              placeholderTextColor={colors.textMuted}
            />
            <View style={homeStyles.editButtons}>
              {/* Button to save the edited todo */}
              <TouchableOpacity onPress={() => handleSaveEdit(item)} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                  <Ionicons name="checkmark" size={16} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Button to cancel editing */}
              <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                  <Ionicons name="close" size={16} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Display the todo text with actions
          <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: 'line-through',
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>

            {/* Action buttons for editing and deleting the todo */}
            <View style={homeStyles.todoActions}>
              <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}
