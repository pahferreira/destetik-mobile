/**
 * @flow
 * @format
 */

import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ToastAndroid,
  ScrollView,
} from 'react-native';
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

const Location = (props: Props) => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [zipCode, setZipCode] = useState(user.address ? user.address.cep : '');
  const [city, setCity] = useState(user.address ? user.address.city : '');
  const [street, setStreet] = useState(user.address ? user.address.street : '');
  const [district, setDistrict] = useState(
    user.address ? user.address.district : '',
  );
  const [houseNumber, setHouseNumber] = useState(
    user.address ? user.address.houseNumber : '',
  );

  const handleUpdate = async () => {
    try {
      if (street === '' || district === '' || houseNumber === '') {
        return ToastAndroid.show('Please Enter all fields', ToastAndroid.LONG);
      }
      const data = await User.update({
        address: {
          cep: zipCode,
          city,
          street,
          district,
          houseNumber,
        },
      });
      if (data) {
        dispatch({
          type: 'UPDATE_USER',
          payload: data,
        });
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
        <Text style={styles.title}>Localização</Text>
      </View>
      <KeyboardAvoidingView style={styles.content}>
        <ScrollView>
          <Input
            name="CEP"
            maskType="custom"
            maskConfig={{
              mask: '99999-999',
            }}
            keyboardType="numeric"
            value={zipCode}
            onChangeText={text => setZipCode(text)}
          />
          <Input
            name="Cidade"
            value={city}
            onChangeText={text => setCity(text)}
          />
          <Input
            name="Endereço"
            value={street}
            onChangeText={text => setStreet(text)}
          />
          <Input
            name="Bairro"
            value={district}
            onChangeText={text => setDistrict(text)}
          />
          <Input
            name="Número"
            keyboardType="numeric"
            value={houseNumber}
            onChangeText={text => setHouseNumber(text)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
    height: '80%',
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

export default Location;
