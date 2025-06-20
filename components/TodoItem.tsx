import { Doc, Id } from '@/convex/_generated/dataModel';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type Todo = Doc<'todos'>;

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
  const isEditing = editingId === item._id;

  return (
    <View style={homeStyles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
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
              <TouchableOpacity onPress={() => handleSaveEdit(item)} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                  <Ionicons name="checkmark" size={16} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                  <Ionicons name="close" size={16} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
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
