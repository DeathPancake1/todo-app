"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const SecureStore = __importStar(require("expo-secure-store"));
const react_native_1 = require("react-native");
const native_1 = require("@react-navigation/native");
const BASE_URL = 'http://192.168.1.13:3000';
const Home = () => {
    const [todos, setTodos] = (0, react_1.useState)([]);
    const [text, setText] = (0, react_1.useState)('');
    const navigation = (0, native_1.useNavigation)();
    react_1.default.useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Logout',
        });
    }, [navigation]);
    const getTodos = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Retrieve the token from secure storage
            const token = yield SecureStore.getItemAsync('token');
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
                }
                else {
                    throw new Error('Login failed');
                }
            })
                .then((data) => {
                // Update the todos state with the retrieved todos
                setTodos(data.todos);
            })
                .catch((error) => {
                console.error(error);
                react_native_1.Alert.alert('An error occurred');
            });
        }
        catch (error) {
            console.error(error);
            react_native_1.Alert.alert('An error occurred while retrieving the token');
        }
    });
    (0, react_1.useEffect)(() => {
        getTodos();
    }, []);
    const toggleTodoStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return Object.assign(Object.assign({}, todo), { finished: !todo.finished });
            }
            return todo;
        });
        const token = yield SecureStore.getItemAsync('token');
        // Make the PUT request to update the todo on the server
        fetch(`${BASE_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ finished: (_a = updatedTodos.find((todo) => todo.id === id)) === null || _a === void 0 ? void 0 : _a.finished }),
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
        })
            .catch((error) => {
            console.error(error);
            react_native_1.Alert.alert('An error occurred');
        });
        setTodos(updatedTodos);
    });
    const renderTodoItem = ({ item }) => {
        const toggleStatus = () => {
            toggleTodoStatus(item.id);
        };
        return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.todoItem, onPress: toggleStatus },
            react_1.default.createElement(react_native_1.Text, { style: [styles.todoTitle, item.finished ? styles.completedTodo : null] }, item.title),
            react_1.default.createElement(react_native_1.View, { style: styles.checkBox }, item.finished && react_1.default.createElement(react_native_1.Text, { style: styles.checkIcon }, "\u2713"))));
    };
    // Sort the todos to display completed ones at the bottom
    const sortedTodos = [...todos].sort((a, b) => {
        if (a.finished && !b.finished) {
            return 1; // a is completed, b is not completed
        }
        else if (!a.finished && b.finished) {
            return -1; // a is not completed, b is completed
        }
        return 0; // both a and b have the same completion status
    });
    const handleAddTodo = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!text) {
            react_native_1.Alert.alert('Please fill in Todo name');
            return;
        }
        const token = yield SecureStore.getItemAsync('token');
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
            react_native_1.Alert.alert('An error occurred');
        });
    });
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(react_native_1.View, { style: styles.inputContainer },
            react_1.default.createElement(react_native_1.TextInput, { style: styles.textInput, placeholder: "Add Todo!", onChangeText: (newText) => setText(newText), value: text }),
            react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.addButton, onPress: handleAddTodo },
                react_1.default.createElement(react_native_1.Text, { style: styles.addButtonText }, "+"))),
        react_1.default.createElement(react_native_1.FlatList, { data: sortedTodos, renderItem: renderTodoItem, keyExtractor: (item) => item.id.toString(), style: styles.todoList })));
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = Home;
