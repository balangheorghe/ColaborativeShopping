import {SIGNIN, SIGNUP} from "../constants/auth";
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
