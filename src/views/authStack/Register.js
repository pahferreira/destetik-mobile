/**
 * @flow
 * @format
 */

import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

type Props = {
  navigation: any,
};

const Register = (props: Props) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <ScrollView style={styles.form}>
          <Input name="Name" keyboardType="email-address" />
          <Input name="Email" keyboardType="email-address" />
          <Input name="Password" safeEntry />
          <Input name="Confirm Password" safeEntry />
        </ScrollView>
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <Button value="Register" onPress={_ => _} />
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
