/**
 * @flow
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Colors from '../theme/Colors';
// import Context from '../utils/context/Context';
// Components
import NavButton from './NavButton';
// import AsyncStorage from '@react-native-community/async-storage';

type Props = {
  navigation: any,
};

const SideMenu = (props: Props) => {
  const handleLogout = async () => {
    // await AsyncStorage.removeItem('jwtToken');
    props.navigation.navigate('Login');
  };
  // console.log(props.navigation.state.routes[props.navigation.state.index]);

  return (
    <View style={styles.container}>
      <View style={styles.closeContainer}>
        <TouchableOpacity onPress={props.navigation.toggleDrawer}>
          <Icon name="close" color={Colors.PRIMARY} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfoContainer}>
        <Text>Welcome,</Text>
        <Text style={styles.userNameText}>Maria Fernandes Rabelo</Text>
      </View>
      <View style={styles.navigationContainer}>
        <NavButton
          name="Home"
          icon="home"
          onPress={() => props.navigation.navigate('Home')}
          current={
            props.navigation.state.routes[
              props.navigation.state.index
            ].routeName.toLowerCase() === 'home'
          }
        />
        <NavButton
          name="Profile"
          icon="person"
          onPress={() => props.navigation.navigate('Profile')}
          current={
            props.navigation.state.routes[
              props.navigation.state.index
            ].routeName.toLowerCase() === 'profile'
          }
        />
        <NavButton
          name="Location"
          icon="navigation"
          onPress={() => props.navigation.navigate('Location')}
          current={
            props.navigation.state.routes[
              props.navigation.state.index
            ].routeName.toLowerCase() === 'location'
          }
        />
        <NavButton
          name="Logout"
          icon="exit-to-app"
          rotate="180deg"
          onPress={handleLogout}
          logout
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  closeContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingRight: 20,
  },
  userInfoContainer: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'flex-end',
    paddingHorizontal: '5%',
    paddingBottom: 15,
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 0.5,
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.BLACK,
  },
  userAddressText: {
    color: Colors.PRIMARY,
    fontSize: 16,
  },
  navigationContainer: {
    flexGrow: 8,
    padding: '5%',
  },
});

export default SideMenu;
