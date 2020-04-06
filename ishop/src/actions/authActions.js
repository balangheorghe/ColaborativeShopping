import {FACEBOOK, GOOGLE, SIGNIN, SIGNUP} from "../constants/auth";
import { useStore } from 'react-redux';

export function signIn(email, password) {
    const token = "nada";
    return {
        type: SIGNIN,
        payload: token
    }
}

export function signUp(email, password) {
    const token = null;
    const errorMessage = "test error";
    return {
        type: SIGNUP,
        payload: {token, errorMessage}
    }
}

export function googleSignIn(email, profile, errorMessage="") {
    return {
        type: GOOGLE,
        payload: {email, profile, errorMessage}
    }
}

export function facebookSignIn(email, profile, errorMessage="") {
    return {
        type: FACEBOOK,
        payload: {email, profile, errorMessage}
    }
}
