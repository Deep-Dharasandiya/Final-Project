import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import { unit, width,height } from '../constant/ScreenDetails'
import Colors from '../constant/Colors';
import RoundedButton from '../components/button/RoundedButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function LandingScreen(props) {
    React.useEffect(() => {
        StatusBar.setBarStyle('dark-content', true);
        SplashScreen.hide();
    }, []);
    function onSignIn(){
        props.navigation.navigate('Login');
    }
    function onRegister() {
        props.navigation.navigate('Register1');
    }
    function onFAQ() {
        props.navigation.navigate('FAQ');
    }
    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.bgimage}
                resizeMode="contain"
                source={require('../assets/bgPattern/bgPattern.png')}
            /> */}
            <Image
                style={styles.logo}
                source={require('../assets/logoVertical/logo.png')}
            />
            <View style={styles.bottomView}>
                <TouchableOpacity
                    onPress={onFAQ}
                >
                    <Text style={styles.faq}>Frequently Asked Questions</Text>
                </TouchableOpacity>

                <RoundedButton
                    lable={"Log in"}
                    onClick={onSignIn}
                    dark={false}
                />
                <RoundedButton
                    lable={"Register"}
                    onClick={onRegister}
                    dark={true}
                />
                <Text style={styles.version}>version 1.01.01</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    bgimage:{
        position:'absolute',
        top:0,
        right:0,
        height:height,
        width:width,
    },
    logo:{
        marginTop:150 * unit,
        alignSelf:'center',
        width:width*0.65,
        height:  (width * 0.65)/1.38356
    },
    bottomView:{
        width:width,
        alignItems:'center',
        position:'absolute',
        left:0,
        bottom:20,
        alignItems:'center',
        justifyContent:'center'
    },
    faq:{
        marginBottom: 15 * unit,
        fontSize: 18 * unit,
        color: Colors.purple
    },
    version:{
        marginTop:15 * unit,
        fontSize: 18 * unit,
        color:Colors.purple
    }
    
})
