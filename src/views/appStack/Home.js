/**
 * @flow
 * @format
 */

import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
// Context
import Context from '../../utils/context/Context';
// Components
import Header from '../../components/Header';
import Colors from '../../theme/Colors';

type Props = {
  navigation: any,
};

const Home = (props: Props) => {
  const { state, dispatch } = useContext(Context);
  const services = [
    {
      name: 'Manicure',
      image: require('../../assets/services/manicure.png'),
    },
    {
      name: 'Massage',
      image: require('../../assets/services/massage.png'),
    },
    {
      name: 'Makeup',
      image: require('../../assets/services/makeup.png'),
    },
    {
      name: 'Limpeza de Pele',
      image: require('../../assets/services/limpeza.png'),
    },
    {
      name: 'Eyebrown Design',
      image: require('../../assets/services/sobrancelha.png'),
    },
    {
      name: 'Acunputure',
      image: require('../../assets/services/acunputure.png'),
    },
    {
      name: 'Hairstyle',
      image: require('../../assets/services/hairstyle.png'),
    },
    {
      name: 'Pedicure',
      image: require('../../assets/services/pedicure.png'),
    },
  ];

  const _renderItem = item => {
    const onPress = () => {
      dispatch({
        type: 'SELECT_SERVICE',
        payload: item,
      });
      return props.navigation.navigate('Services');
    };
    return (
      <TouchableOpacity style={styles.service} onPress={onPress}>
        <Image source={item.image} style={styles.serviceImage} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Header icon="menu" onPress={props.navigation.toggleDrawer} />
      <Text style={styles.title}>Serviços</Text>
      <SafeAreaView style={styles.servicesContainer}>
        <FlatList
          data={services}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => _renderItem(item)}
          numColumns={2}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    width: '100%',
    marginVertical: 15,
    paddingHorizontal: '5%',
    fontSize: 30,
    color: Colors.PRIMARY,
  },
  content: {
    width: '100%',
  },
  servicesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceImage: {
    width: 160,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  service: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
});

export default Home;
