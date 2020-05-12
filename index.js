/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Router from './src/navigation';
import {name as appName} from './app.json';

import database from './src/database';

const App = Router({database});

AppRegistry.registerComponent(appName, () => App);
