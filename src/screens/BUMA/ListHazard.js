import React from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import {isRxDocument} from 'rxdb';

import config from '../../config';
import endpoint from '../../config/endpoint';
import * as screenName from '../../router/screenNames';
import styles from './styles/ListHazardStyle';
import EnhancedHazardItem from './observable/ListHazard/EnhancedHazardItem';


const ListHazard = ({database, navigation, route}) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [listHazard, setListHazard] = React.useState([]);

  let sub = [];

  const goToDetail = async (detail, navigation) => {
    await detail.item.update({
      $set: {
        judulHazard: 'UPDATED JUDUL HAZARD BY VIEW DETAIL'
      }
    });
    navigation.navigate(screenName.HAZARD_DETAIL_SCREEN, {
      detail: detail.item,
    });
  };

  const fetchListHazardAPI = async () => {
    const result = await fetch(config.api + endpoint.getAllData)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === 200) {
          return data.data;
        } else {
          return [];
        }
      })
      .catch(e => {
        console.warn(e);
        return [];
      });

    setIsFetching(false);
    return result;
  };

  const refresh = async database => {
    setIsFetching(true);
    /*
    let result = null;
    console.log('listHazard.length', listHazard.length);
    try{
      result = await database.buma.find().$.subscribe(hazard => {
        // console.log(hazard)
        setListHazard(hazard)
      });

      sub.push(result);

      console.log('sub', sub)

    }catch (e) {
      console.log(e)
    }
    */
    // console.log(result)

    // console.log('result find', result);
    // let dump = await database.buma.dump();
    // console.log('dump data', dump.docs.length)
    // setListHazard(result)
    setIsFetching(false);
    return null;
  };

  const onEndReached = async database => {
    setIsFetching(true);
    /*
    let result = null;
    console.log('listHazard.length', listHazard.length);
    try{
      result = await database.buma.pouch.find({selector:{},
        limit:20,
        skip: listHazard.length
      });
    }catch (e) {
      console.log(e)
    }

    // console.log('result find', result);
    // let dump = await database.buma.dump();
    // console.log('dump data', dump.docs.length)
    setListHazard(listHazard.concat(result.docs))
    */
    setIsFetching(false);
    return null;
  };

  const subscribeHazardList = async (database) => {
    let result = null;
    console.log('listHazard.length', listHazard.length);
    try{
      result = await database.buma.find().$.subscribe(hazard => {
        // console.log(hazard)
        setListHazard(hazard)
      });

      sub.push(result);

      console.log('sub', sub)

    }catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    subscribeHazardList(database);
    return () => {
      console.log('UNMOUNTED');
      sub.forEach(sub => {
        console.log(sub)
        const unsub = sub.unsubscribe();
        console.log('unsubscribe', unsub);
      });
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={config.color.common.darkRed}
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={listHazard}
          renderItem={item => (
            <EnhancedHazardItem
              database={database}
              hazards={item.item}
              onPress={() => goToDetail(item, navigation)}
            />
          )}
          keyExtractor={item => item.id}
          onRefresh={() => refresh(database)}
          refreshing={isFetching}
          // onEndReached={() => onEndReached(database)}
        />
      </View>
    </>
  );
};


export default ListHazard;
