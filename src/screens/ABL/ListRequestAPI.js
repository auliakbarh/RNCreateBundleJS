import React, {useEffect, useState} from 'react';
import {View, StatusBar, FlatList} from 'react-native';

import config from '../../config';
import endpoint from '../../config/endpoint';
import * as screenName from '../../router/screenNames';
import styles from './styles/ListRequestStyle';
import RequestItem from './components/RequestItem';

const ListRequestAPI = ({navigation, route}) => {
  const [isFetching, setIsFetching] = useState(true);
  const [listRequest, setListRequest] = useState([]);

  const goToDetail = detail => {
    navigation.navigate(screenName.REQUEST_DETAIL_SCREEN, {
      detail,
    });
  };

  const refresh = async () => {
    const listRequest = await fetch(config.api + endpoint.getAllData)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === 200) {
          setIsFetching(false);
          setListRequest(data.data);
          return data.data;
        } else {
          setIsFetching(false);
          return [];
        }
      })
      .catch(e => {
        console.warn(e);
        return [];
      });
    return listRequest;
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={config.color.background}
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={listRequest}
          renderItem={item => (
            <RequestItem onPress={goToDetail} data={item.item} />
          )}
          keyExtractor={item => item._id}
          onRefresh={() => refresh()}
          refreshing={isFetching}
        />
      </View>
    </>
  );
};

export default ListRequestAPI;
