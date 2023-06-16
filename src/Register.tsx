import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = () => {
    // Validate form fields
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Please fill in all fields');
      return;
    }

    // Create an object with the user's credentials
    const credentials = {
      email: email,
      username: username,
      password: password,
    };

    // Make the HTTP POST request
    fetch('http://192.168.1.13:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.ok) {
          // Successful registration
          Alert.alert('Registration successful');
          navigation.goBack();
        } else {
          // Failed registration
          Alert.alert('Registration failed');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('An error occurred');
      });
  };

  return (
    <View style={{ padding: 50 }}>
      <TextInput
        style={{ height: 40, fontSize: 20 }}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
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
      <TextInput
        style={{ height: 40, fontSize: 20 }}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;
