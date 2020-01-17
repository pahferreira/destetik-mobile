/**
 * @flow
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// Context
// import Context from '../../utils/context/Context';
import Colors from '../../theme/Colors';
import PerformedServices from '../../services/PerformedServices';
// Components
import Header from '../../components/Header';
import HistoryItem from '../../components/HistoryItem';
import MenuModal from '../../components/MenuModal';

type Props = {
  navigation: any,
};

const History = (props: Props) => {
  // const { state, dispatch } = useContext(Context);
  const [servicesToDisplay, setServicesToDisplay] = useState([]);
  const [servicesByMe, setServicesByMe] = useState([]);
  const [servicesByOthers, setServicesByOthers] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showMenuModal, setShowMenuModal] = useState(false);

  useEffect(() => {
    (async () => {
      const servicesAsClient = await PerformedServices.getPerformedServicesAsClient();
      const servicesAsProvider = await PerformedServices.getPerformedServicesAsProvider();
      console.log(servicesAsClient);
      console.log(servicesAsProvider);
      setServicesByMe(servicesAsProvider);
      setServicesByOthers(servicesAsClient);
      setServicesToDisplay(servicesAsClient);
    })();
  }, []);

  const onSelectService = service => {
    setShowMenuModal(true);
    setSelectedService(service);
  };

  const _renderServices = () => {
    if (servicesToDisplay.length === 0) {
      return (
        <View style={[styles.infoContainer, styles.emptyTextContainer]}>
          <Text>Histórico vazio.</Text>
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.infoContainer}>
        <FlatList
          data={servicesToDisplay}
          keyExtractor={service => service._id}
          renderItem={({ item }) => (
            <HistoryItem service={item} onPress={() => onSelectService(item)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <MenuModal
        visible={showMenuModal}
        onRequestClose={() => setShowMenuModal(false)}
        selectedService={selectedService}
      />
      <Header icon="menu" onPress={props.navigation.toggleDrawer} />
      <Text style={styles.title}>Histórico</Text>
      {_renderServices()}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setServicesToDisplay(servicesByMe)}>
          <Text style={styles.byMeText}>REALIZADOS POR MIM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setServicesToDisplay(servicesByOthers)}>
          <Text style={styles.byOthersText}>REALIZADOS POR OUTROS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    height: '10%',
    flexDirection: 'row',
  },
  byMeText: {
    color: Colors.THIRD,
    fontWeight: 'bold',
  },
  byOthersText: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
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
    height: '75%',
  },
  emptyTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default History;
