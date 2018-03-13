import { createSelector } from 'reselect';

export const selectLocalState = () => state => state.login;

export const selectLoading = () =>
    createSelector(selectLocalState(), state => state.loading);

export const selectLoginLoading = () =>
    createSelector(selectLoading(), loading => loading.login);

export const selectRegisterLoading = () =>
    createSelector(selectLoading(), loading => loading.register);

export const selectError = () =>
    createSelector(selectLocalState(), state => state.error);

export const selectLoginError = () =>
    createSelector(selectError(), error => error.login);

export const selectRegisterError = () =>
    createSelector(selectError(), error => error.register);

export const selectUID = () =>
    createSelector(selectLocalState(), state => state.uid);

export const selectEmail = () =>
    createSelector(selectLocalState(), state => state.email);
