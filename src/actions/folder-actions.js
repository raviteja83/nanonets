import firebase from 'firebase';
import { createAction } from 'redux-actions';
import {
    ADD_FOLDER_LOADING,
    ADD_FOLDER_SUCCESS,
    ADD_FOLDER_ERROR,
    GET_FOLDER_LOADING,
    GET_FOLDER_SUCCESS,
    GET_FOLDER_ERROR,
    FIRST_VISIT,
    GET_FOLDER_ID_LOADING,
    GET_FOLDER_ID_SUCCESS,
    GET_FOLDER_ID_ERROR,
    UPDATE_FOLDER_ID_SUCCESS
} from '../constants/action-types';

export function getAllFolders() {
    return dispatch => {
        const documentsRef = firebase.database().ref('/folders');
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
export const getLoading = createAction(GET_FOLDER_LOADING);
export const getSuccess = createAction(GET_FOLDER_SUCCESS);
export const getError = createAction(GET_FOLDER_ERROR);

export function addDocument(body, callback) {
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

export const addLoading = createAction(ADD_FOLDER_LOADING);
export const addSuccess = createAction(ADD_FOLDER_SUCCESS);
export const addError = createAction(ADD_FOLDER_ERROR);

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

export const getIdLoading = createAction(GET_FOLDER_ID_LOADING);
export const getIdSuccess = createAction(GET_FOLDER_ID_SUCCESS);
export const getIdError = createAction(GET_FOLDER_ID_ERROR);

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

export const updateSuccess = createAction(UPDATE_FOLDER_ID_SUCCESS);

export function removeListener(id) {
    return dispatch => {
        const ref = firebase.database().ref(`/documents/${id}`);
        ref.off('value');
    };
}

export function updateDataForId(id, update) {
    return dispatch => {
        const ref = firebase.database().ref(`/documents/${id}`);
        ref.update(update);
    };
}
