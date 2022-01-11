import React from 'react'
import { StatusBar,Platform} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


import LandingScreen from '../screens/LandingScreen'
import Login from '../screens/Login';
import FAQ from '../screens/FAQ';
import Register1 from '../screens/Register/Register1';
import Register2 from '../screens/Register/Register2';
import Register3 from '../screens/Register/Register3';
import ForgotPassword1 from '../screens/forgotPassword/ForgotPassword1';
import ForgotPassword2 from '../screens/forgotPassword/ForgotPassword2';
import ForgotPassword3 from '../screens/forgotPassword/ForgotPassword3';

import BottomTabNavigation from './BottomTabNavigation';

export default function App(props) {
  React.useEffect( () => {
    if(Platform.OS=='android'){
      StatusBar.setTranslucent(true);
    }
    StatusBar.setBarStyle('dark-content', true);



    async function getFCMToken(){
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken);
      } 
    }
    getFCMToken();




    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('App.js  Message handled in the background!', remoteMessage);
    });



    messaging().onMessage(async remoteMessage => {
      console.log(' App.js A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'default', // (required)
      },
      // (optional) callback returns whether the channel was created, false means it already existed.
    );


    PushNotification.configure({
      onNotification: function (notification) {
       // console.log('NOTIFICATION:', notification);
      //  console.log(notification);
        const clicked = notification.userInteraction;
        if (clicked) {
          console.log('cliked')
        } else {
          PushNotification.localNotification({
            //largeIcon: 'ic_launcher',
            channelId:'cm_fallback_notification_channel',
            title: 'Test',
            android: {
              smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            },
            //message: JSON.stringify(xyz.notificationResponse.bookingId),
          });
        }
      },

      userInteraction: true,
     // senderID: '551192187233',
      popInitialNotification: true,
      requestPermissions: true,
    });
   // PushNotification.deleteChannel("fcm_fallback_notification_channel");
  }, []);


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: false }} />
          <Stack.Screen name="Register1" component={Register1} options={{ headerShown: false }} />
          <Stack.Screen name="Register2" component={Register2} options={{ headerShown: false }} />
          <Stack.Screen name="Register3" component={Register3} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword1" component={ForgotPassword1} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword2" component={ForgotPassword2} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword3" component={ForgotPassword3} options={{ headerShown: false }} />

          <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} options={{ headerShown: false }} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  
  )
}
