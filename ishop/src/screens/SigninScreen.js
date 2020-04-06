import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import AuthForm from "../components/AuthForm";
import {connectMe, AUTH, getConnections} from "../store/connectConfig";
import {connect} from "react-redux";

const SigninScreen = ({navigation, actions, errorMessage}) => {
    return (
        <>
            <AuthForm
                headerText="SignIn"
                errorMessage={errorMessage}
                submitButtonText="Sign In"
                onSubmit={(email, password) => {
                    actions.signIn(email, password)
                }}
                goToText="Don't have an account? Create one."
                switchScreen={() => {navigation.navigate("Signup")}}
                social={(email, profile) => {
                    actions.googleSignIn(email, profile)
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 48
    }
});

export default connectMe(SigninScreen, AUTH, true, true);
