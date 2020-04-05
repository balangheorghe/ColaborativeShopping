import {AsyncStorage} from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';
import * as RootNavigation from '../RootNavigation';

const authReducer = (state, action) => {  // called only by react directly - return new state value
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signup':
            return {...state, token: action.payload, errorMessage: ""};
        default:
            return state;
    }
};

// or dispath => async ({email, password}) => {}...
const signup = dispatch => {
    return async ({email, password}) => {
        // make api request to sign up with this info
        // if we sign up, modify state -> isloggedin = true
        // signup fails -> error message
        try {
            const response = await trackerApi.post('/signup', {email, password});
            console.log("response", response, email, password);
            await AsyncStorage.setItem("token", response.data.token);
            dispatch({type: 'signup', payload: response.data.token});
            // RootNavigation.navigate("Tracks");
        } catch (e) {
            dispatch({type: 'add_error', payload: 'Something went awry: ' + e.data});
            console.log(e);
        }
    };
};

const signin = (dispath) => {
    return ({email, password}) => {
        // make api request to sign in with this info
        // if we sign in, modify state -> isloggedin = true
        // signin fails -> error message
    };
};


const signout = (dispath) => {
    return ({email, password}) => {
        // make api request to sign out with this info

        // if we sign out, modify state -> isloggedin = true

        // signout fails -> error message
    };
};

export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, signup},
    {token: null, errorMessage: ''}
);
