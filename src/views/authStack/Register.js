/**
 * @flow
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
// Components
import Input from '../../components/Input';
import Button from '../../components/Button';
// Services
import User from '../../services/User';

type Props = {
  navigation: any,
};

const Register = (props: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    try {
      if (
        name === '' ||
        email === '' ||
        password === '' ||
        confirmPassword === ''
      ) {
        return ToastAndroid.show('Please enter all fields', ToastAndroid.LONG);
      }
      if (password !== confirmPassword) {
        return ToastAndroid.show("Passwords doesn't match", ToastAndroid.LONG);
      }
      const data = await User.register({
        name,
        email,
        password,
        password2: confirmPassword,
      });
      if (data) {
        props.navigation.navigate('Login');
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <ScrollView style={styles.form}>
          <Input
            name="Nome"
            value={name}
            onChangeText={text => setName(text)}
          />
          <Input
            name="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Input
            name="Senha"
            safeEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Input
            name="Confirmar Senha"
            safeEntry
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
        </ScrollView>
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <Button value="Cadastrar" onPress={handleSignUp} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  content: {
    marginTop: 30,
    flex: 8,
    width: '100%',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    flex: 2,
  },
});

export default Register;
