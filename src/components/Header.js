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
  leftIcon?: any,
  onPressLeft?: Function,
};

const Header = (props: Props) => {
  const { icon, onPress, leftIcon, onPressLeft } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={icon} color={Colors.PRIMARY} size={22} />
      </TouchableOpacity>

      {leftIcon && onPressLeft && (
        <TouchableOpacity onPress={onPressLeft}>
          <Icon
            name={leftIcon ? leftIcon : 'wc'}
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
    borderBottomWidth: 0.5,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
});

export default Header;
