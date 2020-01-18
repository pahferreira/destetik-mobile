/**
 * @flow
 * @format
 */

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { setUser } from '../../utils/helpers';
import Colors from '../../theme/Colors';
// Components
import Input from '../../components/Input';
import Button from '../../components/Button';
// Services
import User from '../../services/User';
// Context
import Context from '../../utils/context/Context';

type Props = {
  navigation: any,
};

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(Context);
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    try {
      if (email === '' || password === '') {
        return ToastAndroid.show('Enter all fields', ToastAndroid.LONG);
      }
      setVisible(true);
      const token = await User.login({
        email,
        password,
      });
      if (token) {
        await setUser(token);
        const data = await User.current();
        console.log(data);
        if (data) {
          dispatch({
            type: 'SET_USER',
            payload: {
              token,
              user: data,
            },
          });
          setVisible(false);
          props.navigation.navigate('Home');
        }
      }
    } catch (error) {
      return ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color={Colors.DISABLED} />
        </View>
      </Modal>
      <View style={styles.content}>
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
        <Button value="entrar" onPress={handleLogin} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Register')}
          style={styles.registerButtonContainer}>
          <Text style={styles.registerButton}>Cadastre-se!</Text>
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
  modalContainer: {
    backgroundColor: Colors.SHADOW_GREY,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
