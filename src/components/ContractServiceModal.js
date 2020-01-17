/**
 * @flow
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Colors from '../theme/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
// Services
import PerfomedServices from '../services/PerformedServices';

type Props = {
  visible: boolean,
  onRequestClose: Function,
  services: Array<any>,
};

const ContractServiceModal = (props: Props) => {
  const { visible, onRequestClose, services } = props;
  const [servicesToContract, setServicesToContract] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (services.length > 0) {
      setSelectedService(services[0].name);
      setServicesToContract(services);
    }
  }, [services]);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const data = await PerfomedServices.contractService(selectedService);
      console.log(data);
      setLoading(false);
      onRequestClose();
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.LONG);
    }
  };

  const _renderContent = () => {
    if (servicesToContract.length === 0) {
      return (
        <View style={styles.body}>
          <Text style={styles.label}>Não há mais serviços para adicionar</Text>
        </View>
      );
    }
    return (
      <>
        <View style={styles.body}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Qual serviço deseja contratar?</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedService}
              onValueChange={(value, index) =>
                setSelectedService(value.toString())
              }>
              {servicesToContract.map(service => (
                <Picker.Item
                  label={service.serviceId.name}
                  value={service._id}
                  key={service._id}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onRequestClose}>
            <Text style={styles.cancel}>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleConfirm}>
            <Text style={styles.label}>ADICIONAR</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const _renderLoading = () => {
    if (loading) {
      return (
        <View style={styles.body}>
          <ActivityIndicator size="small" color={Colors.PRIMARY} />
        </View>
      );
    }
    return _renderContent();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onRequestClose}>
              <Icon name="close" color={Colors.SECONDARY} size={24} />
            </TouchableOpacity>
          </View>
          {_renderLoading()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.WHITE,
    height: 240,
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    padding: 5,
    width: 95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    width: '100%',
    marginVertical: 5,
    flex: 1,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
  },
  label: {
    color: Colors.SECONDARY,
    fontWeight: 'bold',
  },
  cancel: {
    color: Colors.DISABLED,
    fontWeight: 'bold',
  },
  header: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-end',
  },
  body: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalContainer: {
    backgroundColor: Colors.SHADOW_GREY,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ContractServiceModal;
