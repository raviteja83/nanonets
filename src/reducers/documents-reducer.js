import { combineReducers } from 'redux';
import state from './initialState';
import {
    ADD_DOCUMENT_LOADING,
    ADD_DOCUMENT_ERROR,
    ADD_DOCUMENT_SUCCESS,
    GET_DOCUMENT_SUCCESS,
    GET_DOCUMENT_LOADING,
    GET_DOCUMENT_ERROR,
    FIRST_VISIT,
    GET_ID_LOADING,
    GET_ID_ERROR,
    GET_ID_SUCCESS,
    UPDATE_ID_SUCCESS
} from '../constants/action-types';

const initialState = state.documents;

export function loading(state = initialState.loading, action) {
    switch (action.type) {
        case ADD_DOCUMENT_LOADING:
            return {
                ...state,
                add: action.payload
            };
        case GET_DOCUMENT_LOADING:
            return {
                ...state,
                get: action.payload
            };
        case GET_ID_LOADING:
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
        case GET_DOCUMENT_ERROR:
            return {
                ...state,
                get: action.payload
            };
        case ADD_DOCUMENT_ERROR:
            return {
                ...state,
                add: action.payload
            };
        case GET_ID_ERROR:
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
        case ADD_DOCUMENT_SUCCESS:
        case GET_ID_SUCCESS:
        case UPDATE_ID_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case GET_DOCUMENT_SUCCESS: {
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
        case FIRST_VISIT:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({ data, loading, error, firstVisit });
