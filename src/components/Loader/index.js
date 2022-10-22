import React from 'react';
import {View, StyleSheet, ActivityIndicator, Modal, Text} from 'react-native';
import Metrics from '../../helpers/metrics';
import {defaultTheme} from '../../helpers/theme';

const Loader = props => {
  const {loading, info, ...attributes} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size={props.size || 'large'}
            color={props.color || defaultTheme.seconday}
            animating={loading}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: Metrics.rfv(100),
    width: Metrics.rfv(100),
    borderRadius: Metrics.rfv(10),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
