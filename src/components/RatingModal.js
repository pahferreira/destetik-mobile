/**
 * @flow
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import Colors from '../theme/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import PerformedServices from '../services/PerformedServices';

type Props = {
  visible: boolean,
  onRequestClose: Function,
  selectedService: any,
};

const RatingModal = (props: Props) => {
  const { visible, onRequestClose, selectedService } = props;
  const [rating, setRating] = useState(0);

  const ratingCompleted = ratingFromComponent => {
    setRating(ratingFromComponent);
  };

  const submitRating = async () => {
    try {
      const data = await PerformedServices.rateService({
        rate: rating.toString(),
        performedServiceId: selectedService._id,
      });
      if (data) {
        onRequestClose();
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.LONG);
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
            <View>
              <Text style={styles.label}>Qual sua nota para o usuário?</Text>
            </View>
            <Rating
              type="custom"
              startingValue={rating}
              ratingCount={5}
              imageSize={40}
              ratingColor={Colors.THIRD}
              tintColor={Colors.WHITE}
              ratingBackgroundColor={Colors.DISABLED}
              onFinishRating={ratingCompleted}
            />
            <View />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={onRequestClose}>
              <Text style={styles.cancel}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={submitRating}>
              <Text style={styles.label}>ENVIAR</Text>
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
    alignItems: 'center',
    justifyContent: 'space-around',
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

export default RatingModal;
