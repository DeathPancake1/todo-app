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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const native_1 = require("@react-navigation/native");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const Login = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const navigation = (0, native_1.useNavigation)();
    const handleLogin = () => {
        // Validate form fields
        if (!email || !password) {
            react_native_1.Alert.alert('Please fill in all fields');
            return;
        }
        // Create an object with the user's credentials
        const credentials = {
            email: email,
            password: password,
        };
        // Make the HTTP POST request
        fetch('http://192.168.1.13:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then((response) => {
            if (response.ok) {
                async_storage_1.default.setItem('userEmail', email) // Set user email in local storage
                    .then(() => {
                    navigation.navigate('Home');
                });
            }
            else {
                // Failed login
                react_native_1.Alert.alert('Login failed');
            }
        })
            .catch((error) => {
            console.error(error);
            react_native_1.Alert.alert('An error occurred');
        });
    };
    const routeRegister = () => {
        navigation.navigate('Register');
    };
    return (react_1.default.createElement(react_native_1.View, { style: { padding: 50 } },
        react_1.default.createElement(react_native_1.TextInput, { style: { height: 40, fontSize: 20 }, placeholder: "Email", value: email, onChangeText: (text) => setEmail(text) }),
        react_1.default.createElement(react_native_1.TextInput, { style: { height: 40, fontSize: 20 }, placeholder: "Password", secureTextEntry: true, value: password, onChangeText: (text) => setPassword(text) }),
        react_1.default.createElement(react_native_1.Button, { title: "Login", onPress: handleLogin }),
        react_1.default.createElement(react_native_1.Button, { title: "SignUp", onPress: routeRegister })));
};
exports.default = Login;
