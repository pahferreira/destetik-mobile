/**
 * @flow
 * @format
 */

import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
// Context
import Context from '../../utils/context/Context';
import Colors from '../../theme/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
// Components
import Header from '../../components/Header';
import MyServiceItem from '../../components/MyServiceItem';
import AddServiceModal from '../../components/AddServiceModal';
import RemoveServiceModal from '../../components/RemoveServiceModal';
import Services from '../../services/Services';

type Props = {
  navigation: any,
};

const Home = (props: Props) => {
  const { state, dispatch } = useContext(Context);
  const [servicesToProvide, setServicesToProvide] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { services } = state.user;

  useEffect(() => {
    (async () => {
      const data = await Services.getAvailables();
      setServicesToProvide(data);
    })();
  }, []);

  const addService = async newService => {
    const data = await Services.add(newService);
    const serviceAdded = servicesToProvide.filter(service => {
      return service.name === newService.service;
    })[0];
    dispatch({
      type: 'SERVICE_ADDED',
      payload: {
        _id: data._id,
        price: data.price,
        serviceId: {
          name: newService.service,
          image: serviceAdded.image,
          description: serviceAdded.description,
        },
      },
    });
  };

  const removeService = async serviceId => {
    const data = await Services.remove(serviceId);
    dispatch({
      type: 'SERVICE_REMOVED',
      payload: serviceId,
    });
    if (data) {
      const message = Object.values(data)[0];
      return ToastAndroid.show(message, ToastAndroid.LONG);
    }
  };

  const onSelectService = service => {
    setSelectedService(service);
    setShowRemoveModal(true);
  };

  const _renderServices = () => {
    if (services.length === 0) {
      return <Text>Voce ainda nao adicionou um servico.</Text>;
    }
    return (
      <SafeAreaView style={styles.infoContainer}>
        <FlatList
          data={services}
          keyExtractor={service => service._id}
          renderItem={({ item }) => (
            <MyServiceItem
              myService={item}
              onLongPress={() => onSelectService(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <AddServiceModal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        servicesToProvide={servicesToProvide}
        addService={addService}
      />
      <RemoveServiceModal
        visible={showRemoveModal}
        onRequestClose={() => setShowRemoveModal(false)}
        removeService={removeService}
        selectedService={selectedService}
      />
      <Header icon="menu" onPress={props.navigation.toggleDrawer} />
      <Text style={styles.title}>Meus Serviços</Text>
      {_renderServices()}
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => setShowModal(true)}>
        <Icon name="add" size={40} color={Colors.WHITE} />
      </TouchableOpacity>
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
  floatButton: {
    height: 65,
    width: 65,
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  infoContainer: {
    paddingHorizontal: '5%',
  },
  content: {
    width: '100%',
  },
  serviceImage: {
    width: 180,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  itemSeparator: {
    height: 10,
  },
  service: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
});

export default Home;
