import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from './Spacer';
import GoogleButton from "../login/GoogleLogin";
import FacebookButton from "../login/FBLogin";
import {connectMe, AUTH} from "../store/connectConfig";

const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText, goToText, switchScreen, social = false}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Spacer>
                {/*<Text h3>{headerText}</Text>*/}
            </Spacer>
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Spacer/>
            <Input
                secureTextEntry
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <Spacer>
                <Button
                    type='outline'
                    title={submitButtonText}
                    onPress={() => onSubmit({email, password})}
                />
            </Spacer>
            <Spacer>
                <TouchableOpacity onPress={switchScreen} style={{alignSelf: 'center'}}>
                    <Text style={{color: '#4388D3'}}>{goToText}</Text>
                </TouchableOpacity>
            </Spacer>
            {social ? (
                <Spacer>
                    <GoogleButton />
                    <FacebookButton />
                </Spacer>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    container: {
        // borderColor: 'red',
        // borderWidth: 10,
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100
    },
});

// export default connectMe(AuthForm, AUTH, true, true);
export default connectMe(AuthForm, AUTH, true, true);
