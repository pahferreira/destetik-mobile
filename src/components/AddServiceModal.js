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
  TextInput,
  Picker,
  ToastAndroid,
} from 'react-native';
import Colors from '../theme/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Services from '../services/Services';

type Props = {
  visible: boolean,
  onRequestClose: Function,
  servicesToProvide: Array<any>,
  addService: Function,
};

const AddServiceModal = (props: Props) => {
  const { visible, onRequestClose, addService } = props;
  const [servicesToProvide, setServicesToProvide] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [price, setPrice] = useState('');

  useEffect(() => {
    (async () => {
      if (visible) {
        const data = await Services.getAvailables();
        setServicesToProvide(data);
      }
    })();
  }, [visible]);

  useEffect(() => {
    if (servicesToProvide.length > 0) {
      setSelectedService(servicesToProvide[0].name);
    }
  }, [servicesToProvide]);

  const handleConfirm = async () => {
    try {
      await addService({ service: selectedService, price });
      // Cleaning Form
      setPrice('');
      onRequestClose();
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.LONG);
    }
  };

  const _renderContent = () => {
    if (servicesToProvide.length === 0) {
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
            <Text style={styles.label}>Selecione o serviço</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedService}
              onValueChange={(value, index) => setSelectedService(value)}>
              {servicesToProvide.map(service => (
                <Picker.Item
                  label={service.name}
                  value={service.name}
                  key={service._id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Digite o preço</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
              placeholder="Preço"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleConfirm}>
            <Text style={styles.label}>ADICIONAR</Text>
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
    width: 100,
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
  header: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-end',
  },
  body: {
    flex: 4,
    justifyContent: 'space-around',
  },
  footer: {
    flex: 1,
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

export default AddServiceModal;
