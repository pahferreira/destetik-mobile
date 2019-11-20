/**
 * @flow
 * @format
 */

import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
// Components
import Input from '../../components/Input';
import Header from '../../components/Header';
import Colors from '../../theme/Colors';

type Props = {
  navigation: any,
};

const Location = (props: Props) => {
  return (
    <View style={styles.container}>
      <Header
        icon="menu"
        onPress={props.navigation.toggleDrawer}
        leftIcon="check"
        onPressLeft={_ => _}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Location</Text>
      </View>
      <KeyboardAvoidingView style={styles.content}>
        <Input name="Zip Code" keyboardType="numeric" />
        <Input name="Street" />
        <Input name="District" />
        <Input name="House Number" keyboardType="numeric" />
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

export default Location;
