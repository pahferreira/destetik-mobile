/**
 * @flow
 * @format
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// Components
import Header from '../../components/Header';

type Props = {
  navigation: any,
};

const Home = (props: Props) => {
  return (
    <View style={styles.container}>
      <Header icon="menu" onPress={props.navigation.toggleDrawer} />
      <Text>Home!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home;
