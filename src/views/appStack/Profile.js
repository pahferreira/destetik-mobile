/**
 * @flow
 * @format
 */

import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// Context
import Context from '../../utils/context/Context';
// Services
import User from '../../services/User';
// Components
import Input from '../../components/Input';
import Header from '../../components/Header';
import Colors from '../../theme/Colors';

type Props = {
  navigation: any,
};

const Profile = (props: Props) => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone ? user.phone : '');

  const handleUpdate = async () => {
    try {
      if (name === '' || email === '') {
        return ToastAndroid.show(
          'Please enter name and email',
          ToastAndroid.LONG,
        );
      }
      const data = await User.update({
        name,
        email,
        phone,
      });
      if (data) {
        dispatch({
          type: 'UPDATE_USER',
          payload: data,
        });
        await AsyncStorage.setItem('username', data.name);
        return ToastAndroid.show('User Updated', ToastAndroid.LONG);
      }
    } catch (error) {
      return ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        icon="menu"
        onPress={props.navigation.toggleDrawer}
        rightIcon="check"
        onPressRight={handleUpdate}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Perfil</Text>
      </View>
      <View style={styles.content}>
        <Input name="Nome" value={name} onChangeText={text => setName(text)} />
        <Input
          name="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <Input
          name="Telefone"
          maskType="custom"
          maskConfig={{
            mask: '(99)99999-9999',
          }}
          value={phone}
          onChangeText={text => setPhone(text)}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 20,
    paddingHorizontal: '5%',
  },
  title: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    fontSize: 30,
    fontStyle: 'italic',
  },
  content: {
    height: '50%',
    width: '100%',
    padding: '5%',
  },
  registerButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  registerButton: {
    fontWeight: 'bold',
  },
});

export default Profile;
