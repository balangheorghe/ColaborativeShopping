import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
// import {Text, Input, Button} from 'react-native-elements';

const AccountScreen = ({navigation}) => {
    return (
        <View>
            <Text style={styles.text}>Account Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 48
    }
});

export default AccountScreen;
