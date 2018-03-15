import { createSelector } from 'reselect';

export const selectLocalState = () => state => state.documents;

export const selectLoading = () =>
    createSelector(selectLocalState(), state => state.loading);

export const selectGetLoading = () =>
    createSelector(selectLoading(), loading => loading.get);

export const selectGetOneLoading = () =>
    createSelector(selectLoading(), loading => loading.getOne);

export const selectAddLoading = () =>
    createSelector(selectLoading(), loading => loading.add);

export const selectError = () =>
    createSelector(selectLocalState(), state => state.error);

export const selectGetError = () =>
    createSelector(selectError(), error => error.get);

export const selectGetOneError = () =>
    createSelector(selectError(), error => error.getOne);

export const selectAddError = () =>
    createSelector(selectError(), error => error.add);

export const selectFirstVisit = () =>
    createSelector(selectLocalState(), state => state.firstVisit);

export const selectData = () =>
    createSelector(selectLocalState(), state => state.data);

export const selectDataFromId = () =>
    createSelector(selectData(), selectCurrentId(), (data, id) => {
        return data[id] || {};
    });

export const selectCurrentId = () => (_, props) => {
    return props.match.params.action;
};
