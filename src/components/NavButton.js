/**
 * @flow
 * @format
 */

import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Colors from '../theme/Colors';

type Props = {
  name: string,
  icon: any,
  onPress?: Function,
  rotate?: string,
  current?: boolean,
  logout?: boolean,
};

const NavButton = (props: Props) => {
  const { name, icon, onPress, rotate, logout, current } = props;

  const _renderTextColor = () => {
    if (logout) {
      return Colors.RED;
    }
    if (current) {
      return Colors.PRIMARY;
    }
    return Colors.BLACK;
  };

  return (
    <TouchableOpacity
      style={[styles.container, current && styles.activeBackground]}
      onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon
          name={icon}
          color={_renderTextColor()}
          size={26}
          style={{ transform: [{ rotate: rotate ? rotate : '0deg' }] }}
        />
      </View>
      <Text style={[styles.text, { color: _renderTextColor() }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    justifyContent: 'flex-start',
  },
  activeBackground: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderRadius: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
  },
  text: {
    fontSize: 16,
    marginLeft: 26,
  },
});

export default NavButton;
