import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

/**
 * Screen
 */
import {RequestForm, RequestDetail, ListRequest} from '../../screens/ABL';
import * as screenName from '../screenNames';
import config from '../../config';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function({database}) {
  return (
    <Tab.Navigator
      initialRouteName={screenName.REQUEST_FORM_TAB}
      backBehavior={'none'}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        style: {
          backgroundColor: config.color.common.darkRed,
        },
      }}>
      <Tab.Screen name={screenName.REQUEST_FORM_TAB}>
        {function({navigation, route}) {
          return (
            <RequestForm
              navigation={navigation}
              route={route}
              database={database}
            />
          );
        }}
      </Tab.Screen>
      <Tab.Screen name={screenName.REQUEST_SUBMITTED_TAB}>
        {function({navigation, route}) {
          return (
            <Stack.Navigator>
              <Stack.Screen name={screenName.REQUEST_LIST_SCREEN}>
                {function({navigation, route}) {
                  return (
                    <ListRequest
                      navigation={navigation}
                      route={route}
                      database={database}
                    />
                  );
                }}
              </Stack.Screen>
              <Stack.Screen
                name={screenName.REQUEST_DETAIL_SCREEN}
                component={RequestDetail}
              />
            </Stack.Navigator>
          );
        }}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
