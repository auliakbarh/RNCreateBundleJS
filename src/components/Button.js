import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import config from '../config';
import scale from '../config/scale';

const Button = ({
  buttonStyle,
  textStyle,
  onPress,
  disabled = false,
  placeholder = '',
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={buttonStyle ? buttonStyle : styles.saveButton}
      onPress={() => (onPress ? onPress() : console.log('On Pressed'))}>
      {disabled ? (
        <ActivityIndicator
          color={config.color.common.white}
          size={config.fontSize.xlarge}
        />
      ) : (
        <Text style={textStyle ? textStyle : styles.saveButtonText}>
          {placeholder}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: config.color.common.darkRed,
    padding: scale(12),
    margin: scale(5),
    marginTop: scale(32),
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: config.fontSize.medium,
    textAlign: 'center',
  },
});

export default Button;
