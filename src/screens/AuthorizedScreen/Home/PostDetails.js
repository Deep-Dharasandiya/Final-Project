import React from 'react'
import { ScrollView, StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import Colors from '../../../constant/Colors';
import { unit,width } from '../../../constant/ScreenDetails';
import RoundedButton from '../../../components/button/RoundedButton';
export default function PostDetails(props) {
    function onConnect(){

    }
    return (
    <View style={styles.container}>
        <View style={styles.appBar}>
            <View style={styles.appBarBody}>
                    <TouchableOpacity
                        onPress={() => props.navigation.pop()}
                    >
                        <Image
                            style={styles.backArrow}
                            resizeMode="contain"
                            source={require('../../../assets/back/back.png')}
                        />
                    </TouchableOpacity>
                <Text style={styles.appBarTitle}>Book Details</Text>
            </View>
        </View>
        <ScrollView>
            <View style={styles.bookImage}>

            </View>
            <View style={{marginLeft:15 * unit,marginTop:15*unit}}>
                    <Text style={styles.titleText}>Book's Name</Text>
                    <Text style={styles.normalText}>Book's condition</Text>
                    <Text style={styles.titleText}>200 ₹</Text>
                    <View style={{marginTop:10 * unit}}>
                        <Text style={styles.normalText}>About Book:</Text>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.simpleText}>
                            Ahbbb dbfh fuhufrh ggiht rfhruh fftyfe kmnj rguhh gthij6hjk etdtevfur thj7k77m rgubgrbrrg hihjijhhgf rfgvfyvwy htihni efubfyfyvbe rjgnntn
                        </Text>
                    </View>
                    <View style={{height:2*unit,width:width*0.90,backgroundColor:Colors.black,marginVertical:15 * unit}}/>
                    <Text style={styles.normalText}>Posted By:</Text>
                    <View style={styles.profileView}>
                        <View style={{marginLeft:10 * unit}}>
                            <Text style={{...styles.titleText,fontSize:22*unit}}>Deep Dharasandiya</Text>
                            <Text style={styles.normalText}>LDRP-ITR</Text>
                            <Text style={styles.normalText}>Gandhinagar</Text>
                        </View>
                        <View style={styles.profileImage}></View>
                    </View>
                    <View style={{ marginTop: 10 * unit }}>
                        <Text style={styles.normalText}>Contect Details:</Text>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.normalText}>2145124512</Text>
                        <Text style={styles.normalText}>abcd@gmail.com</Text>
                    </View>
                   
            </View>
        </ScrollView>
            <View style={{ marginVertical: 20 * unit }}>
                <RoundedButton
                    lable={"Connect with Seller"}
                    onClick={onConnect}
                    dark={true}
                />
            </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    appBar: {
        height: 100 * unit,
        backgroundColor: Colors.white,
        justifyContent: 'center',
    },
    backArrow: {
        height: 20 * unit,
        width: 20 * unit,
        marginLeft:15* unit
    },
    appBarBody: {
        marginTop: 20 * unit,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    appBarTitle: {
        fontSize: 30 * unit,
        color: Colors.purple,
        fontWeight: '600',
        marginLeft: 20 * unit,
    },
    bookImage:{
        width:width*0.5,
        height:width*0.6,
        borderRadius:10 * unit,
        borderWidth:2,
        borderColor:Colors.purple,
        alignSelf:'center'
    },
    titleText:{
        color:Colors.purple,
        fontSize:25 * unit,
        fontWeight:'600',
    },
    normalText:{
        color: Colors.black,
        fontSize: 18 * unit,
        fontWeight: '500',
    },
    textView:{
        width:width*0.90,
        alignSelf:'center',
        paddingTop:5*unit,
    },
    profileView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    profileImage:{
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: (width * 0.1) ,
        borderWidth: 2,
        borderColor: Colors.purple,
        alignSelf: 'center',
        marginRight:15* unit,
    }
})