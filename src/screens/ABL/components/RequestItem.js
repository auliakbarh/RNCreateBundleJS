import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/ListRequestStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import scale from '../../../config/scale';
import config from '../../../config';
import {getDate, getTime} from '../../../utils/DateFormat';

const RequestItem = ({onPress, data}) => {
  return (
    <TouchableOpacity onPress={() => onPress(data)} style={styles.listRequest}>
      <View style={styles.iconListRequest}>
        <Icon
          name={'hazard-lights'}
          size={scale(23)}
          color={config.color.common.darkRed}
        />
      </View>
      <View style={styles.descListRequest}>
        <Text>{data.judulRequest}</Text>
        <Text>{data.tipeRequest}</Text>
      </View>
      <View style={styles.timeListRequest}>
        <Text style={styles.time}>{getDate(data.createdAt)}</Text>
        <Text style={styles.time}>{getTime(data.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RequestItem;
