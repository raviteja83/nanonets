import firebase from 'firebase';
import { createAction } from 'redux-actions';
import {
    LOGIN_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    REGISTER_LOADING,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
    SAVE_USER_INFO
} from '../constants/action-types';

export function login({ username = '', password = '' }) {
    return dispatch => {
        dispatch(loginLoading(true));
        return firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then(response => {
                dispatch(loginSuccess(response));
                dispatch(loginLoading(false));
            })
            .catch(function(error) {
                // Handle Errors here.
                dispatch(loginLoading(false));
                dispatch(loginError(error.message));
            });
    };
}

export const loginLoading = createAction(LOGIN_LOADING);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginError = createAction(LOGIN_ERROR);

export function register({ username = '', password = '' }) {
    return dispatch => {
        dispatch(registerLoading(true));
        return firebase
            .auth()
            .createUserWithEmailAndPassword(username, password)
            .then(() => {
                dispatch(registerLoading(false));
            })
            .catch(function(error) {
                // Handle Errors here.
                dispatch(registerLoading(false));
                dispatch(registerError(error.message));
            });
    };
}

export const registerLoading = createAction(REGISTER_LOADING);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerError = createAction(REGISTER_ERROR);

export const saveUserInfo = createAction(SAVE_USER_INFO);

export function logout() {
    return dispatch => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch(logoutSuccess());
            });
    };
}

export const logoutSuccess = createAction(LOGOUT_SUCCESS);
