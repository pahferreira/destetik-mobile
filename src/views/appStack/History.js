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
  ActivityIndicator,
} from 'react-native';
import Colors from '../../theme/Colors';
import PerformedServices from '../../services/PerformedServices';
// Components
import Header from '../../components/Header';
import HistoryItem from '../../components/HistoryItem';
import MenuModal from '../../components/MenuModal';
import RatingModal from '../../components/RatingModal';
import PaymentModal from '../../components/PaymentModal';

type Props = {
  navigation: any,
};

const History = (props: Props) => {
  const [servicesToDisplay, setServicesToDisplay] = useState([]);
  const [servicesByMe, setServicesByMe] = useState([]);
  const [servicesByOthers, setServicesByOthers] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [menuOptions, setMenuOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const servicesAsClient = await PerformedServices.getPerformedServicesAsClient();
      const servicesAsProvider = await PerformedServices.getPerformedServicesAsProvider();
      setServicesByMe(servicesAsProvider);
      setServicesByOthers(servicesAsClient);
      setServicesToDisplay(servicesAsClient);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (refreshing) {
          const servicesAsClient = await PerformedServices.getPerformedServicesAsClient();
          const servicesAsProvider = await PerformedServices.getPerformedServicesAsProvider();
          setServicesByMe(servicesAsProvider);
          setServicesByOthers(servicesAsClient);
          setServicesToDisplay(servicesAsClient);
          setRefreshing(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    })();
  }, [refreshing]);

  const onSelectService = service => {
    setSelectedService(service);
    setShowMenuModal(true);
  };

  const displayServicesByMe = () => {
    setServicesToDisplay(servicesByMe);
  };

  const displayServicesByOthers = () => {
    setServicesToDisplay(servicesByOthers);
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
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
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

  const _renderLoading = () => {
    if (loading) {
      return (
        <View style={[styles.infoContainer, styles.emptyTextContainer]}>
          <ActivityIndicator size="large" color={Colors.DISABLED} />
        </View>
      );
    }
    return _renderServices();
  };

  return (
    <View style={styles.container}>
      <MenuModal
        visible={showMenuModal}
        options={menuOptions}
        onRequestClose={() => setShowMenuModal(false)}
        selectedService={selectedService}
        showRatingModal={() => setShowRatingModal(true)}
        showPaymentModal={() => setShowPaymentModal(true)}
      />
      <RatingModal
        visible={showRatingModal}
        onRequestClose={() => setShowRatingModal(false)}
        selectedService={selectedService}
      />
      <PaymentModal
        visible={showPaymentModal}
        onRequestClose={() => setShowPaymentModal(false)}
        selectedService={selectedService}
      />
      <Header icon="menu" onPress={props.navigation.toggleDrawer} />
      <Text style={styles.title}>Histórico</Text>
      {_renderLoading()}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={displayServicesByMe}>
          <Text style={styles.byMeText}>REALIZADOS POR MIM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={displayServicesByOthers}>
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
