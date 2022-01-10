import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Colors from '../../constant/Colors'
import { unit, width, height } from '../../constant/ScreenDetails'
import PhoneNumberFeild from '../../components/input/PhoneNumberFeild'
import RoundedButton from '../../components/button/RoundedButton'
import { isValidPassword } from '../../constant/Validation'
import TextFeild from '../../components/input/textFeild'; 

export default function ForgotPassword3(props) {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setconfirmPassword] = React.useState('');
    function onChangePassword(text) {
        setPassword(text);
    }
    function onChangeComfirmPassword(text) {
        setconfirmPassword(text);
    }
    function onSend() {
        if (password != '' && confirmPassword !='') {
            if (isValidPassword(password)) {
                if(password==confirmPassword){
                    alert("password changed");
                }else{
                    alert("Both password should be same")
                }
            } else {
                alert("Enter Valid Password")
            }

        } else {
            alert("Please enter the Both Password")
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
                    Change the Password
                </Text>
            </View>
            <View style={styles.card}>
                <View style={styles.textView}>
                    <Text style={styles.simpleText}>
                        Please enter your New password.
                    </Text>
                </View>
                <TextFeild
                    lable={"New Password"}
                    onChange={onChangePassword}
                    value={password}
                    secureText={true}
                />
                <TextFeild
                    lable={"Confirm Password"}
                    onChange={onChangeComfirmPassword}
                    value={confirmPassword}
                    secureText={true}
                />
                <View style={{ marginTop: 10 * unit }}>
                    <RoundedButton
                        lable={"Submit"}
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
