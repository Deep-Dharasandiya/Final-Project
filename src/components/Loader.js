import React from 'react'
import { StyleSheet, Text, View ,Modal,ActivityIndicator,TouchableOpacity} from 'react-native'
import {unit,width} from '../constant/ScreenDetails';
import Colors from '../constant/Colors'
export default function Loader(props) {
   
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
            <View  style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={props.isVisible}
                        color={Colors.lightblue}
                        size={'large'}
                        style={{marginVertical:15 *unit}}
                        />
                    <Text style={{fontSize:18*unit,}}>Please Wait</Text>
                </View>
            </View>
         
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5 * unit,
        width: 200 * unit,
        marginVertical: 20 * unit,
        backgroundColor: Colors.white,
        borderColor: Colors.purple,
        borderWidth: 1,
        borderRadius: 10 * unit,
        shadowColor: Colors.purple,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10 * unit,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


