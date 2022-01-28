import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView ,Image} from 'react-native';
import Colors from '../constant/Colors';
import { unit,width,height } from '../constant/ScreenDetails';

import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
const drawer = createDrawerNavigator();

import PostList from '../screens/AuthorizedScreen/Home/PostList';
import PostDetails from '../screens/AuthorizedScreen/Home/PostDetails';
import HomeNavigation from './HomeNavigation';
import { rootContext } from '../context/store/ContextStore';
import CommonStyles from '../screens/CommonStyles';

export default function Drawer(props) {
   
    return (
        <drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: Colors.blurPurple,
                drawerActiveTintColor: Colors.purple,
                drawerInactiveTintColor: Colors.black,
                drawerLabelStyle: {
                    marginLeft: -20 *unit,
                    fontSize: 15 * unit,
                }
            }}
        >
            <drawer.Screen
                name="home"
                component={HomeNavigation}
                options={{
                    drawerIcon: ({ color }) => (
                        <Image
                           // style={styles.backArrow}
                            resizeMode="contain"
                            source={require('../assets/more/more.png')}
                        />
                    )
                }}
            />

        </drawer.Navigator>
    )
}

function CustomDrawer(props) {
    const data = React.useContext(rootContext);
    const currentUserID = data.commonReducerState.userDetails._id;
    function onLogout() {
        //props.navigation.popToTop();
       // dispatch(setLogout());
    }
    // <DrawerItemList {...props} />
    return (
        <View style={{ flex: 1,backgroundColor:Colors.blurPurple}}>
            <View style={styles.logoView}>
                <Text style={{ ...CommonStyles.font4White, fontSize: 45 * unit ,alignSelf:'flex-start'}}>BookVerse</Text>
                <View style={{ flexDirection: 'row', marginTop: 40 * unit, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: data.commonReducerState.userDetails.profileURL }}
                            style={{ height: width * 0.07, width: width * 0.07, borderRadius: width * 0.035, marginRight: 10 * unit }}
                        />
                        <View style={{ flex: 0.9 }}>
                            <Text style={CommonStyles.font1White}>{data.commonReducerState.userDetails.firstName + ' ' + data.commonReducerState.userDetails.lastName}</Text>
                            <Text style={{ ...CommonStyles.font1White, fontSize: 10 * unit }}>{data.commonReducerState.userDetails.college + ', ' + data.commonReducerState.userDetails.city}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                    >
                        <Image
                            style={{ height: 25 * unit, width: 25 * unit, marginRight: 20 * unit }}
                            resizeMode="contain"
                            source={require('../assets/back/back.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <DrawerContentScrollView
                {...props}
            >
              
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 50 * unit, paddingHorizontal: 10 * unit }}>
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/backPurple/back.png')}
                    />
                    <Text style={{...CommonStyles.font2Black,fontWeight:'300'}}>
                        Manage Account
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 50 * unit, paddingHorizontal: 10 * unit }}>
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/backPurple/back.png')}
                    />
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>
                        Purchases
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 50 * unit, paddingHorizontal: 10 * unit }}>
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/backPurple/back.png')}
                    />
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>
                        Sold Books
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 50 * unit, paddingHorizontal: 10 * unit }}>
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/backPurple/back.png')}
                    />
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>
                        Feedback
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 50 * unit, paddingHorizontal: 10 * unit }}>
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/backPurple/back.png')}
                    />
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>
                       Privacy Policy
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 50 * unit, paddingHorizontal: 10 * unit }}>
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/backPurple/back.png')}
                    />
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>
                        Terms and Conditions
                    </Text>
                </TouchableOpacity>
            </DrawerContentScrollView>
            <View style={styles.logoutView}>
                <Text style={{...CommonStyles.font2Purple,fontWeight:'500'}}>Created By</Text>
                <Text style={{...CommonStyles.font1Black,fontWeight:'300'}}>Jay, Deep and Kuldip</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    logoView: {
        paddingBottom:10* unit,
        backgroundColor: Colors.purple,
        paddingHorizontal:8* unit
    },
    logoutView: {
        marginBottom:  30 * unit,
        marginTop: 15 * unit,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        marginLeft: 10 * unit,
        fontSize: 20 * unit,
        color: Colors.purple,
        fontWeight: '600'
    }
})

