import React from "react"
import axios from 'axios';
import {StyleSheet, View, Image} from "react-native"
import {Text, Button, Input, colors} from 'react-native-elements';
import * as Facebook from 'expo-facebook';

const mytoken = "EAAox6oBhQdIBAMoSXn4ke3xYuZBD8bAqw0Mo8jJYnrm33ZCiZBwVhRbcUebMxWo8iQU9SG9ynpc5Q1x9SokGZCrTZB9ZCGeITzcrhwYQnHPehYPGLkwGkyEUuqoU9ciDd677mzP4F0xwZB3ZCJFWKB255EK2QmHGE5mAZB5Arloo1MYX4C5WDZBYnndYtdciG5HqdMZBq6gq3CEK4BpbphZAKasJWEfxWCwXSTQRIjTmAIrsfQ4MZAZBb6RAms";

async function signIn() {
    try {
        await Facebook.initializeAsync('2869633013072338');
        const result = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
        });
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = result;
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            let {data} = await axios.get(`https://graph.facebook.com/me?access_token=${token}`);
            let profile = await axios.get(`https://graph.facebook.com/${data.id}?fields=email&access_token=${token}`);
            let {email} = profile.data;
            return {
                email: email,
                name: data.name
            };
        } else {
            console.log("cancelled");
            return null;
        }
    } catch ({message}) {
        console.log(`Facebook Login Error: ${message}`);
        return null;
    }
}

const FacebookButton = ({social}) => {
    return (
        <View>
            <Button
                title="Continue with Facebook"
                onPress={async () => {
                    const data = await signIn();
                    if(data) {
                        console.log("loggedinFB", data);
                        social(data.email, data.name);
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default FacebookButton;
