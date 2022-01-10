import React from "react";
import {StyleSheet,View, Text, TouchableOpacity,Image} from 'react-native';
import Colors from "../constant/Colors";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { width,unit,height } from "../constant/ScreenDetails";

const Tab = createBottomTabNavigator();

import HomeNavigation from "./HomeNavigation";
import UploadNavigation from "./UploadNavigation";
import ChatNavigation from "./ChatNavigation";

export default function BottomTabNavigation() {
    return (
      <Tab.Navigator
      initialRouteName="home"
      tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen name="Home" component={HomeNavigation} options={{headerShown:false}}/>
        <Tab.Screen name="Upload" component={UploadNavigation} options={{headerShown:false}}/>
        <Tab.Screen name="Chat" component={ChatNavigation} options={{ headerShown: false }}/>
    </Tab.Navigator>
    )
}


function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabBar}>

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const iconActive = {
          Home: require('../assets/homeActive/homeActive.png'),
          Upload:require('../assets/uploadActive/uploadActive.png'),
          Chat: require('../assets/chatActive/chatActive.png'),
        };
        const iconBlur = {
          Home: require('../assets/homeBlur/homeBlur.png'),
          Upload: require('../assets/uploadBlur/uploadBlur.png'),
          Chat: require('../assets/chatBlur/chatBlur.png'),
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>

            <View style={{ alignItems: 'center'}}>
              {
                isFocused?
                  <View style={styles.activeTabButton}>
                    <Image
                    style={styles.tabIcon}
                      source={iconActive[label]}
                    />
                  </View>
                  :
                  <Image
                    style={styles.tabIcon}
                    source={iconBlur[label]}
                  />
              }
              
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 50*unit,
    alignItems: 'center',
    paddingHorizontal: 5 * unit,
    backgroundColor: Colors.blurPurple,
  },
  activeTabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60 * unit,
    width: 60 * unit,
    borderRadius: 30 * unit,
    marginBottom: 10 * unit,
    backgroundColor: Colors.blurPurple
  },
  tabIcon: { 
    height: 20 * unit, 
    width: 20 * unit,
  }
})