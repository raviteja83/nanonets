import { createSelector } from 'reselect';
import { selectDataForId, selectGetOneLoading } from './documents-selectors';

import {
    selectDataForId as selectFolderData,
    selectGetOneLoading as selectFolderLoading
} from './folders-selectors';

export const selectLocalState = () => state => state;

export const selectCurrentId = () => (_, props) => props.match.params.action;

export const selectIsFolder = () => (_, props) =>
    props.location.pathname.includes('folders');

export const selectData = () =>
    createSelector(
        selectCurrentId(),
        selectIsFolder(),
        selectLocalState(),
        (id, isFolder, state) => {
            const data = isFolder
                ? selectFolderData(id)(state)
                : selectDataForId(id)(state);
            return data;
        }
    );

export const selectLoading = () =>
    createSelector(selectIsFolder(), selectLocalState(), (isFolder, state) => {
        const loading = isFolder
            ? selectFolderLoading()(state)
            : selectGetOneLoading()(state);
        return loading;
    });
