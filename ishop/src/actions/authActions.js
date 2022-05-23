import {FACEBOOK, GOOGLE, SIGNIN, SIGNUP} from "../constants/auth";

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

export function googleSignIn(token, profile, errorMessage="") {
    console.log("ggSignIn", token, profile);
    return {
        type: GOOGLE,
        payload: {token, profile, errorMessage}
    }
}

export function facebookSignIn(token, profile, errorMessage="") {
    return {
        type: FACEBOOK,
        payload: {token, profile, errorMessage}
    }
}
