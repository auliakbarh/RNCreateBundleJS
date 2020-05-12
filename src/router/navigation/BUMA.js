import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

/**
 * Screen
 */
import {HazardForm, HazardDetail, ListHazard} from '../../screens/BUMA';
import * as screenName from '../screenNames';
import config from '../../config';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function({database}) {
  return (
    <Tab.Navigator
      initialRouteName={screenName.HAZARD_FORM_TAB}
      backBehavior={'none'}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        style: {
          backgroundColor: config.color.common.darkRed,
        },
      }}>
      <Tab.Screen name={screenName.HAZARD_FORM_TAB}>
        {function({navigation, route}) {
          return (
            <HazardForm
              navigation={navigation}
              route={route}
              database={database}
            />
          );
        }}
      </Tab.Screen>
      <Tab.Screen name={screenName.HAZARD_SUBMITTED_REPORT_TAB}>
        {function({navigation, route}) {
          return (
            <Stack.Navigator>
              <Stack.Screen name={screenName.HAZARD_LIST_SCREEN}>
                {function({navigation, route}) {
                  return (
                    <ListHazard
                      navigation={navigation}
                      route={route}
                      database={database}
                    />
                  );
                }}
              </Stack.Screen>
              <Stack.Screen
                name={screenName.HAZARD_DETAIL_SCREEN}
                component={HazardDetail}
              />
            </Stack.Navigator>
          );
        }}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
