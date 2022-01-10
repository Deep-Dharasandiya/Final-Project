import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ,Image,TextInput,FlatList} from 'react-native'
import Colors from '../../../constant/Colors'
import { unit,width } from '../../../constant/ScreenDetails'

export default function PostList(props) {
    const [search,setSearch] = React.useState('');
    function onChangeSearch(text){
        setSearch(text);
    }
    const data=[
        {
            name:"Deep Dharasandiya",
            collage:"LDRP-ITR",
            book:"Book's name abc",
            condition:"In Good condition",
            price:"150₹"
        },
        {
            name: "Kuldip Jasani",
            collage: "LDRP-ITR",
            book: "Book's name xyz",
            condition: "In Very Good Condition",
            price: "200₹"
        },
        {
            name: "Jay Kothadiya",
            collage: "LDRP-ITR",
            book: "Book's name mno",
            condition: "In Poor condition",
            price: "50₹"
        },
        {
            name: "Deep Dharasandiya",
            collage: "LDRP-ITR",
            book: "Book's name abc",
            condition: "In Good condition",
            price: "150₹"
        },
        {
            name: "Kuldip Jasani",
            collage: "LDRP-ITR",
            book: "Book's name xyz",
            condition: "In Very Good Condition",
            price: "200₹"
        },
        {
            name: "Jay Kothadiya",
            collage: "LDRP-ITR",
            book: "Book's name mno",
            condition: "In Poor condition",
            price: "50₹"
        }
    ]
    return (
        <View style={styles.container}>
            <View style={styles.appBar}>
              <View style={styles.appBarBody}>
                    <Text style={styles.appBarTitle}>Books</Text>
                    <TouchableOpacity
                        style={styles.filterButton}
                    >
                        <Image
                            style={styles.filterImage}
                            resizeMode="contain"
                            source={require('../../../assets/more/more.png')}
                        />
                    </TouchableOpacity>
              </View>
            </View>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.textinput}
                    placeholder={"Search By Book's Name"}
                    fontSize={15 * unit}
                    placeholderTextColor={Colors.gray}
                    onChangeText={text => onChangeSearch(text)}
                    defaultValue={search}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Image
                        style={styles.filterImage}
                        resizeMode="contain"
                        source={require('../../../assets/more/more.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.displayView}>


                <FlatList
                    key={1}
                    data={data}
                    listMode="SCROLLVIEW"
                   // onEndReached={() => onEndScroll()}
                    keyExtractor={(item, index) => `key-${index}`}
                    renderItem={({ item, index }) => {
                        return <TouchableOpacity style={styles.itemView}
                            onPress={() => props.navigation.navigate('PostDetails')}
                                >
                                <View style={styles.itemViewBody}>
                                    <View style={{ flex: 1, marginLeft: 15 * unit }}>
                                        <Text style={{...styles.nameText,fontSize:20* unit}}>{item.book}</Text>
                                        <Text style={{ ...styles.nameText, fontSize: 13 * unit, color: Colors.black }}>{item.name+", "+item.collage}</Text>
                                        <Text style={styles.nameText}>{item.price}</Text>
                                    </View>
                                    <View style={styles.bookImage}>

                                    </View>
                                </View>
                        </TouchableOpacity>
                    
                    }}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white,
    },
    appBar:{
        height:100 * unit,
        backgroundColor:Colors.white,
        justifyContent:'center',
    },
    appBarBody:{
        marginTop:20* unit,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    appBarTitle:{
        fontSize:30 * unit,
        color:Colors.purple,
        fontWeight:'600',
        marginLeft:20 * unit,
    },
    filterImage:{
        height:25*unit,
        width:25* unit,
    },
    filterButton:{
        marginRight:20* unit,
    },
    searchView:{
        width:width*0.96,
        height:50* unit,
        borderRadius:10 * unit,
        borderColor:Colors.purple,
        borderWidth:2,
        alignSelf:'center',
       // backgroundColor:Colors.blurPurple,
        marginTop:10 * unit,
        paddingRight: 10 * unit,
        paddingLeft:50 * unit,
        justifyContent:'center',
    },
    searchButton:{
        position:'absolute',
        width:50* unit,
        height: 50 * unit,
        top:-2,
        left:-2,
        alignItems:'center',
        justifyContent:'center',

    },
    textinput: {
        color: Colors.black,
        fontSize: 15 * unit,
        paddingVertical: 10 * unit,
        height: 50 * unit,
    },
    displayView:{
     flex:1,
     marginVertical:10 * unit,
     
    },
    itemView:{
        width:width*0.96,
        borderWidth:1,
        borderRadius:10 * unit,
        borderColor:Colors.purple,
        alignSelf:'center',
        marginVertical:5* unit,

    },
    itemViewBody:{
        width:width*0.96-2,
        borderRadius: 10 * unit,
        backgroundColor:Colors.white,
        flexDirection:'row',
        alignItems:'center',
        paddingRight: 15 * unit,
        paddingVertical:10 * unit,
    },
    nameText:{
        fontSize:18 * unit,
        color:Colors.purple,
        flexShrink: 1,
    },
    bookImage:{
        height:100 * unit,
        width:100 * unit,
        borderRadius:50* unit,
        borderColor: Colors.purple,
        borderWidth: 2,
    }
})
