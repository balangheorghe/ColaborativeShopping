// contains all state properties which will be available to other components in the app
import {signIn, signUp, googleSignIn, facebookSignIn} from "../actions/authActions";
import {editItem, addItem, removeItem, toggleItemSelect} from "../actions/shopActions";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

export const AUTH = "AUTH";
export const SHOP = "SHOP";

const mapStateToProps = {
    AUTH: state => {
        return {
            token: state.auth.token,  // reducer info
            profile: state.auth.profile
        }
    },
    SHOP: state => {
        return {
            shoppingList: state.shop.shoppingList
        }
    },
    AUTHSHOP: state => {
        return {
            token: state.auth.token,
            profile: state.auth.profile,
            shoppingList: state.shop.shoppingList
        }
    }
};

const ActionCreators = {
    AUTH: Object.assign({}, {signIn, signUp, googleSignIn, facebookSignIn}),
    SHOP: Object.assign({}, {editItem, addItem, removeItem, toggleItemSelect})
};

const mapDispatchToProps = {
    AUTH: dispatch => ({
        actions: bindActionCreators(ActionCreators[AUTH], dispatch),
    }),
    SHOP: dispatch => ({
        actions: bindActionCreators(ActionCreators[SHOP], dispatch),
    })
};

const combineDispatch = (keys) => {
    let result = Object.create(null);
    for (let i = 0; i < keys.length; i++) {
        result = Object.assign(result, ActionCreators[keys[i]]);
    }
    return dispatch => ({
        actions: bindActionCreators(result, dispatch)
    })
};

export const getConnections = (key) => {
    return [
        mapStateToProps[key], mapDispatchToProps[key]
    ];
};

export const connectMe = (component, type, state = true, actions = true, ref = false) => {
    let stateToProps = null, dispatchToProps = null;
    if (type.constructor === Array) {
        type.sort();
        const combined = type.join('');
        stateToProps = mapStateToProps[combined];
        dispatchToProps = combineDispatch(type);
    } else {
        stateToProps = mapStateToProps[type];
        dispatchToProps = mapDispatchToProps[type];
    }
    if (state && actions && ref) {
        return connect(stateToProps, dispatchToProps, null, {forwardRef: true})(component);
    } else if (state && actions) {
        return connect(stateToProps, dispatchToProps)(component);
    } else if (state) {
        return connect(stateToProps)(component);
    } else if (actions) {
        return connect(null, dispatchToProps)(component);
    }
};
