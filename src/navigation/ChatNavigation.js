import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


import ChatList from '../screens/AuthorizedScreen/Chat/ChatList';
import ChatBoard from '../screens/AuthorizedScreen/Chat/ChatBoard';


export default function ChatNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatList" component={ChatList} options={{ headerShown: false }} />
            <Stack.Screen name="ChatBoard" component={ChatBoard} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
