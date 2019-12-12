/**
 * @flow
 * @format
 */

import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../theme/Colors';

type Props = {
  myService: {
    price: number,
    serviceId: {
      name: string,
      image?: string,
      description: string,
    },
  },
  onLongPress: Function,
};

const MyServiceItem = (props: Props) => {
  const { myService, onLongPress } = props;
  return (
    <TouchableOpacity style={styles.container} onLongPress={onLongPress}>
      <View style={styles.personalInfo}>
        <Image
          source={
            myService.serviceId.image
              ? { uri: myService.serviceId.image }
              : require('../assets/profile.png')
          }
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.boldText}>{myService.serviceId.name}</Text>
          <Text style={styles.phoneText}>
            {myService.serviceId.description}
          </Text>
        </View>
      </View>
      <View style={styles.servicesInfo}>
        <Text style={styles.boldText}>RS: {myService.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: 15,
    elevation: 1,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY_LIGHT,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
    resizeMode: 'cover',
  },
  personalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  boldText: {
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 12,
  },
  servicesInfo: {
    width: '50%',
    alignItems: 'flex-end',
  },
});

export default MyServiceItem;
