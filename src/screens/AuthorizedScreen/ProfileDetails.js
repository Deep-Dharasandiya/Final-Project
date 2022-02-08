import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
//styles
import CommonStyles from '../CommonStyles';
//utils
import Colors from '../../constant/Colors';
import { unit, width } from '../../constant/ScreenDetails';
import { rootContext } from '../../context/store/ContextStore';
export default function ProfileDetails(props) {
    const data = React.useContext(rootContext);
    const [details, setDetails] = React.useState(data.commonReducerState.userDetails);
    return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.appBar}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.pop()}
                    >
                        <Image
                            style={{ ...CommonStyles.icon1Style, marginHorizontal: 15 * unit }}
                            resizeMode="contain"
                            source={require('../../assets/backPurple/back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={CommonStyles.font4Purple}>My Account</Text>
                </View>
            </View>

            <ScrollView>
                <Image
                    source={{ uri: details.profileURL }}
                    style={{...CommonStyles.imageView2,alignSelf:'center'}}
                />
                <View style={{ marginLeft: 15 * unit, marginTop: 15 * unit }}>
                    <Text style={{...CommonStyles.font4Purple,alignSelf:'center'}}>{details.firstName + " " + details.lastName}</Text>
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300',marginTop:10* unit }}>{"contact : " + details.contactNumber}</Text>
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>{"Email : " + details.email}</Text>
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>{"College : " + details.college}</Text>
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>{"City : " + details.city}</Text>
                    {/* <Text style={CommonStyles.font4Purple}>{"₹ " + price}</Text>
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '500', marginTop: 10 * unit }}>About Book:</Text>

                    <View style={CommonStyles.textView}>
                        <Text style={{ ...CommonStyles.font1Black, fontWeight: '300' }}>
                            {description}
                        </Text>
                    </View> */}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    btnView: {
        flexDirection: 'row',
        marginVertical: 20 * unit,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    appBar: {
        marginVertical: 10 * unit,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn: {
        width: width * 0.4,
        height: 50 * unit,
        backgroundColor: Colors.purple,
        borderRadius: 10 * unit,
        borderWidth: 1,
        borderColor: Colors.purple,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 20 * unit,
        color: Colors.white
    }
})