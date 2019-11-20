/**
 * @format
 * @flow
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../theme/Colors';
type Props = {
  value: string,
  onPress: Function,
};

const Button = (props: Props) => {
  const { onPress, value } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnContainer]}>
      <Text style={[styles.btnText]}>{value.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 30,
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: Colors.PRIMARY,
  },
  btnText: {
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
});

export default Button;
