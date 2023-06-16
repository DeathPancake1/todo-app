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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const native_1 = require("@react-navigation/native");
const BASE_URL = 'http://192.168.1.13:3000';
const Register = () => {
    const [username, setUsername] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const navigation = (0, native_1.useNavigation)();
    const handleRegister = () => {
        // Validate form fields
        if (!email || !username || !password || !confirmPassword) {
            react_native_1.Alert.alert('Please fill in all fields');
            return;
        }
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            react_native_1.Alert.alert('Invalid email');
            return;
        }
        if (password != confirmPassword) {
            react_native_1.Alert.alert("Passwords don't match");
            return;
        }
        // Create an object with the user's credentials
        const credentials = {
            email: email,
            username: username,
            password: password,
        };
        // Make the HTTP POST request
        fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then((response) => {
            if (response.ok) {
                // Successful registration
                react_native_1.Alert.alert('Registration successful');
                navigation.goBack();
            }
            else {
                // Failed registration
                react_native_1.Alert.alert('Registration failed');
            }
        })
            .catch((error) => {
            console.error(error);
            react_native_1.Alert.alert('An error occurred');
        });
    };
    return (react_1.default.createElement(react_native_1.View, { style: { padding: 50 } },
        react_1.default.createElement(react_native_1.TextInput, { style: { height: 40, fontSize: 20 }, placeholder: "Email", value: email, onChangeText: (text) => setEmail(text), keyboardType: "email-address" // Set keyboard type to email
            , autoCapitalize: "none" // Disable auto-capitalization
            , autoComplete: "email" // Enable email autocomplete
         }),
        react_1.default.createElement(react_native_1.TextInput, { style: { height: 40, fontSize: 20 }, placeholder: "Username", value: username, onChangeText: (text) => setUsername(text) }),
        react_1.default.createElement(react_native_1.TextInput, { style: { height: 40, fontSize: 20 }, placeholder: "Password", secureTextEntry: true, value: password, onChangeText: (text) => setPassword(text) }),
        react_1.default.createElement(react_native_1.TextInput, { style: { height: 40, fontSize: 20 }, placeholder: "Confirm Password", secureTextEntry: true, value: confirmPassword, onChangeText: (text) => setConfirmPassword(text) }),
        react_1.default.createElement(react_native_1.Button, { title: "Register", onPress: handleRegister })));
};
exports.default = Register;
