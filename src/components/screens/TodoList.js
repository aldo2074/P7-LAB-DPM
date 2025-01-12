import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://172.20.10.3:5000/api/todos';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [token, setToken] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          const { token } = JSON.parse(storedToken);
          setToken(token);
          const response = await fetch(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setTodos(data.data || []);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch todos');
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!title.trim()) {
      Alert.alert('Peringatan', 'Judul harus diisi');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const result = await response.json();

      if (response.ok) {
        setTodos((prev) => [result.data, ...prev]);
        setTitle('');
        setDescription('');
        setShowForm(false);
      } else {
        Alert.alert('Error', result.message || 'Error adding todo');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTodo = async () => {
    if (!title.trim()) {
      Alert.alert('Peringatan', 'Judul harus diisi');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${editTodoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const result = await response.json();

      if (response.ok) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === editTodoId ? { ...todo, title, description } : todo
          )
        );
        setTitle('');
        setDescription('');
        setShowForm(false);
        setEditTodoId(null);
      } else {
        Alert.alert('Error', result.message || 'Error editing todo');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to edit todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus todo ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.ok) {
                setTodos((prev) => prev.filter((todo) => todo._id !== id));
              } else {
                const errorResponse = await response.json();
                Alert.alert('Error', errorResponse.message || 'Error deleting todo');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete todo');
            }
          },
        },
      ]
    );
  };

  const handleCancelEdit = () => {
    setTitle('');
    setDescription('');
    setShowForm(false);
    setEditTodoId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>MyToDone</Text>

          {showForm ? (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Judul</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan judul"
                  placeholderTextColor="#666"
                  value={title}
                  onChangeText={setTitle}
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Deskripsi</Text>
                <TextInput
                  style={[styles.input, styles.descriptionInput]}
                  placeholder="Masukkan deskripsi"
                  placeholderTextColor="#666"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                  editable={!isLoading}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={editTodoId ? handleEditTodo : handleAddTodo}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>
                    {editTodoId ? 'Update' : 'Tambah'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancelEdit}
                  disabled={isLoading}
                >
                  <Text style={[styles.buttonText, styles.cancelButtonText]}>
                    Batal
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <FlatList
                data={todos}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.todoItem}>
                    <View style={styles.todoContent}>
                      <Text style={styles.todoTitle}>{item.title}</Text>
                      <Text style={styles.todoDescription}>{item.description}</Text>
                    </View>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity 
                        onPress={() => {
                          setEditTodoId(item._id);
                          setTitle(item.title);
                          setDescription(item.description);
                          setShowForm(true);
                        }}
                        style={styles.iconButton}
                      >
                        <Icon name="create" size={20} color="#FF6B6B" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleDeleteTodo(item._id)}
                        style={styles.iconButton}
                      >
                        <Icon name="trash" size={20} color="#4A4A4A" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowForm(true)}
              >
                <Icon name="add" size={24} color="white" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 24,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#4A4A4A',
    backgroundColor: '#FAFAFA',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
  },
  cancelButton: {
    backgroundColor: 'rgba(74, 74, 74, 0.1)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#4A4A4A',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  todoContent: {
    flex: 1,
    marginRight: 12,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 4,
  },
  todoDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF6B6B',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
});