/**
 * @flow
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

type Props = {
  navigation: any,
};

const Login = (props: Props) => {
  const handleLogin = () => {
    props.navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Input name="Email" keyboardType="email-address" />
        <Input name="Password" safeEntry />
        <Button value="login" onPress={handleLogin} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Register')}
          style={styles.registerButtonContainer}>
          <Text style={styles.registerButton}>Register here!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  content: {
    height: '50%',
    width: '100%',
  },
  registerButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  registerButton: {
    fontWeight: 'bold',
  },
});

export default Login;
