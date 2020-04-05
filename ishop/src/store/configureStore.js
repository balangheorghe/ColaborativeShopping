import { createStore, combineReducers } from 'redux';
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({  // add here new reducers to global app state
    auth: authReducer
});

const configureStore = (props) => {
    return createStore(rootReducer);
};

export default configureStore;
