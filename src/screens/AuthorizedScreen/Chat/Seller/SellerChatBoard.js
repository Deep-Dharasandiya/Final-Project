import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity ,KeyboardAvoidingView } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
//style
import CommonStyles from '../../../CommonStyles'
//utils
import { color } from 'react-native-reanimated'
import Colors from '../../../../constant/Colors'
import { unit,width,height } from '../../../../constant/ScreenDetails'
import { updateBookPost } from '../../../../context/actions/bookPostActions'
import { addBuyerNewBook, deleteBuyerBook } from '../../../../context/actions/buyerBookActions'
import { addNewUserBook, deleteUserBook } from '../../../../context/actions/userBookAction'
import { addDeliveredFlag, addSellerConfirmation } from '../../../../networkServices/AuthenticationServices'
import { rootContext } from '../../../../context/store/ContextStore'
import ConfirmationAleart from '../../../../components/confirmationAleart';
export default function SellerChatBoard(props) {
  const [message,setMessage]=React.useState('');
    const [bookDetails, setBookDetails] = React.useState(props.route.params.bookDetails);
    const [request, setRequest] = React.useState(props.route.params.item)
    const [confirmationDealTrue, setConfirmationDealTrue] = React.useState(false);
    const [confirmationDealFalse, setConfirmationDealFalse] = React.useState(false);
    const [confirmationRecieved, setConfirmationRecieved] = React.useState(false);
    const data = React.useContext(rootContext);
    const currentUserID = data.commonReducerState.userDetails._id;
    const temp = data.buyerBookReducerState.buyerBookData.filter((item) => item._id == props.route.params.item._id)[0]
    if (temp != bookDetails) {
        if (temp) {
            setBookDetails(temp);
            setRequest(temp.requests.filter((item) => item._id == props.route.params.item._id))
        }
    }
    React.useEffect(() => {
    }, []);

    function onChangeMessage(text){
        setMessage(text);
    }
   async function onConfirmation(flag){
       const body = {
           bookID: bookDetails._id,
           userID: request.userID._id,
           isConfirm:flag,
       }
       console.log("body",body)
       const response=await addSellerConfirmation(body);
       console.log("confirmation",response);
       if (response && response.isAdd){
           deleteUserBook(response.data._id);
           addNewUserBook(response.data);
           updateBookPost(response.data);
           props.navigation.pop();
       }

    }
    async function onDeliverd() {
        const body = {
            bookID: bookDetails._id,
            userID: request.userID._id
        }
        console.log("body", body)
        const response = await addDeliveredFlag(body);
        console.log("confirmation", response);
        if (response && response.isAdd) {
            deleteUserBook(response.data._id);
            addNewUserBook(response.data);
            updateBookPost(response.data);
            props.navigation.pop();
        }
    }
    function handleConfirmationDealTrue(flag) {
        setConfirmationDealTrue(false);
        if (flag) {
            onConfirmation(true);
        }
    }
    function handleConfirmationDealFalse(flag) {
        setConfirmationDealFalse(false);
        if (flag) {
            onConfirmation(false);
        }
    }
    function handleConfirmationReceived(flag) {
        setConfirmationRecieved(false);
        if (flag) {
            onDeliverd(true);
        }
    }
    return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.appBar}>
                <View style={{...styles.appBarBody,paddingVertical:10* unit}}>
                    <View style={styles.appBarBody}>
                        <TouchableOpacity
                            style={{ marginHorizontal: 15 * unit }}
                            onPress={() => props.navigation.pop()}
                        >
                            <Image
                                style={CommonStyles.icon1Style}
                                resizeMode="contain"
                                source={require('../../../../assets/back/back.png')}
                            />
                        </TouchableOpacity>
                        <Image
                            style={{ ...CommonStyles.imageView0 }}
                            source={{ uri: request.userID.profileURL }}
                        />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                        <Text style={CommonStyles.font2White}>{request.userID.firstName + " " + request.userID.lastName}</Text>
                        <Text style={CommonStyles.font1White}>{bookDetails.title}</Text>
                    </View>
                </View>
                <ConfirmationAleart
                    isVisible={confirmationDealTrue}
                    lable={'Are you sure?'}
                    onPress={handleConfirmationDealTrue}
                />
                <ConfirmationAleart
                    isVisible={confirmationDealFalse}
                    lable={'Are you sure?'}
                    onPress={handleConfirmationDealFalse}
                />
                <ConfirmationAleart
                    isVisible={confirmationRecieved}
                    lable={'Are you sure?'}
                    onPress={handleConfirmationReceived}
                />
                {
                    (request.status == 0 || request.status == 20) &&(
                        <View style={{ ...styles.appBarBody, marginTop: 5 * unit, borderTopWidth: 1, borderColor: Colors.white, paddingVertical: 10 * unit, backgroundColor: '#591C6E' }}>
                            <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                                <Text style={CommonStyles.font1White}>Sell book to the user?</Text>
                            </View>
                            <TouchableOpacity style={styles.btn}
                              onPress={() => setConfirmationDealTrue(true)}
                            >
                                <Text style={CommonStyles.font2White}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                {
                    request.status == 1 && (
                        <View style={{ ...styles.appBarBody, marginTop: 5 * unit, borderTopWidth: 1, borderColor: Colors.white, paddingVertical: 10 * unit, backgroundColor: '#591C6E' }}>
                            <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                                <Text style={CommonStyles.font1White}>Revoke the confirmation?</Text>
                            </View>
                            <TouchableOpacity style={styles.btn}
                                onPress={() => setConfirmationDealFalse(true)}
                            >
                                <Text style={CommonStyles.font2White}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                {
                    (request.status == 2 || request.status == 40) &&(
                        <View style={{ ...styles.appBarBody, marginTop: 5 * unit, borderTopWidth: 1, borderColor: Colors.white,paddingVertical:10* unit,backgroundColor:'#591C6E'}}>
                            <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                                <Text style={CommonStyles.font1White}>Delivered book? </Text>
                            </View>
                            <TouchableOpacity style={styles.btn}
                               onPress={() => setConfirmationRecieved(true)}
                            >
                                <Text style={CommonStyles.font2White}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            

            </View>
            <ScrollView
                style={{ flex: 1, marginVertical: 10 * unit }}
            >
                <View style={styles.messageContainer}>
                    <View style={styles.messageBody}>
                        <Text style={CommonStyles.font1White}>Hello, How are you</Text>
                    </View>
                </View>
                <View style={{ ...styles.messageContainer, alignSelf: 'flex-start' }}>
                    <View style={{ ...styles.messageBody, backgroundColor: Colors.blurPurple, alignSelf: 'flex-start' }}>
                        <Text tyle={CommonStyles.font1White}>Hello ,I am fine </Text>

                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomView}>
                <View style={styles.textInputView}>
                    {/* <Image
                        style={{ ...CommonStyles.icon1Style, marginHorizontal: 10 * unit }}
                        resizeMode="contain"
                        source={require('../../../../assets/chatPurple/chat.png')}
                    /> */}
                    <TextInput
                        style={styles.textInput}
                        placeholder='Message'
                        placeholderTextColor={Colors.gray}
                        multiline={true}
                        onChangeText={(text) => onChangeMessage(text)}
                        defaultValue={message}
                    />
                </View>

                <View style={styles.sentButton}>
                    <Image
                        style={CommonStyles.icon1Style}
                        resizeMode="contain"
                        source={require('../../../../assets/send/send.png')}
                    />
                </View>
            </View>
        </View>
   /* <View style={styles.container}>
          
    <View style={styles.appBar}>
        <View style={styles.appBarBody}>
            <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center' ,marginTop:30* unit}}>
                <TouchableOpacity
                    style={{ marginLeft: 10 * unit }}
                    onPress={() => props.navigation.pop()}
                >
                    <Image
                        style={{ height: 23 * unit, width: 23 * unit }}
                        resizeMode="contain"
                        source={require('../../../../assets/backPurple/back.png')}
                    />
                </TouchableOpacity>
                    <Image
                        style={{ height: 40 * unit, width: 40 * unit ,borderRadius:20*unit,marginLeft:5* unit}}
                        // resizeMode="contain"
                        source={{ uri: props.route.params.item.userID.profileURL}}
                    />
                    <Text style={styles.appBarTitle}>{props.route.params.item.userID.firstName + " " + props.route.params.item.userID.lastName}</Text>
            </View>
                {
                    !props.route.params.item.sellerConformation ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width }}>
                            <View style={{ width: width * 0.6, paddingHorizontal: 10 * unit, paddingVertical: 5 * unit }}>
                                <Text>You can send confirmation here. </Text>
                            </View>
                            <TouchableOpacity style={{ height: 50 * unit, width: width * 0.35, backgroundColor: Colors.purple, marginRight: 10 * unit, marginBottom: 5 * unit, borderRadius: 10 * unit, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => onConfirmation()}
                            >
                                <Text style={{ color: Colors.white, fontSize: 18 * unit }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                        :
                          !props.route.params.item.buyerConformation?
                        <View style={{ width: width * 0.6, paddingHorizontal: 10 * unit, paddingVertical: 5 * unit }}>
                            <Text>confirmation sent waiting for buyer response </Text>
                        </View>
                        :
                        !props.route.params.item.deliverd?
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width }}>
                            <View style={{ width: width * 0.6, paddingHorizontal: 10 * unit, paddingVertical: 5 * unit }}>
                                <Text>confirm by the buyer add dilivery </Text>
                            </View>
                            <TouchableOpacity style={{ height: 50 * unit, width: width * 0.35, backgroundColor: Colors.purple, marginRight: 10 * unit, marginBottom: 5 * unit, borderRadius: 10 * unit, alignItems: 'center', justifyContent: 'center' }}
                                 onPress={() => onDeliverd()}
                            >
                                <Text style={{ color: Colors.white, fontSize: 18 * unit }}>Delivered</Text>
                            </TouchableOpacity>
                        </View>
                        :
                            <View style={{ width: width * 0.6, paddingHorizontal: 10 * unit, paddingVertical: 5 * unit }}>
                                <Text>waiting for buyer received </Text>
                            </View>
                }
            
        </View>
            </View>
        
        <ScrollView
         style={{flex:1,marginBottom:10* unit}}
        >
                <View style={{ width: width * 0.8, alignSelf: 'flex-end', marginRight: 10 * unit }}>
                    <View style={{ alignSelf: 'flex-end', padding: 10 * unit, borderRadius: 10 * unit, backgroundColor: Colors.purple, marginVertical: 5 * unit }}>
                        <Text style={{ color: Colors.white }}>Hello How are you</Text>

                    </View>
                </View>
            <View style={{ width: width * 0.8, alignSelf: 'flex-start', marginLeft: 10 * unit }}>
                <View style={{ alignSelf: 'flex-start', padding: 10 * unit, borderRadius: 10 * unit, backgroundColor: Colors.blurPurple, marginVertical: 5 * unit }}>
                    <Text>Hello How are you rfnug tiohh hijhyj khihh jij rjijg tjhiohjth thijh fnbfgnb fnfbfgb gbnbgb fgkng tiknhth hikynhyh thihhnh thith</Text>

                </View>
            </View>
            </ScrollView>
       
        <View style={styles.bottomView}>
            <View style={styles.textInputView}>
                    <Image
                        style={{ height: 23 * unit, width: 23 * unit ,marginHorizontal:10* unit}}
                        resizeMode="contain"
                        source={require('../../../../assets/backPurple/back.png')}
                    />
                <TextInput
                    style={styles.textInput}
                    placeholder='Message:'
                    placeholderTextColor={Colors.gray}
                    multiline={true}
                    onChangeText={(text) => onChangeMessage(text)}
                    defaultValue={message}
                />
            </View>
          
                <View style={styles.sentButton}>
                    <Image
                        style={{ height: 22 * unit, width: 22 * unit }}
                        resizeMode="contain"
                        source={require('../../../../assets/back/back.png')}
                    />
            </View>
        </View>
        
   </View>*/
    )
}

const styles = StyleSheet.create({
    appBar: {
       // paddingTop: 10 * unit,
        backgroundColor: Colors.purple
    },
    appBarBody: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        padding: 5 * unit,
        minWidth: 60 * unit,
        backgroundColor: Colors.green,
        ...CommonStyles.centerAlignMent,
        borderRadius: 10 * unit,
        marginHorizontal: 10 * unit,
    },
    messageContainer: {
        width: width * 0.8,
        alignSelf: 'flex-end',
        marginHorizontal: 10 * unit
    },
    messageBody: {
        alignSelf: 'flex-end',
        padding: 10 * unit,
        borderRadius: 10 * unit,
        backgroundColor: Colors.purple,
        marginVertical: 5 * unit,
        borderWidth: 1,
        borderColor: Colors.purple
    },
    bottomView: {
        marginVertical: 10 * unit,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textInput: {
        flex: 1,
        color: Colors.black,
        fontSize: 18 * unit,
        paddingHorizontal: 20 * unit,
        paddingVertical: 8 * unit,
    },
    textInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxHeight: 150 * unit,
        //height: width * 0.12,
        width: width * 0.80,
        borderRadius: 25 * unit,
        borderWidth: 1 * unit,
        borderColor: Colors.purple,
        marginLeft: (width * 0.08) / 3
    },
    sentButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: width * 0.06,
        backgroundColor: Colors.purple,
        marginHorizontal: (width * 0.08) / 3
    }
})
