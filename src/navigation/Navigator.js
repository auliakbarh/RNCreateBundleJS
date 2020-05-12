import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

/**
 * Screen
 */
import Home from '../screens/Home';
import * as screenName from './screenNames';

const Stack = createStackNavigator();

export default function Navigator({database}) {
    return (
        <Stack.Navigator
            initialRouteName={screenName.HOME_SCREEN}
            headerMode={'float'}
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: {backgroundColor: 'blue'},
            }}>
            <Stack.Screen name={screenName.HOME_SCREEN}>
                {function({navigation, route}) {
                    return (
                        <Home navigation={navigation} route={route} database={database} />
                    );
                }}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
