/**
 * @flow
 * @format
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// Components
import Input from '../../components/Input';
import Header from '../../components/Header';
import Colors from '../../theme/Colors';

type Props = {
  navigation: any,
};

const Profile = (props: Props) => {
  return (
    <View style={styles.container}>
      <Header
        icon="menu"
        onPress={props.navigation.toggleDrawer}
        leftIcon="check"
        onPressLeft={_ => _}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.content}>
        <Input name="Name" />
        <Input name="Email" keyboardType="email-address" />
        <Input name="Phone" keyboardType="phone-pad" />
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
