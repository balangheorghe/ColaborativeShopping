import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from "redux-persist";
import {AsyncStorage} from 'react-native';
import authReducer from "../reducers/authReducer";
import shopReducer from "../reducers/shopReducer";
import {AUTH} from "./connectConfig";

const rootReducer = combineReducers({  // add here new reducers to global app state
    auth: authReducer,
    shop: shopReducer
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};

const configureStore = (props) => {
    return createStore(rootReducer);
};

export {
    getPersistor, getStore, getState,
    configureStore
};

export default {
    getPersistor, getStore, getState,
    configureStore
};
