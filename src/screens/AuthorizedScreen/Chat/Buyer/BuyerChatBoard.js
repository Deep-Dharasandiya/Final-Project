import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView,TextInput } from 'react-native'
//styles
import CommonStyles from '../../../CommonStyles'
//utils
import Colors from '../../../../constant/Colors'
import { unit,width } from '../../../../constant/ScreenDetails'
import { rootContext } from '../../../../context/store/ContextStore'
import { addBuyerConfirmation, addReceivedFlag } from '../../../../networkServices/AuthenticationServices'
import { addBuyerNewBook, deleteBuyerBook } from '../../../../context/actions/buyerBookActions'
import { updateBookPost } from '../../../../context/actions/bookPostActions'
import ConfirmationAleart from '../../../../components/confirmationAleart';
export default function BuyerChatBoard(props){
    const currentUserID = React.useContext(rootContext).commonReducerState.userDetails._id;
    const [message, setMessage] = React.useState('');
    const [bookDetails, setBookDetails] = React.useState(props.route.params.item);
    const data = React.useContext(rootContext);
    const temp = data.buyerBookReducerState.buyerBookData.filter((item) => item._id == props.route.params.item._id)[0]
    const [confirmationDealTrue, setConfirmationDealTrue] = React.useState(false);
    const [confirmationDealFalse, setConfirmationDealFalse] = React.useState(false);
    const [confirmationRecievedTrue, setConfirmationRecievedTrue] = React.useState(false);
    const [confirmationRecievedFalse, setConfirmationRecievedFalse] = React.useState(false);
    if (temp != bookDetails) {
        if (temp) {
            setBookDetails(temp);
        }
    }
    function onChangeMessage(text) {
        setMessage(text);
    }
    async function onConfirmation(flag) {
        const body = {
            bookID: bookDetails._id,
            userID: currentUserID,
            isConfirm: flag
        }
        console.log("body", body)
        const response = await addBuyerConfirmation(body);
        console.log("confirmation", response);
        if (response && response.isAdd) {
            deleteBuyerBook(response.data._id)
            addBuyerNewBook(response.data);
            updateBookPost(response.data);
        }
    }
    async function onReceived(flag) {
        const body = {
            bookID: bookDetails._id,
            userID: currentUserID,
            isConfirm: flag
        }
        console.log("body", body)
        const response = await addReceivedFlag(body);
        console.log("confirmation", response);
        if (response && response.isAdd) {
            deleteBuyerBook(response.data._id);
            updateBookPost(response.data);
            addBuyerNewBook(response.data);

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
    function handleConfirmationReceivedTrue(flag) {
        setConfirmationRecievedTrue(false);
        if (flag) {
            onReceived(true);
        }
    }
    function handleConfirmationReceivedFalse(flag) {
        setConfirmationRecievedFalse(false);
        if (flag) {
            onReceived(false);
        }
    }
  return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.appBar}>
              <View style={{ ...styles.appBarBody, paddingVertical: 10 * unit }}>
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
                          // resizeMode="contain"
                          source={{ uri: bookDetails.userID.profileURL }}
                      />
                    </View>
                    <View style={{flex:1,marginHorizontal:10* unit}}>
                      <Text style={CommonStyles.font2White}>{bookDetails.userID.firstName + " " + bookDetails.userID.lastName}</Text>
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
                  isVisible={confirmationRecievedTrue}
                  lable={'Are you sure?'}
                  onPress={handleConfirmationReceivedTrue}
              />
              <ConfirmationAleart
                  isVisible={confirmationRecievedFalse}
                  lable={'Are you sure?'}
                  onPress={handleConfirmationReceivedFalse}
              />
                {
                  bookDetails.requests.filter((item) => item.userID._id == currentUserID)[0].status == 1 &&(
                      <View style={{ ...styles.appBarBody, marginTop: 5 * unit, borderTopWidth: 1, borderColor: Colors.white, paddingVertical: 10 * unit, backgroundColor: '#591C6E' }}>
                          <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                              <Text style={CommonStyles.font1White}>Seller wants to sell book this to you!</Text>
                          </View>
                          <TouchableOpacity style={styles.btn}
                              onPress={() => setConfirmationDealTrue(true)}
                          >
                              <Text style={CommonStyles.font2White}>Yes</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ ...styles.btn, backgroundColor: Colors.red }}
                              onPress={() => setConfirmationDealFalse(true)}
                          >
                              <Text style={CommonStyles.font2White}>No</Text>
                          </TouchableOpacity>
                    </View>
                  )
                }
                {
                  bookDetails.requests.filter((item) => item.userID._id == currentUserID)[0].status == 3 &&(
                      <View style={{ ...styles.appBarBody, marginTop: 5 * unit, borderTopWidth: 1, borderColor: Colors.white, paddingVertical: 10 * unit, backgroundColor: '#591C6E' }}>
                          <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                              <Text style={CommonStyles.font1White}>Received the book?</Text>
                          </View>
                          <TouchableOpacity style={styles.btn}
                              onPress={() => setConfirmationRecievedTrue(true)}
                          >
                              <Text style={CommonStyles.font2White}>Yes</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ ...styles.btn, backgroundColor: Colors.red }}
                              onPress={() => setConfirmationRecievedFalse(true)}
                            >
                              <Text style={CommonStyles.font2White}>No</Text>
                          </TouchableOpacity>
                      </View>
                  )
                }
                
            </View>
          <ScrollView
              style={{ flex: 1, marginBottom: 10 * unit }}
          >
              <View style={styles.messageContainer}>
                  <View style={styles.messageBody}>
                      <Text style={CommonStyles.font1White}>Hello, How are you</Text>
                  </View>
              </View>
              <View style={{...styles.messageContainer,alignSelf:'flex-start'}}>
                  <View style={{...styles.messageBody,backgroundColor:Colors.blurPurple,alignSelf:'flex-start'}}>
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
    )
}
const styles = StyleSheet.create({
    appBar: {
        backgroundColor: Colors.purple
    },
    appBarBody:{
        alignSelf:'flex-start',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    btn:{
        padding:5* unit,
       minWidth:60*unit,
        backgroundColor:Colors.green,
        ...CommonStyles.centerAlignMent,
        borderRadius:10* unit,
        marginHorizontal:10* unit,
    },
    messageContainer:{
        width: width * 0.8, 
        alignSelf: 'flex-end', 
        marginHorizontal: 10 * unit 
    },
    messageBody:{
        alignSelf: 'flex-end',
        padding: 10 * unit, 
        borderRadius: 10 * unit, 
        backgroundColor: Colors.purple, 
        marginVertical: 5 * unit,
        borderWidth:1,
        borderColor:Colors.purple
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