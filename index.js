/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Router from './src/navigation';
import {name as appName} from './app.json';

const App = Router({database: null});

AppRegistry.registerComponent(appName, () => App);
