/**
 * @flow
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Colors from '../theme/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Input from '../components/Input';
import PerformedServices from '../services/PerformedServices';
type Props = {
  visible: boolean,
  onRequestClose: Function,
  selectedService: any,
};

const PaymentModal = (props: Props) => {
  const { visible, onRequestClose, selectedService } = props;
  const [creditCard, setCreditCard] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const data = await PerformedServices.payService({
        performedServiceId: selectedService._id,
        creditCard,
        cvv,
        expirationDate,
      });
      setLoading(false);
      if (data) {
        ToastAndroid.show(data, ToastAndroid.LONG);
        // Cleaning Form
        setCreditCard('');
        setCvv('');
        setExpirationDate('');
        onRequestClose();
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.LONG);
    }
  };

  const _renderContent = () => {
    if (loading) {
      <View>
        <ActivityIndicator size="small" color={Colors.PRIMARY} />
      </View>;
    }
    return (
      <>
        <View style={styles.body}>
          <Input
            name="Cartão de Crédito"
            maskType="custom"
            maskConfig={{
              mask: '9999 9999 9999 9999',
            }}
            keyboardType="numeric"
            value={creditCard}
            onChangeText={setCreditCard}
          />
          <View style={styles.inputContainer}>
            <View style={styles.cvvInput}>
              <Input
                name="CVV"
                maskType="custom"
                maskConfig={{
                  mask: '999',
                }}
                keyboardType="numeric"
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
            <View style={styles.expirationDateInput}>
              <Input
                name="Data de Validade"
                maskType="custom"
                maskConfig={{
                  mask: '99/99',
                }}
                keyboardType="numeric"
                value={expirationDate}
                onChangeText={setExpirationDate}
              />
            </View>
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
            <Text style={styles.label}>PAGAR</Text>
          </TouchableOpacity>
        </View>
      </>
    );
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
          {_renderContent()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.WHITE,
    height: 300,
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    padding: 10,
    width: 95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  cvvInput: {
    width: '30%',
  },
  expirationDateInput: {
    width: '65%',
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
    justifyContent: 'space-between',
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

export default PaymentModal;
