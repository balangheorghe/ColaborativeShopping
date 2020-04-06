import React from "react"
import {StyleSheet, View, Image} from "react-native"
import {Text, Button, Input} from 'react-native-elements';
// import Expo from "expo";
import * as Google from 'expo-google-app-auth';

async function signIn() {
    try {
        const result = await Google.logInAsync({
            androidClientId: "1030329370499-hepho8ghs4fg9pcrhdth4mln296356r8.apps.googleusercontent.com",
            // iosClientId: ""
            scopes: ["profile", "email"]
        });
        console.log("googleRes", result);
        if (result.type === "success") {
            console.log("googleProfile", result.user);
            return {
                email: result.user.email,
                name: result.user.name,
                photoUrl: result.user.photoUrl
            }
        } else {
            console.log("cancelled");
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

const GoogleButton = ({social}) => {
    return (
        <View>
            <Button
                title="Continue with Google"
                onPress={async () => {
                    const data = await signIn();
                    console.log("loggedin", data);
                    social(data.email, data.name);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default GoogleButton;
