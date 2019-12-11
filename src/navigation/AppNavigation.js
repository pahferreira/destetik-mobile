import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Dimensions } from 'react-native';
import SideMenu from '../components/SideMenu';

// Auth Stack
import Login from '../views/authStack/Login';
import Register from '../views/authStack/Register';
// App Stack
import Profile from '../views/appStack/Profile';
import Home from '../views/appStack/Home';
import Location from '../views/appStack/Location';
import Services from '../views/appStack/Services';
import MyServices from '../views/appStack/MyServices';

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const { width } = Dimensions.get('window');
const DrawerConfig = {
  drawerWidth: width * 0.85,
  drawerType: 'front',
  contentComponent: ({ navigation }) => <SideMenu navigation={navigation} />,
};

const AppStack = createDrawerNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile },
    Location: { screen: Location },
    Services: { screen: Services },
    MyServices: { screen: MyServices },
  },
  DrawerConfig,
);

export default createAppContainer(
  createSwitchNavigator(
    {
      // SplashStack: createStackNavigator(
      //   {
      //     SplashScreen: { screen: SplashScreen },
      //   },
      //   {
      //     headerMode: 'none',
      //   },
      // ),
      AuthStack: AuthStack,
      AppStack: AppStack,
    },
    { initialRouteName: 'AuthStack' },
  ),
);
