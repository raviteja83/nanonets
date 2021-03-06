import { combineReducers } from 'redux';
import state from './initialState';
import {
    LOGIN_LOADING,
    REGISTER_LOADING,
    LOGIN_ERROR,
    REGISTER_ERROR,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    SAVE_USER_INFO
} from '../constants/action-types';

const initialState = state.login;

export function loading(state = initialState.loading, action) {
    switch (action.type) {
        case LOGIN_LOADING:
            return {
                ...state,
                login: action.payload
            };
        case REGISTER_LOADING:
            return {
                ...state,
                register: action.payload
            };
        default:
            return state;
    }
}

export function error(state = initialState.error, action) {
    switch (action.type) {
        case LOGIN_LOADING:
            if (action.payload) {
                return {
                    ...state,
                    login: ''
                };
            }
            return state;
        case LOGIN_ERROR:
            return {
                ...state,
                login: action.payload
            };
        case REGISTER_LOADING:
            if (action.payload) {
                return {
                    ...state,
                    register: ''
                };
            }
            return state;
        case REGISTER_ERROR:
            return {
                ...state,
                register: action.payload
            };
        default:
            return state;
    }
}

export function uid(state = initialState.uid, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case SAVE_USER_INFO:
            return action.payload.uid;
        default:
            return state;
    }
}

export function email(state = initialState.email, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case SAVE_USER_INFO:
            return action.payload.email;
        default:
            return state;
    }
}

export default combineReducers({
    loading,
    error,
    email,
    uid
});
