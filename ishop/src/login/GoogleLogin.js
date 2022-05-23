import React from "react"
import {StyleSheet, View, Image} from "react-native"
import {Text, Button, Input, SocialIcon} from 'react-native-elements';
import * as Google from 'expo-google-app-auth';
import {connectMe, AUTH} from "../store/connectConfig";

async function signIn() {
    try {
        const result = await Google.logInAsync({
            androidClientId: "1030329370499-hepho8ghs4fg9pcrhdth4mln296356r8.apps.googleusercontent.com",
            // iosClientId: ""
            scopes: ["profile", "email"]
        });
        // console.log("googleRes", result);
        const token = {
            token: result.accessToken,
            idToken: result.idToken,
            refreshToken: result.refreshToken
        };
        if (result.type === "success") {
            // console.log("googleProfile", result.user);
            const profile = {
                email: result.user.email,
                name: result.user.name,
                id: result.user.id,
                photoUrl: result.user.photoUrl
            };
            return {token, profile}
        } else {
            console.log("cancelled");
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

const GoogleButton = ({social, actions}) => {
    return (
        <SocialIcon
            type="google"
            title="Continue with Google"
            button
            onPress={async () => {
                const data = await signIn();
                console.log("loggedin", data);
                actions.googleSignIn(data.token, data.profile);
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default connectMe(GoogleButton, AUTH, true, true);
