import firebase from 'firebase';
import { createAction } from 'redux-actions';
import {
    ADD_DOCUMENT_LOADING,
    ADD_DOCUMENT_SUCCESS,
    ADD_DOCUMENT_ERROR,
    GET_DOCUMENT_LOADING,
    GET_DOCUMENT_SUCCESS,
    GET_DOCUMENT_ERROR,
    FIRST_VISIT,
    GET_ID_LOADING,
    GET_ID_SUCCESS,
    GET_ID_ERROR,
    UPDATE_ID_SUCCESS
} from '../constants/action-types';

export function getAllDocuments() {
    return dispatch => {
        const documentsRef = firebase.database().ref('/documents');
        dispatch(getLoading(true));
        return documentsRef
            .once('value', snapshot => {
                const data = snapshot.val();
                dispatch(getSuccess(data));
                dispatch(updateVisit(false));
                dispatch(getLoading(false));
            })
            .catch(error => {
                dispatch(getLoading(false));
                dispatch(getError(error.message));
            });
    };
}

export const updateVisit = createAction(FIRST_VISIT);
export const getLoading = createAction(GET_DOCUMENT_LOADING);
export const getSuccess = createAction(GET_DOCUMENT_SUCCESS);
export const getError = createAction(GET_DOCUMENT_ERROR);

export function addDocument(body, folderId, callback) {
    return (dispatch, getState) => {
        dispatch(addLoading(true));
        const documentsRef = firebase.database().ref('/documents');
        const newRef = documentsRef.push();
        const key = newRef.key;
        return newRef
            .set(body)
            .then(() => {
                dispatch(addLoading(false));
                callback && callback(key);
            })
            .catch(error => {
                dispatch(addLoading(false));
                dispatch(addError(error.message));
            });
    };
}

export const addLoading = createAction(ADD_DOCUMENT_LOADING);
export const addSuccess = createAction(ADD_DOCUMENT_SUCCESS);
export const addError = createAction(ADD_DOCUMENT_ERROR);

export function getDataById(id) {
    return dispatch => {
        const ref = firebase.database().ref(`/documents/${id}`);
        dispatch(getIdLoading(true));
        return ref.once('value', snapshot => {
            dispatch(getIdLoading(false));
            const data = snapshot.val();
            dispatch(getIdSuccess({ [id]: data }));
        });
    };
}

export const getIdLoading = createAction(GET_ID_LOADING);
export const getIdSuccess = createAction(GET_ID_SUCCESS);
export const getIdError = createAction(GET_ID_ERROR);

export function addListener(id) {
    return dispatch => {
        const ref = firebase.database().ref(`/documents/${id}`);
        ref.on('value', snapshot => {
            const key = snapshot.key;
            const data = snapshot.val();
            dispatch(updateSuccess({ [key]: data }));
        });
    };
}

export const updateSuccess = createAction(UPDATE_ID_SUCCESS);

export function removeListener(id) {
    return dispatch => {
        const ref = firebase.database().ref(`/documents/${id}`);
        ref.off('value');
    };
}

export function updateDataForId(id, update) {
    return dispatch => {
        const ref = firebase.database().ref(`/documents/${id}`);
        return ref.update(update);
    };
}
