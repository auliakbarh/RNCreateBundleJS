import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';

import App from './Navigator';

function RouterApp({database}) {
    return () => (
        <NavigationContainer>
            <App database={database} />
        </NavigationContainer>
    );
}

export default RouterApp;
