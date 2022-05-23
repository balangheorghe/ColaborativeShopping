import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {navigationRef} from "./src/RootNavigation";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {SafeAreaProvider} from 'react-native-safe-area-context';

import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ShoppingListScreen from "./src/screens/ShoppingListScreen";
import GroupsScreen from "./src/screens/GroupsScreen";
import AccountScreen from "./src/screens/AccountScreen";
import ProductItem from "./src/components/ProductItem";

import {Provider} from 'react-redux';
import {configureStore, getStore, getPersistor} from "./src/store/configureStore";
import {connectMe, AUTH} from "./src/store/connectConfig";
import {PersistGate} from 'redux-persist/integration/react';

const AuthStack = createStackNavigator();
const ProductStack = createStackNavigator();
const MainTab = createMaterialBottomTabNavigator();
// const store = configureStore();

const ConnectedNavigation = connectMe(NavigationContainer, AUTH, true, true, true);

function getLoading() {
    return (
        <View>
            <ActivityIndicator size={"large"}/>
        </View>
    )
}

function productsScreen() {
    return (
        <ProductStack.Navigator>
            <ProductStack.Screen
                name="ShopListScreen"
                component={ShoppingListScreen}
                options={{headerShown: false}}
            />
            <ProductStack.Screen
                name="ProductItem"
                component={ProductItem}
                options={{title: ""}}
            />
        </ProductStack.Navigator>
    );
}

function Main(props) {
    return (
        // <Provider>
        <ConnectedNavigation ref={navigationRef}>
            {
                props.token.token ? (
                    <MainTab.Navigator>
                        <MainTab.Screen name="ShoppingList" component={productsScreen}
                                        options={{
                                            tabBarIcon: ({color}) => (
                                                <MaterialCommunityIcons name="shopping" color={color} size={26}/>
                                            )
                                        }}/>
                        <MainTab.Screen name="Groups" component={GroupsScreen}
                                        options={{
                                            tabBarIcon: ({color}) => (
                                                <MaterialCommunityIcons name="account-group" color={color}
                                                                        size={26}/>
                                            )
                                        }}/>
                        <MainTab.Screen name="Account" component={AccountScreen}
                                        options={{
                                            tabBarIcon: ({color}) => (
                                                <MaterialCommunityIcons name="account-circle" color={color}
                                                                        size={26}/>
                                            )
                                        }}/>
                    </MainTab.Navigator>
                ) : (
                    <AuthStack.Navigator>
                        <AuthStack.Screen name="Signin" component={SigninScreen}
                                          options={{title: 'SignIn', headerShown: false}}/>
                        <AuthStack.Screen name="Signup" component={SignupScreen}
                                          options={{title: 'SignUp', headerShown: false}}/>
                    </AuthStack.Navigator>
                )
            }
        </ConnectedNavigation>
        // </Provider>
    );
}

const App = connectMe(Main, AUTH, true, true);

export default () => {
    const myStore = getStore();
    const myPersistor = getPersistor();
    return <SafeAreaProvider>
        <Provider store={myStore}>
            <PersistGate loading={getLoading()} persistor={myPersistor}>
                <App/>
            </PersistGate>
        </Provider>
    </SafeAreaProvider>
}
