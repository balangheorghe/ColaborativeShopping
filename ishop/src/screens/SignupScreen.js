import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {connectMe, getConnections, AUTH} from "../store/connectConfig";
import AuthForm from "../components/AuthForm";

const SignupScreen = ({navigation, actions, errorMessage}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <AuthForm
                headerText="SignUp"
                errorMessage={errorMessage}
                submitButtonText="Sign Up"
                onSubmit={(email, password) => {
                    actions.signUp(email, password)
                }}
                goToText="Sign in with an existing account."
                switchScreen={() => {navigation.navigate("Signin")}}
                social
            />
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        // borderColor: 'red',
        // borderWidth: 10,
        // flex: 1,
        // justifyContent: 'center',
        // marginBottom: 250
    },
    error: {
        fontSize: 16,
        color: 'red'
    }
});

export default connectMe(SignupScreen, AUTH, true, true, false);
