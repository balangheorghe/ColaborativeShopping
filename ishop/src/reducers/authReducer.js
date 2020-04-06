import {FACEBOOK, GOOGLE, SIGNIN, SIGNUP} from "../constants/auth";

const initialState = {
    token: null,
    errorMessage: '',
    email: '',
    profile: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN:
            return {
                ...state, ...action.payload
            };
        case SIGNUP:
            return {
                ...state, ...action.payload
            };
        case GOOGLE:
            return {
                ...state, ...action.payload
            };
        case FACEBOOK:
            return {
                ...state, ...action.payload
            };
        default:
            return state;
    }
};

export default authReducer;
