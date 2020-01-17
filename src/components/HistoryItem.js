/**
 * @flow
 * @format
 */

import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../theme/Colors';

type Props = {
  service: {
    clientId: any,
    providedServiceId: {
      price: number,
      serviceId: {
        name: string,
        image?: string,
      },
      userId: {
        name: string,
      },
    },
  },
  onPress: Function,
};

const HistoryItem = (props: Props) => {
  const { service, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.personalInfo}>
        <Image
          source={
            service.providedServiceId.serviceId.image
              ? { uri: service.providedServiceId.serviceId.image }
              : require('../assets/profile.png')
          }
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.boldText}>
            {service.providedServiceId.serviceId.name}
          </Text>
          <Text style={styles.phoneText}>
            {`Feito por: ${service.providedServiceId.userId.name}`}
          </Text>
        </View>
      </View>
      <View style={styles.servicesInfo}>
        <Text style={styles.boldText}>
          RS: {service.providedServiceId.price.toFixed(2)}
        </Text>
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

export default HistoryItem;
