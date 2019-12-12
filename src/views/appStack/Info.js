/**
 * @flow
 * @format
 */

import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../theme/Colors';
import { Rating } from 'react-native-ratings';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
// Context
import Context from '../../utils/context/Context';
// Components
import Header from '../../components/Header';

type Props = {
  navigation: any,
};

const Info = (props: Props) => {
  const { state } = useContext(Context);
  const [showMap, setShowMap] = useState(false);
  const selectedUser = state.selectedUser;
  const [geoLocation, setGeoLocation] = useState({ latitude: 0, longitude: 0 });

  console.log(selectedUser);

  useEffect(() => {
    if (selectedUser.address) {
      return setGeoLocation({
        latitude: selectedUser.address.geoLocation.lat,
        longitude: selectedUser.address.geoLocation.lng,
      });
    }
    return setGeoLocation({ latitude: 0, longitude: 0 });
  }, [selectedUser]);

  const _onPressBack = () => {
    return props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Modal visible={showMap} onRequestClose={() => setShowMap(false)}>
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={() => setShowMap(false)}>
          <Icon name="close" size={30} color={Colors.SECONDARY} />
        </TouchableOpacity>
        {selectedUser.address && (
          <MapView
            style={styles.mapStyle}
            minZoomLevel={19}
            mapType="standard"
            initialRegion={{
              ...geoLocation,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker coordinate={geoLocation} />
          </MapView>
        )}
      </Modal>
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
            tintColor={Colors.WHITE}
            ratingBackgroundColor={Colors.PRIMARY_LIGHT}
          />
        </View>
        <View style={styles.servicesContainer}>
          <Text style={styles.profileName}>Serviços</Text>
          <View style={styles.servicesRow}>
            {selectedUser.services.map(service => {
              return (
                <View key={service._id} style={styles.serviceContainer}>
                  <Image
                    source={{ uri: service.serviceId.image }}
                    style={styles.serviceImage}
                  />
                  <Text>R$ {service.price.toFixed(2)}</Text>
                </View>
              );
            })}
          </View>
        </View>
        {selectedUser.address && (
          <View style={styles.locationContainer}>
            <Text style={styles.profileName}>Localização</Text>
            <TouchableOpacity onPress={() => setShowMap(true)}>
              <Text style={styles.locationButton}>
                Clique aqui para visualizar o mapa.
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mapStyle: {
    flex: 1,
  },
  modalCloseButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    top: 20,
    right: 20,
    backgroundColor: Colors.PRIMARY_LIGHT,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  infoContainer: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  servicesContainer: {
    height: '20%',
    justifyContent: 'space-around',
  },
  servicesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  serviceContainer: {
    marginHorizontal: 10,
  },
  serviceImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 100,
    borderWidth: 0.7,
    borderColor: Colors.PRIMARY,
    marginBottom: 10,
  },
  service: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  locationButton: {
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
});

export default Info;
