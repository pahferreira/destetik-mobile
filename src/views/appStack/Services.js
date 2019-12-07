/**
 * @flow
 * @format
 */

import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../theme/Colors';
// Context
import Context from '../../utils/context/Context';
// Components
import Header from '../../components/Header';
import ServiceItem from '../../components/ServiceItem';
import User from '../../services/User';

type Props = {
  navigation: any,
};

type Service = {
  name: string,
  image: number,
};

const Services = (props: Props) => {
  const { state } = useContext(Context);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const selectedService: Service = state.selectedService;

  useEffect(() => {
    (async () => {
      try {
        const data = await User.getAll();
        const usersWithService = data.filter(user => {
          let servicesFiltered = user.services.filter(service => {
            if (service.serviceId.name === selectedService.name) {
              return true;
            }
            return false;
          });
          return servicesFiltered.length > 0;
        });
        setUsers(usersWithService);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedService]);

  useEffect(() => {
    (async () => {
      try {
        if (!refreshing) {
          return;
        }
        const data = await User.getAll();
        const usersWithService = data.filter(user => {
          let servicesFiltered = user.services.filter(service => {
            if (service.serviceId.name === selectedService.name) {
              return true;
            }
            return false;
          });
          return servicesFiltered.length > 0;
        });
        setUsers(usersWithService);
        setRefreshing(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refreshing, selectedService.name]);

  const _onPressBack = () => {
    setLoading(true);
    setUsers(null);
    return props.navigation.goBack();
  };

  const _renderList = () => {
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="small" color={Colors.PRIMARY} />
        </View>
      );
    }

    if (users?.length === 0) {
      return (
        <Text style={styles.warningText}>
          Não há usuários fornecendo esse serviço.
        </Text>
      );
    }
    return (
      <FlatList
        data={users}
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ServiceItem user={item} selectedService={selectedService.name} />
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header icon="arrow-back" onPress={_onPressBack} />
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{selectedService.name}</Text>
          <Image source={selectedService.image} style={styles.serviceImage} />
        </View>
        <SafeAreaView style={styles.listContainer}>
          {_renderList()}
        </SafeAreaView>
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
  itemSeparator: {
    height: 10,
  },
  content: {
    width: '100%',
  },
  infoContainer: {
    paddingHorizontal: '5%',
  },
  listContainer: {
    width: '100%',
    marginTop: 50,
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },
  servicesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  service: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
});

export default Services;
