import React from 'react'
import { StyleSheet, Text, View, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import Colors from '../constant/Colors';
import { unit, width } from '../constant/ScreenDetails';
import { aleartOff } from '../context/actions/commonActions';
import { rootContext } from '../context/store/ContextStore';

export default function Toast(props) {
    const data = React.useContext(rootContext);
    return (
        <Modal
            transparent={true}
            supportedOrientations={['portrait', 'landscape']}
            animationType="fade"
            visible={data.commonReducerState.isToast}
            onRequestClose={() => {
            }}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{data.commonReducerState.toastMessage}</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        bottom:0,
        width:width,
        backgroundColor:Colors.purple,
        justifyContent:'center',
        padding:10* unit,

    },
    text:{
        color: Colors.white, 
        fontSize: 15 * unit,
         fontWeight: '500'
    }
})


