/**
 * @flow
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../theme/Colors';

type Props = {
  name: string,
  keyboardType?: any,
  safeEntry?: boolean,
};

const Input = (props: Props) => {
  const { name, keyboardType, safeEntry } = props;
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <TextInput
        placeholder={name}
        autoCapitalize="none"
        keyboardType={keyboardType ? keyboardType : 'default'}
        style={styles.input}
        secureTextEntry={safeEntry ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 0.7,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    marginTop: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
});

export default Input;
