import React from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity,FlatList} from 'react-native'
import Colors from '../constant/Colors'
import {unit,width,height } from '../constant/ScreenDetails'

export default function FAQ(props) {
    const [isShow , setIsShow] = React.useState([]);
    function openClose(index){
        if (isShow.filter((i) => i == (index + 1)) == index + 1){
            setIsShow(isShow.filter(item => item !== index+1));
        }else{
            setIsShow([...isShow, index + 1]);
        }
    }
    const faqData=[
        {
            que:"What is VETpass?",
            ans:"Our most important job is to help you take the best care of your pet and take the stress out of being a pet owner. \n Got a pet problem? We are here to help."
        },
        {
            que: "What can i use VETpass for?",
            ans: "Answer of What can i use VETpass for"
        },
        {
            que: "When to use VETpass?",
            ans: "Answer of When to use VETpass"
        },
        {
            que: "Do i need to have pet insurance to use VETpass?",
            ans: "Answer of Do i need to have pet insurance to use VETpass"
        },
        {
            que: "Can i use VETpass in an emergency situation?",
            ans: "Answer of Can i use VETpass in an emergency situation"
        },
        {
            que: "When can i access VETpass and How much does it cost?",
            ans: "Answer of When can i access VETpass and How much does it cost"
        },
        {
            que: "Can i get a discount for more frequent vet appointments?",
            ans: "Answer of Can i get a discount for more frequent vet appointments?"
        },
    ]
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <TouchableOpacity
                    onPress={() => props.navigation.pop()}
                >
                    <Image
                        style={styles.backArrow}
                        resizeMode="contain"
                        source={require('../assets/back/back.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Frequently Asked Questions
                </Text>
            </View>
            <View style={styles.card}>
                <FlatList
                    key={1}
                    data={faqData}
                    listMode="SCROLLVIEW"
                    keyExtractor={(item, index) => `key-${index}`}
                    ListHeaderComponent={() => (
                        <View style={styles.textView}>
                            <Text style={styles.subTitleText}>
                                Wondering how Bookverse works? We have put together a list of all our  most frequetly asked questions.
                            </Text>
                        </View>
                    )}
                    renderItem={({ item ,index}) => {
                        return <View style={{ marginBottom: 10 * unit,}}>
                            <TouchableOpacity 
                                style={styles.queView}
                                onPress={()=>openClose(index)}
                            >
                            <Text>{item.que}</Text>
                                <Image
                                    style={styles.sign}
                                    resizeMode="contain"
                                    source={isShow.filter((i) => i == (index + 1)) == index + 1 ? require('../assets/close/close.png') : require('../assets/more/more.png')}
                                />
                            </TouchableOpacity>
                            {
                                (isShow.filter((i)=>i==(index+1))==index+1) &&(
                                    <View style={styles.ansView}>
                                        <Text>{item.ans}</Text>
                                    </View>
                                )
                            }
                           
                    </View>
                    }}
                />
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
        fontSize: 21 * unit,
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
    textView:{
        width:width*0.85,
        alignSelf:'center',
        paddingVertical:20* unit
    },
    subTitleText:{
        color:Colors.black,
        fontSize:15*unit,
    },
    queView:{
        width:width*0.85,
        alignSelf:'center',
        padding:12 * unit,
        paddingRight:40 * unit,
        backgroundColor:Colors.blurPurple,
        borderRadius:10 * unit,
        justifyContent:'center',
    },
    ansView: {
        width: width * 0.85,
        alignSelf: 'center',
        paddingHorizontal: 12 * unit,
        marginVertical: 10 * unit,
        justifyContent: 'center',
    },
    sign: {
        position: 'absolute',
        height: 18 * unit,
        width: 18 * unit,
        right: 15 * unit,

    },

})
