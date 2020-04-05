import 'react-native-gesture-handler';
import * as React from 'react';
import {forwardRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {navigationRef} from "./src/RootNavigation";

import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ShoppingListScreen from "./src/screens/ShoppingListScreen";
import GroupsScreen from "./src/screens/GroupsScreen";
import AccountScreen from "./src/screens/AccountScreen";

import {connect, useStore} from 'react-redux';
import {Provider} from 'react-redux';
import {bindActionCreators, createStore} from 'redux';
import configureStore from "./src/store/configureStore";
import {signIn, signUp} from "./src/actions/authActions";
import Text from "react-native-web/src/exports/Text";
import {returnRejectedPromiseOnError} from "redux-axios-middleware";
import {connectMe, AUTH} from "./src/store/connectConfig.py";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const store = configureStore();

const ConnectedNavigation = connectMe(NavigationContainer, AUTH, true, true, true);

function Main(props) {
    return (
        // <Provider>
        <ConnectedNavigation ref={navigationRef}>
            {
                props.token ? (
                    <MainTab.Navigator>
                        <MainTab.Screen name="ShoppingList" component={ShoppingListScreen}
                                        options={{title: 'ShoppingList'}}/>
                        <MainTab.Screen name="Groups" component={GroupsScreen} options={{title: 'Groups'}}/>
                        <MainTab.Screen name="Account" component={AccountScreen} options={{title: 'Account'}}/>
                    </MainTab.Navigator>
                ) : (
                    <AuthStack.Navigator>
                        <AuthStack.Screen name="Signin" component={SigninScreen} options={{title: 'SignIn', headerShown: false}}/>
                        <AuthStack.Screen name="Signup" component={SignupScreen} options={{title: 'SignUp', headerShown: false}}/>
                    </AuthStack.Navigator>
                )
            }
        </ConnectedNavigation>
        // </Provider>
    );
}

const App = connectMe(Main, AUTH, true, true);

export default () => {
    return <Provider store={store}>
        <App/>
    </Provider>
}
