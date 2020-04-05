// contains all state properties which will be available to other components in the app
import {signIn, signUp} from "../actions/authActions";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {NavigationContainer} from "@react-navigation/native";

export const AUTH = "AUTH";

const mapStateToProps = {
    AUTH: state => {
        return {
            token: state.auth.token,  // reducer info
            errorMessage: state.auth.errorMessage
        }
    }
};

const ActionCreators = {
    AUTH: Object.assign({}, {signIn, signUp})
};

const mapDispatchToProps = {
    AUTH: dispatch => ({
        actions: bindActionCreators(ActionCreators[AUTH], dispatch),
    })
};
export const getConnections = (key) => {
    console.log(mapStateToProps, key, mapStateToProps[key]);
    return [
        mapStateToProps[key], mapDispatchToProps[key]
    ];
    // return {
    //     mapStateToProps: mapStateToProps[key],
    //     mapDispatchToProps: mapDispatchToProps[key]
    // }
};

export const connectMe = (component, type, state=false, actions=false, ref = false) => {
    if(state && actions && ref) {
        return connect(mapStateToProps[type], mapDispatchToProps[type], null, {forwardRef: true})(component);
    } else if (state && actions) {
        return connect(mapStateToProps[type], mapDispatchToProps[type])(component);
    } else if (state) {
        return connect(mapStateToProps[type])(component);
    } else if (actions) {
        return connect(null, mapDispatchToProps[type])(component);
    }
};
