/**
 * @flow
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Colors from '../theme/Colors';

type Props = {
  visible: boolean,
  selectedService: any,
  onRequestClose: Function,
};

const MenuModal = (props: Props) => {
  const { visible, onRequestClose, selectedService } = props;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.body}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.label}>PAGAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.label}>AVALIAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={onRequestClose}>
              <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.SHADOW_GREY,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  picker: {
    width: 290,
  },
  input: {
    width: 290,
  },
  label: {
    color: Colors.SECONDARY,
    fontWeight: 'bold',
    fontSize: 20,
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
    fontSize: 20,
  },
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuModal;
