import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Text, Input, Button, Image, Avatar} from 'react-native-elements';
import {useSafeArea} from 'react-native-safe-area-context';
import {connectMe, AUTH} from "../store/connectConfig";

const AccountScreen = (props) => {
    const insets = useSafeArea();
    console.log(props);
    const {navigation, profile} = props;
    return (
        <View style={{...styles.alignCenter, paddingTop: insets.top}}>
            <Text style={styles.text}>Account Screen</Text>
            <Avatar
                source={{uri: profile.photoUrl}}
                style={{width: 100, height: 100}}
                rounded
            />
            {/*<Text>{profile.name}</Text>*/}
            {/*<Text>{profile.email}</Text>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 48
    },
    alignCenter: {
        alignItems: 'center'
    }
});

export default connectMe(AccountScreen, AUTH, true, true);
