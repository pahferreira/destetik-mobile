/**
 * @flow
 * @format
 */

import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../../theme/Colors';
import { Rating } from 'react-native-ratings';
// Context
import Context from '../../utils/context/Context';
// Components
import Header from '../../components/Header';

type Props = {
  navigation: any,
};

const Info = (props: Props) => {
  const { state } = useContext(Context);
  const selectedUser = state.selectedUser;

  console.log(selectedUser);

  const _onPressBack = () => {
    return props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header icon="arrow-back" onPress={_onPressBack} />
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.profileName}>{selectedUser.name}</Text>
          <Image
            source={
              selectedUser.profileImg
                ? { uri: selectedUser.profileImg }
                : require('../../assets/profile.png')
            }
            style={styles.profileImage}
          />
          <Rating
            type="custom"
            startingValue={2}
            ratingCount={5}
            imageSize={25}
            readonly
            ratingColor={Colors.PRIMARY}
            tintColor="white"
            ratingBackgroundColor="gray"
          />
        </View>
        <View style={styles.servicesContainer}>
          {selectedUser.services.map(service => {
            return (
              <View key={service._id}>
                <Image
                  source={{ uri: service.serviceId.image }}
                  style={styles.serviceImage}
                />
                <Text>{service.serviceId.name}</Text>
                <Text>R$ {service.price.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>
      </View>
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
    fontSize: 30,
    color: Colors.PRIMARY,
  },
  warningText: {
    width: '100%',
    textAlign: 'center',
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 10,
    resizeMode: 'cover',
  },
  content: {
    width: '100%',
  },
  infoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  servicesContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  service: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
});

export default Info;
