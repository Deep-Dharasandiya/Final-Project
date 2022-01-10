import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

export default function App() {
  React.useEffect(() => {
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content', true);
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
