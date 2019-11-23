/**
 * @flow
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Colors from '../theme/Colors';

type Props = {
  name: string,
  keyboardType?: any,
  safeEntry?: boolean,
  onChangeText: Function,
  value: string,
  maskType?: string,
  maskConfig?: {},
};

const Input = (props: Props) => {
  const {
    name,
    keyboardType,
    safeEntry,
    onChangeText,
    value,
    maskType,
    maskConfig,
  } = props;

  const _renderInput = () => {
    if (maskType) {
      return (
        <TextInputMask
          placeholder={name}
          autoCapitalize="none"
          type={maskType}
          options={maskConfig}
          value={value}
          keyboardType={keyboardType ? keyboardType : 'default'}
          style={styles.input}
          secureTextEntry={safeEntry ? true : false}
          onChangeText={text => onChangeText(text)}
        />
      );
    }
    return (
      <TextInput
        placeholder={name}
        autoCapitalize="none"
        value={value}
        keyboardType={keyboardType ? keyboardType : 'default'}
        style={styles.input}
        secureTextEntry={safeEntry ? true : false}
        onChangeText={text => onChangeText(text)}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      {_renderInput()}
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
