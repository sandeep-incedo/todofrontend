import {combineReducers, createStore, applyMiddleware} from 'redux';
import userCredentialsReducer from "../reducers/userCredentialsReducer";
import thunk from 'redux-thunk';

const reducers = combineReducers({
    userCredentials:userCredentialsReducer
});

const store = createStore(
    reducers, 
    {},
    applyMiddleware(thunk)
);

export default store;