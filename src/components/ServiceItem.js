/**
 * @flow
 * @format
 */

import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import Colors from '../theme/Colors';

type Props = {
  user: {
    name: string,
    profileImg?: string,
    phone: string,
    address: any,
    services: Array<any>,
  },
  selectedService: string,
};

const ServiceItem = (props: Props) => {
  const { user, selectedService } = props;
  const servicePriceArray = user.services.filter(
    service => service.serviceId.name === selectedService,
  );
  const servicePrice =
    servicePriceArray.length === 1 ? servicePriceArray[0].price.toFixed(2) : '';
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.personalInfo}>
        <Image
          source={
            user.profileImg
              ? { uri: user.profileImg }
              : require('../assets/profile.png')
          }
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.boldText}>{user.name}</Text>
          <Text style={styles.phoneText}>{user.phone}</Text>
        </View>
      </View>
      <View style={styles.servicesInfo}>
        <Rating
          type="custom"
          startingValue={2}
          ratingCount={5}
          imageSize={25}
          readonly
          ratingColor={Colors.PRIMARY}
          tintColor="white"
          ratingBackgroundColor="gray"
          style={styles.ratingAdjust}
        />
        <Text style={styles.boldText}>RS: {servicePrice}</Text>
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
  ratingAdjust: {
    left: 5,
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

export default ServiceItem;
