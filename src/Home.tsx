import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const BASE_URL = 'http://192.168.1.13:3000';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type Todo = {
  id: number;
  title: string;
  finished: boolean;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const navigation = useNavigation<HomeScreenNavigationProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Logout',
    });
  }, [navigation]);

  const getTodos = async () => {
    try {
      // Retrieve the token from secure storage
      const token = await SecureStore.getItemAsync('token');
  
      // Make the HTTP POST request with the token in the header
      fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Login failed');
          }
        })
        .then((data) => {
          // Update the todos state with the retrieved todos
          setTodos(data.todos);
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('An error occurred');
        });
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while retrieving the token');
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const toggleTodoStatus = async (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, finished: !todo.finished };
      }
      return todo;
    });
    const token = await SecureStore.getItemAsync('token');
    // Make the PUT request to update the todo on the server
    fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify({ finished: updatedTodos.find((todo) => todo.id === id)?.finished }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update todo');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('An error occurred');
      });

    setTodos(updatedTodos);
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const toggleStatus = () => {
      toggleTodoStatus(item.id);
    };

    return (
      <TouchableOpacity style={styles.todoItem} onPress={toggleStatus}>
        <Text style={[styles.todoTitle, item.finished ? styles.completedTodo : null]}>
          {item.title}
        </Text>
        <View style={styles.checkBox}>
          {item.finished && <Text style={styles.checkIcon}>✓</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  // Sort the todos to display completed ones at the bottom
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.finished && !b.finished) {
      return 1; // a is completed, b is not completed
    } else if (!a.finished && b.finished) {
      return -1; // a is not completed, b is completed
    }
    return 0; // both a and b have the same completion status
  });

  const handleAddTodo = async () => {
    if (!text) {
      Alert.alert('Please fill in Todo name');
      return;
    }
    const token = await SecureStore.getItemAsync('token');
    // Make the POST request to add the todo on the server
    fetch(`${BASE_URL}/addTodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify({ todoName: text }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add todo');
        }
      })
      .then(() => {
        getTodos();
        setText('');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('An error occurred');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Todo!"
          onChangeText={(newText) => setText(newText)}
          value={text}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedTodos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.todoList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  textInput: {
    flex: 1,
    height: 30,
    fontSize: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
  todoList: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoTitle: {
    flex: 1,
    fontSize: 16,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 16,
    color: '#008000',
  },
});

export default Home;
