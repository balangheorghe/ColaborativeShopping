import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, SafeAreaView} from 'react-native';
import {ListItem, Text, Icon, SearchBar, Image, Badge, Button} from 'react-native-elements'
import {connectMe, AUTH, SHOP} from "../store/connectConfig";

const ProductItemScreen = (props) => {
    const params = props.route.params;
    const item = params.item;
    return (
        <View>
            <View style={styles.nameImageView}>
                <Text style={styles.productName}>{item.name}</Text>
                <Image
                    source={{uri: item.photoUrl}}
                    style={styles.productImage}
                />
            </View>
            <View style={styles.countQuantityView}>
                <View style={styles.editCountView}>
                    <TouchableOpacity><Icon name="minus" type="antdesign"/></TouchableOpacity>
                    <Text></Text>
                    <TouchableOpacity><Icon name="plus" type="antdesign"/></TouchableOpacity>
                </View>
                <View style={styles.quantityView}>
                    <Text>{item.quantity.value}</Text>
                    <Text>{item.quantity.type}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    nameImageView: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 100,
        backgroundColor: 'white',
        marginBottom: 1,
        borderColor: 'gray',
        borderBottomWidth: 0.2
    },
    productImage: {
        width: 100,
        height: 100,
        flex: 1,
        marginRight: 1
    },
    productName: {
        flex: 1,
        fontSize: 25,
        padding: 5
    },

    countQuantityView: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: 1,
        borderColor: 'gray',
        borderBottomWidth: 0.2
    },
    editCountView: {
        flexDirection: 'row',
        flex: 7
    },
    quantityView: {
        flexDirection: 'row',
        flex: 2,
        width: 100,
        marginRight: 1,
        borderWidth: 2,
        borderColor: 'red'
    },
});

export default connectMe(ProductItemScreen, SHOP);
