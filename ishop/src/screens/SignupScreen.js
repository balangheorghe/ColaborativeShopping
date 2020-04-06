import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from "../components/Spacer";
import {signIn, signUp} from "../actions/authActions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
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
            />
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        // borderColor: 'red',
        // borderWidth: 10,
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    },
    error: {
        fontSize: 16,
        color: 'red'
    }
});

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};
const ActionCreators = Object.assign(
    {},
    {signIn, signUp}
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connectMe(SignupScreen, AUTH, true, true, false);
