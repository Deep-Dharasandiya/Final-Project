import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
//utils
import App from './src/navigation/App';
import { name as appName } from './app.json';
import { addNewBookPost, deleteBookPost, updateBookPost } from './src/context/actions/bookPostActions'
import { addNewUserBook, deleteUserBook } from './src/context/actions/userBookAction';
import { state } from './src/context/store/ContextStore'
import { addBuyerNewBook, deleteBuyerBook } from './src/context/actions/buyerBookActions';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

messaging().onNotificationOpenedApp(remoteMessage => {
    AppRegistry.registerComponent(appName, () => App);
});
messaging().getInitialNotification().then(remoteMessage => {
    AppRegistry.registerComponent(appName, () => App);
});
PushNotification.createChannel(
    {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'default', // (required)
    },
);
export async function handleNotificationData(remoteData) {
    const data = JSON.parse(remoteData.data);
    if (data.type == 'ADD_New_Book') {
        addNewBookPost(data.newBook);
    } else if (data.type == 'ADD_Updated_Book') {
        deleteBookPost(data.updatedBook._id);
        addNewBookPost(data.updatedBook);
        const updateDetails = data.updatedBook;
        const book = state.buyerBookReducerState.buyerBookData.filter((item) => item._id == updateDetails._id)
        if (book.length==1){
            deleteBuyerBook(updateDetails._id)
            addBuyerNewBook(updateDetails);
        }
    } else if (data.type == 'Delete_Book') {
        deleteBookPost(data.deleteBook);
        deleteBuyerBook(data.deleteBook);
    } else if (data.type == 'ADD_UPDATE_BOOK_DEAL_BY_BUYER'){
        if (data.updateBook.userID._id == state.commonReducerState.userDetails._id){
            deleteUserBook(data.updateBook._id);
            addNewUserBook(data.updateBook);
        }
        updateBookPost(data.updateBook);
    }
    else if (data.type == 'ADD_UPDATE_BOOK_DEAL_BY_SELLER') {
        for (let i = 0; i < data.updateBook.requests.length;i++){
            if (data.updateBook.requests[i].userID._id == state.commonReducerState.userDetails._id){
                deleteBuyerBook(data.updateBook._id)
                addBuyerNewBook(data.updateBook);
                break;
            }
        }
        updateBookPost(data.updateBook);
    }

}
const notificationArray = [];
PushNotification.configure({
    onNotification: async function (notification) {
        try{
            await handleNotificationData(notification.data);
        }catch{
            notificationArray.push(notification.data);
            await AsyncStorage.setItem('notification', JSON.stringify(notificationArray));
        }
       
        const clicked = notification.userInteraction;
        if (clicked) {
        } else {
            PushNotification.localNotification({
                //largeIcon: 'ic_launcher',
                channelId: 'cm_fallback_notification_channel',
                title: 'Test',
                android: {
                    smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                },
                //message: JSON.stringify(xyz.notificationResponse.bookingId),
            });
        }
    },
    userInteraction: false,
    popInitialNotification: true,
    requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);