import { combineReducers } from 'redux';
import login from './login-reducer';
import documents from './documents-reducer';
import folders from './folders-reducer';
import { LOGOUT_SUCCESS } from '../constants/action-types';
import initialState from './initialState';

const appReducer = combineReducers({ login, documents, folders });

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = initialState;
    }

    return appReducer(state, action);
};

export default rootReducer;
