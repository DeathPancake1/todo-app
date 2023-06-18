import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};
const BASE_URL = 'http://192.168.1.13:3000';
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    // Validate form fields
    if (!email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email');
      return
    }

    // Create an object with the user's credentials
    const credentials = {
      email: email,
      password: password,
    };

    // Make the HTTP POST request
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            const { token } = data; // Extract the token from the response

            SecureStore.setItemAsync('token', token) // Save the token in secure storage
              .then(() => {
                navigation.navigate('Home');
              });
          });
        } else {
          // Failed login
          Alert.alert('Login failed');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('An error occurred');
      });
  };

  const routeRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={{ padding: 50 }}>
      <TextInput
        style={{ height: 40, fontSize: 20 }}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address" // Set keyboard type to email
        autoCapitalize="none" // Disable auto-capitalization
        autoComplete="email" // Enable email autocomplete
      />
      <TextInput
        style={{ height: 40, fontSize: 20 }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="SignUp" onPress={routeRegister} />
    </View>
  );
};

export default Login;
