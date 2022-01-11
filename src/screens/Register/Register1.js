import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Colors from '../../constant/Colors'
import { unit, width, height } from '../../constant/ScreenDetails'
import PhoneNumberFeild from '../../components/input/PhoneNumberFeild'
import RoundedButton from '../../components/button/RoundedButton'
import { isPhoneNumber } from '../../constant/Validation'
import auth from '@react-native-firebase/auth';

export default function Register1(props) {
    const [contactNumber, setContactNumber] = React.useState('');
    function onChangeContactNumber(text) {
        setContactNumber(text);
    }
    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        if (confirmation._auth._app._automaticDataCollectionEnabled){
            props.navigation.navigate('Register2',{confirmation:confirmation});
        }
    }
    function onSend() {
        if (contactNumber != '') {
            if (isPhoneNumber(contactNumber)) {
                //signInWithPhoneNumber("+91"+contactNumber);
               props.navigation.navigate('Register2');
            } else {
                alert("Enter Valid Contact Number")
            }

        } else {
            alert("Please enter the Register Contact Number")
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <TouchableOpacity
                    onPress={() => props.navigation.pop()}
                >
                    <Image
                        style={styles.backArrow}
                        resizeMode="contain"
                        source={require('../../assets/back/back.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Register
                </Text>
            </View>
            <View style={styles.card}>
                <View style={styles.textView}>
                    <Text style={styles.simpleText}>
                        Please enter your mobile number to Register.
                    </Text>
                </View>
                <PhoneNumberFeild
                    lable={"Contact Number(XXXXXXXXXX)"}
                    onChange={onChangeContactNumber}
                    value={contactNumber}
                />
                <View style={{ marginTop: 10 * unit }}>
                    <RoundedButton
                        lable={"OTP Send"}
                        onClick={onSend}
                        dark={true}
                    />
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purple,
    },
    headerView: {
        flexDirection: 'row',
        marginTop: 60 * unit,
        alignItems: 'center',
        width: width * 0.85,
        alignSelf: 'center'

    },
    backArrow: {
        height: 20 * unit,
        width: 20 * unit,
    },
    headerText: {
        marginLeft: 20 * unit,
        fontSize: 25 * unit,
        color: Colors.white,
        fontWeight: '500'
    },
    card: {
        marginTop: height * 0.03,
        flex: 1,
        backgroundColor: Colors.white,
        borderTopRightRadius: 40 * unit,
        borderTopLeftRadius: 40 * unit,
    },
    textView: {
        width: width * 0.85,
        alignSelf: 'center',
        marginTop: 20 * unit
    },
    simpleText: {
        fontSize: 17 * unit,
        color: Colors.black,
        marginBottom: 10 * unit
    },
})
