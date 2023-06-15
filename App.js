"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const native_1 = require("@react-navigation/native");
const stack_1 = require("@react-navigation/stack");
const Login_1 = __importDefault(require("./Login"));
const Register_1 = __importDefault(require("./Register"));
const Stack = (0, stack_1.createStackNavigator)();
const App = () => {
    return (react_1.default.createElement(native_1.NavigationContainer, null,
        react_1.default.createElement(Stack.Navigator, { initialRouteName: "Login" },
            react_1.default.createElement(Stack.Screen, { name: "Login", component: Login_1.default }),
            react_1.default.createElement(Stack.Screen, { name: "Register", component: Register_1.default }))));
};
exports.default = App;
