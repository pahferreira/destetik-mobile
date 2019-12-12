/**
 * @flow
 * @format
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Colors from '../theme/Colors';

type Props = {
  icon: any,
  onPress?: Function,
  rightIcon?: any,
  onPressRight?: Function,
};

const Header = (props: Props) => {
  const { icon, onPress, rightIcon, onPressRight } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={icon} color={Colors.PRIMARY} size={22} />
      </TouchableOpacity>

      {rightIcon && onPressRight && (
        <TouchableOpacity onPress={onPressRight}>
          <Icon
            name={rightIcon ? rightIcon : 'wc'}
            color={Colors.PRIMARY}
            size={22}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 1,
  },
});

export default Header;
