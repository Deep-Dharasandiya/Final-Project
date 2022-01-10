import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView,StatusBar,KeyboardAvoidingView} from 'react-native'
import {height, unit, width} from '../constant/ScreenDetails'
import Colors from '../constant/Colors';
import TextFeild from '../components/input/textFeild'; 
import CheckBox from '../components/input/CheckBox';
import RoundedButton from '../components/button/RoundedButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isPhoneNumber, isValidPassword } from '../constant/Validation';
import PhoneNumberFeild from '../components/input/PhoneNumberFeild';

export default function Login(props) {
    const [contactNumber, setContactNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isTerms , setIsTearms] = React.useState(false);
    const [isRemember , setIsRemember] = React.useState(false);
    function onChangeContactNumber(text){
        setContactNumber(text);
    }
    function onChangePassword(text) {
        setPassword(text);
    }
    function onCheckTearms(){
        setIsTearms(!isTerms);
    }
    function onCheckRemember(){
        setIsRemember(!isRemember);
    }
    function onLogin(){
        props.navigation.navigate('BottomTabNavigation');
        /*if(contactNumber !='' && password != ''){
            if (isPhoneNumber(contactNumber)){
              if (isValidPassword(password)) {
                  if (isTerms) {
                      alert("Successfully Login")
                  } else {
                      alert("Please accept the Terms and Condition")
                  }
              } else {
                  alert("Password not valid")
              }
          }else{
              alert("Enter Valid Contact Number")
          }
        }else{
            alert("Please enter both Register Contact Number and password")
        }*/
    }
    function onRegister(){
        props.navigation.navigate('Register1');
    }
    function onFAQ() {
        props.navigation.navigate('FAQ');
    }
    function onForgotPassword(){
        props.navigation.navigate("ForgotPassword1");
    }
    function onTerms(){
       
    }
    function onPolicy(){

    }
    const highlightTerms = string =>
      <Text 
        style={styles.underLineText}
        onPress={()=>onTerms()}
      >{string} </Text>
      

    const highlightPolicy = string =>
        <Text 
             style={styles.underLineText}
            onPress={onPolicy}
        >{string} </Text>
        
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                resizeMode="contain"
                source={require('../assets/logoHorizontal/logo.png')}
            />
           <View style={styles.card}>
                <PhoneNumberFeild
                    lable={"Contact Number(XXXXXXXXXX)"}
                    onChange={onChangeContactNumber}
                    value={contactNumber}
                />
                <TextFeild
                    lable={"Password:"}
                    onChange={onChangePassword}
                    value={password}
                    secureText={true}
                />
                <View style={styles.termsView}>
                    <CheckBox 
                        onCheck={onCheckTearms}
                        value={isTerms}
                    />
                    <View style={{ marginLeft: 10 * unit, flexDirection: 'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={styles.simpleText}>I accept {highlightTerms('Terms & Conditions ')}and consent to the {highlightPolicy('Privacy Policy')}.</Text>
                    </View>
                </View>
                <RoundedButton
                    lable={"Log in"}
                    onClick={onLogin}
                    dark={true}
                />

                <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.85,alignSelf:'center',marginTop:15* unit,alignItems:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <CheckBox 
                            onCheck={onCheckRemember}
                            value={isRemember}
                        />
                        <View style={{ marginLeft: 10 * unit,}}>
                            <Text style={styles.simpleText}>Remember Me</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={onForgotPassword}
                    >
                        <Text style={{...styles.simpleText,color:Colors.purple}}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView style={styles.bottomView}>
                    <TouchableOpacity
                        onPress={onFAQ}
                    >
                        <Text style={styles.faq}>Frequently Asked Questions</Text>
                    </TouchableOpacity>

                    <RoundedButton
                        lable={"Register"}
                        onClick={onRegister}
                        dark={false}
                    />
                    <Text style={styles.version}>version 1.01.01</Text>
                </KeyboardAvoidingView>
              
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.purple,
    },
    card:{
        marginTop:height*0.05,
        flex:1,
        backgroundColor:Colors.white,
        borderTopRightRadius:40 * unit,
        borderTopLeftRadius: 40 * unit,
    },
    logo: {
        marginTop: height * 0.08,
        alignSelf: 'center',
        width: width * 0.65,
        height: (width * 0.65) / 3.5625
    },
    termsView: {
        alignSelf: 'center',
        marginTop: 15 * unit,
        flexDirection: 'row',
        width: width * 0.85,
    },
    simpleText:{
        fontSize: 15 * unit,
    },
    underLineText: {
        fontSize: 15 * unit,
        color:Colors.purple,
        textDecorationLine:'underline',
    },
    bottomView: {
        width: width,
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        bottom: 15 * unit,
        alignItems: 'center',
        justifyContent: 'center',

    },
    faq: {
        marginBottom: 10 * unit,
        fontSize: 17 * unit,
        color: Colors.purple
    },
    version: {
        marginTop: 15 * unit,
        fontSize: 16 * unit,
        color: Colors.purple
    }
})
