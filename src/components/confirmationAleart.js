import React from 'react'
import { StyleSheet, Text, View, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import { unit, width } from '../constant/ScreenDetails';
import Colors from '../constant/Colors'
import CommonStyles from '../screens/CommonStyles';
export default function ConfirmationAleart(props) {

    return (
        <Modal
            transparent={true}
            supportedOrientations={['portrait', 'landscape']}
            animationType='none'
            visible={props.isVisible}
            onRequestClose={() => {
                //props.fn(false);
            }}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <Text style={CommonStyles.font1Black}>{props.lable}</Text>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginTop:10* unit}}>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => props.onPress(true)}
                        >
                            <Text style={CommonStyles.font2White}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.btn, backgroundColor: Colors.red }}
                            onPress={() => props.onPress(false)}
                        >
                            <Text style={CommonStyles.font2White}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10 * unit,
        width: width*0.8,
        backgroundColor: Colors.white,
        borderColor: Colors.purple,
        borderWidth: 1,
        borderRadius: 10 * unit,
        shadowColor: Colors.purple,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10 * unit,
        justifyContent:'center'
       
    },
    btn: {
        padding: 5 * unit,
        minWidth: 80 * unit,
        backgroundColor: Colors.green,
        ...CommonStyles.centerAlignMent,
        borderRadius: 10 * unit,
        marginHorizontal: 10 * unit,
    },
})


