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
  ToastAndroid,
} from 'react-native';
import Colors from '../theme/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Services from '../services/Services';

type Props = {
  visible: boolean,
  selectedService: any,
  onRequestClose: Function,
  removeService: Function,
};

const RemoveServiceModal = (props: Props) => {
  const { visible, onRequestClose, removeService, selectedService } = props;

  console.log(selectedService);

  const handleConfirm = async () => {
    try {
      await removeService(selectedService._id);
      // Cleaning Form
      onRequestClose();
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.LONG);
    }
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
          <View style={styles.body}>
            <Text>Tem Certeza que deseja remover esse servico?</Text>
            <Text style={styles.serviceName}>
              {selectedService?.serviceId?.name}
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleConfirm}>
              <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleConfirm}>
              <Text style={styles.label}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.WHITE,
    height: 280,
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    width: '100%',
    borderBottomColor: Colors.PRIMARY,
    borderBottomWidth: 0.8,
    marginVertical: 5,
    flex: 1,
  },
  picker: {
    width: 290,
  },
  inputContainer: {
    width: '100%',
    flex: 1,
    borderBottomColor: Colors.PRIMARY,
    borderBottomWidth: 0.8,
    marginVertical: 5,
  },
  input: {
    width: 290,
  },
  label: {
    color: Colors.SECONDARY,
    fontWeight: 'bold',
  },
  serviceName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.SECONDARY,
    marginVertical: 5,
  },
  cancelText: {
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
    justifyContent: 'center',
    alignItems: 'center',
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

export default RemoveServiceModal;
