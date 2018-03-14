import { combineReducers } from 'redux';
import state from './initialState';
import {
    ADD_FOLDER_LOADING,
    ADD_FOLDER_ERROR,
    ADD_FOLDER_SUCCESS,
    GET_FOLDER_SUCCESS,
    GET_FOLDER_LOADING,
    GET_FOLDER_ERROR,
    GET_FOLDER_ID_LOADING,
    GET_FOLDER_ID_ERROR,
    GET_FOLDER_ID_SUCCESS,
    UPDATE_FOLDER_ID_SUCCESS,
    FOLDER_FIRST_VISIT
} from '../constants/action-types';

const initialState = state.documents;

export function loading(state = initialState.loading, action) {
    switch (action.type) {
        case ADD_FOLDER_LOADING:
            return {
                ...state,
                add: action.payload
            };
        case GET_FOLDER_LOADING:
            return {
                ...state,
                get: action.payload
            };
        case GET_FOLDER_ID_LOADING:
            return {
                ...state,
                getOne: action.payload
            };
        default:
            return state;
    }
}

export function error(state = initialState.error, action) {
    switch (action.type) {
        case GET_FOLDER_ERROR:
            return {
                ...state,
                get: action.payload
            };
        case ADD_FOLDER_ERROR:
            return {
                ...state,
                add: action.payload
            };
        case GET_FOLDER_ID_ERROR:
            return {
                ...state,
                getOne: action.payload
            };
        default:
            return state;
    }
}

export function data(state = initialState.data, action) {
    switch (action.type) {
        case ADD_FOLDER_SUCCESS:
        case GET_FOLDER_ID_SUCCESS:
        case UPDATE_FOLDER_ID_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case GET_FOLDER_SUCCESS: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}

export function firstVisit(state = initialState.firstVisit, action) {
    switch (action.type) {
        case FOLDER_FIRST_VISIT:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({ data, loading, error, firstVisit });
