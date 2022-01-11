import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Colors from '../../constant/Colors'
import { unit, width, height } from '../../constant/ScreenDetails'
import RoundedButton from '../../components/button/RoundedButton'
import OTPTextInput from '../../components/input/OTPTextInput'
import { isValidPin } from '../../constant/Validation'

export default function Register2(props) {
    const [otp, setotp] = React.useState('');

    function onChangeOTP(text) {
        setotp(text);
    }
    async function confirmCode() {
        try {
            const confirm = props.route.params.confirmation
            await confirm.confirm(otp);
        } catch (error) {
            console.log('Invalid code.');
        }
    }
    function onVerify() {
        if (otp != '') {
            if (isValidPin(otp)) {
                confirmCode();
               // props.navigation.navigate('Register3')
            } else {
                alert("OTP not valid")
            }
        } else {
            alert('Please enter OTP')
        }
    }
    function onResendOtp() {
        alert("OTP Resended")
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
                    OTP Verification
                </Text>
            </View>
            <View style={styles.card}>
                <View style={styles.textView}>
                    <Text style={styles.simpleText}>
                        Please enter your OTP which is sent your Mobile Number.
                    </Text>
                </View>
                <OTPTextInput
                    onChange={onChangeOTP}
                />
                <View style={{ marginTop: 10 * unit }}>
                    <RoundedButton
                        lable={"Verify"}
                        onClick={onVerify}
                        dark={true}
                    />
                    <RoundedButton
                        lable={"Resend OTP"}
                        onClick={onResendOtp}
                        dark={false}
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
