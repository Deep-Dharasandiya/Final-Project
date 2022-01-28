import React from 'react'
import { StatusBar,Platform} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ContextStore from '../context/store/ContextStore';
import { rootContext } from '../context/store/ContextStore';
import PushNotification from 'react-native-push-notification';
import Loader from '../components/Loader';
import { getBookPost, getCommanReducer, getUserBook} from '../context/localStorage/LocalStorage';
import { setFCMToken } from '../context/actions/commonActions';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Aleart from '../components/Aleart';
import Toast from '../components/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
import { handleNotificationData } from '../..';

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
import SellerChatBoard from '../screens/AuthorizedScreen/Chat/Seller/SellerChatBoard';
import BuyerChatBoard from '../screens/AuthorizedScreen/Chat/Buyer/BuyerChatBoard';
import { Colors } from '../constant/Colors'

export default function App(props) {
  const [isLoad, setIsLoad] = React.useState(false);
  async function getInitialDetails(){
    await getBookPost();
    await getCommanReducer();
    await getUserBook();
    const temp = JSON.parse(await AsyncStorage.getItem('notification'));
    if(temp){
      for (i = 0; i < temp.length; i++) {
        await handleNotificationData(temp[i]);
      }
    }
    await AsyncStorage.setItem('notification', JSON.stringify([]));
    setIsLoad(true);
  }
  React.useEffect( () => {
    getInitialDetails();
    if(Platform.OS=='android'){
      //StatusBar.setTranslucent(true);
    }
    StatusBar.setBarStyle('dark-content', true);
   // PushNotification.deleteChannel("fcm_fallback_notification_channel");
  }, []);
  return (
    <ContextStore>
    <SafeAreaProvider>
      {
        isLoad &&(
            <AllScreens />
        )
      }
    </SafeAreaProvider>
    </ContextStore>
  
  )
}
function AllScreens(){
  const data = React.useContext(rootContext);
  return(
    <NavigationContainer>
      <Loader
        isVisible={data.commonReducerState.isLoading}
      />
      <StatusBar 
      barStyle="light-content"
        backgroundColor={'#A134F8'}
       />
      <Aleart/>
      <Toast/>
      <Stack.Navigator>
        
    {
          data.commonReducerState.isLogin?
        <>
            <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} options={{ headerShown: false }} />
              <Stack.Screen name="SellerChatBoard" component={SellerChatBoard} options={{ headerShown: false }} />
              <Stack.Screen name="BuyerChatBoard" component={BuyerChatBoard} options={{ headerShown: false }} />
        </>
        :
        <>
            <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: false }} />
            <Stack.Screen name="Register1" component={Register1} options={{ headerShown: false }} />
            <Stack.Screen name="Register2" component={Register2} options={{ headerShown: false }} />
            <Stack.Screen name="Register3" component={Register3} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword1" component={ForgotPassword1} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword2" component={ForgotPassword2} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword3" component={ForgotPassword3} options={{ headerShown: false }} />
        </>
    }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
