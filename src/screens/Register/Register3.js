import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import Colors from '../../constant/Colors'
import { unit, width, height } from '../../constant/ScreenDetails'
import RoundedButton from '../../components/button/RoundedButton'
import { isValidPassword, isEmail} from '../../constant/Validation'
import TextFeild from '../../components/input/textFeild';
import DropDawnList from '../../components/input/DropDawnList'
import MediaSelection from '../../components/input/MediaSelection'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CheckBox from '../../components/input/CheckBox';
import storage from '@react-native-firebase/storage';

export default function Register3(props) {
    const [profileUri, setProfileUri] = React.useState('');
    const [mediaFlag, setMediaFlag] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [city, setCity] = React.useState('');
    const [collage, setCollage] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setconfirmPassword] = React.useState('');
    const [isTerms, setIsTearms] = React.useState(false);
    let cityData = [{
        value: 'Gandhinagar',
    }, {
        value: 'Ahmedabad',
    }, {
        value: 'Surat',
    }];
    let collageData = [{
        value: 'LDRP-ITR',
    }, {
        value: 'GEC-Gandhinagar',
    }, {
        value: 'LJIT',
    }];
    let mediaData = [{
        value: 'Camera',
    }, {
        value: 'Gallery',
    }];
    function onChangeFirstName(text) {
        setFirstName(text);
    }
    function onChangeLastName(text) {
        setLastName(text);
    }
    function onChangeEmail(text) {
        setEmail(text);
    }
    function onChangeCity(value) {
        setCity(value);
    }
    function onChangeCollage(value) {
        setCollage(value);
    }
    function onChangePassword(text) {
        setPassword(text);
    }
    function onChangeComfirmPassword(text) {
        setconfirmPassword(text);
    }
    function onChangeMedia(text){
        if (text =='Camera'){
            onChangeCameraImage();
        }else{
            onChangeGelleryImage();
        }
    }
    function handleMediaFlag(flag){
        setMediaFlag(flag);
    }
    function onCheckTearms() {
        setIsTearms(!isTerms);
    }
    function onTerms() {

    }
    function onPolicy() {

    }
    const highlightTerms = string =>
        <Text
            style={styles.underLineText}
            onPress={() => onTerms()}
        >{string} </Text>


    const highlightPolicy = string =>
        <Text
            style={styles.underLineText}
            onPress={onPolicy}
        >{string} </Text>

    async function uploadImage(uri){
        const reference = storage().ref(`Profile Picture/Profile_${"1212124514"}.png`);
        await reference.putFile(uri);
        console.log(await storage().ref(`Profile Picture/Profile_${"1212124514"}.png`).getDownloadURL())
    }
    const options = {
        storageOptions: {
            path: 'images',
            mediaType: 'photo',
        },
        includeBase64: false,
    };

    function onChangeCameraImage() {
        launchCamera(options, response => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                if (response.hasOwnProperty('assets')) {
                    setProfileUri(response.assets[0]['uri']);
                }
            }
        });
    }
    function onChangeGelleryImage() {
        launchImageLibrary(options, response => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                if (response.hasOwnProperty('assets')) {
                    setProfileUri(response.assets[0]['uri']);
                    //uploadImage(response.assets[0]['uri']);
                }

            }
        });

    }
    function onRegister() {
        if (firstName !='' && lastName !='' && email!='' && city!='' && collage !='' && password != '' && confirmPassword != '') {
            if(profileUri !=''){
                if (isEmail(email)) {
                    if (isValidPassword(password)) {
                        if (password == confirmPassword) {
                            if(isTerms){
                                alert("password changed");
                            }else{
                                alert("Please accept the Terms and Condition")
                            }
                        } else {
                            alert("Both password should be same")
                        }
                    } else {
                        alert("Enter Valid Password")
                    }
                } else {
                    alert("Enter Valid Email address")
                }
            }else{
                alert("Please select the prifile picture")
            }
        } else {
            alert("Please enter all the details")
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
                <ScrollView>
                <View style={styles.textView}>
                    <Text style={styles.simpleText}>
                        Please enter your Details for Registration on Bookverse.
                    </Text>
                </View>
                <MediaSelection
                    flag={mediaFlag}
                    lable="Select Media:"
                    flagChange={handleMediaFlag}
                    data={mediaData}
                    fn={onChangeMedia}
                />
                <TouchableOpacity
                    style={styles.profileImage}
                    onPress={() => setMediaFlag(true)}
                >
                    {
                        profileUri?
                        <Image
                            source={{ uri: profileUri }}
                            style={styles.imgstyle} 
                        />
        
                        :
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={styles.pictureSign}
                                resizeMode="contain"
                                source={require('../../assets/picture/picture.png')}
                            />
                            <Text style={styles.profileLable}>Profile Image:</Text>
                        </View>
                    }
                     
                </TouchableOpacity>
                    <Text style={styles.profileLable}>{profileUri ? "Profile Image:" : ''}</Text>
                <TextFeild
                    lable={"First Name"}
                    onChange={onChangeFirstName}
                    value={firstName}
                />
                <TextFeild
                    lable={"Last Name"}
                    onChange={onChangeLastName}
                    value={lastName}
                />
                <TextFeild
                    lable={"Email Address"}
                    onChange={onChangeEmail}
                    value={email}
                    keypadtipe="email-address"
                />
                <DropDawnList
                    value={city}
                    lable="Select Your City:"
                    data={cityData}
                    fn={onChangeCity}
                />
                <DropDawnList
                    value={collage}
                    lable="Select Your Collage:"
                    data={collageData}
                    fn={onChangeCollage}
                />
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
                <View style={styles.termsView}>
                    <CheckBox
                        onCheck={onCheckTearms}
                        value={isTerms}
                    />
                    <View style={{ marginLeft: 10 * unit, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.normalText}>I accept {highlightTerms('Terms & Conditions ')}and consent to the {highlightPolicy('Privacy Policy')}.</Text>
                    </View>
                </View>
                <View style={{ marginVertical: 20 * unit }}>
                    <RoundedButton
                        lable={"Register"}
                        onClick={onRegister}
                        dark={true}
                    />
                </View>
                </ScrollView>
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
    termsView: {
        alignSelf: 'center',
        marginTop: 15 * unit,
        flexDirection: 'row',
        width: width * 0.85,
    },
    normalText: {
        fontSize: 15 * unit,
    },
    underLineText: {
        fontSize: 15 * unit,
        color: Colors.purple,
        textDecorationLine: 'underline',
    },
    simpleText: {
        fontSize: 17 * unit,
        color: Colors.black,
        marginBottom: 10 * unit
    },
    pictureSign:{
       height:50 * unit,
       width:50*unit
    },
    profileImage:{
        height:150 * unit,
        width:150 * unit,
        borderRadius:75* unit,
        borderWidth:1,
        borderColor:Colors.purple,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'

    },
    imgstyle:{
        height: 147 * unit,
        width: 147 * unit,
        borderRadius: 73.5 * unit,
    },
    profileLable:{
        textAlign:'center',
        fontSize:13 * unit,
        marginTop:10 * unit,
    }
})
