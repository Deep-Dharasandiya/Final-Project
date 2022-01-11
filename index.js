/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/navigation/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
    );
    AppRegistry.registerComponent(appName, () => App);
});
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('index  background handler', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
