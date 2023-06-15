import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    // Validate form fields
    if (!username || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }

    // Create an object with the user's credentials
    const credentials = {
      username: username,
      password: password,
    };

    // Make the HTTP POST request
    fetch('https://example.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.ok) {
          // Successful login
          Alert.alert('Login successful');
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
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
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
