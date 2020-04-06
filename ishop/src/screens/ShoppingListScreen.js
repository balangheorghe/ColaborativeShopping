import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ShoppingListScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ShoppingList Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 48
    },
    container: {

    }
});

export default ShoppingListScreen;
