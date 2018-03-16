import { createSelector } from 'reselect';

export const selectLocalState = () => state => state.folders;

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
    createSelector(
        selectData(),
        (_, props) => props.id || props.match.params.action,
        (data, id) => {
            return data[id] || {};
        }
    );

export const selectDataForId = id =>
    createSelector(selectData(), data => data[id] || {});

export const selectCurrentId = () => (_, props) => {
    return props.match.params.action;
};

export const selectDocsForFolder = () =>
    createSelector(selectData(), selectCurrentId(), (data, id) => {
        const { documents } = data[id] || {};
        return documents || {};
    });

export const selectFormatDataToTree = () =>
    createSelector(selectData(), data => {
        const rootKeys = Object.keys(data);
        let tree = [];
        rootKeys.forEach(key => {
            const { title, documents = {} } = data[key] || {};
            if (title) {
                let node = {
                    title,
                    id: key,
                    children: []
                };
                const docKeys = Object.keys(documents);
                docKeys.forEach(docKey => {
                    const value = documents[docKey];
                    if (value) {
                        node.children.push({
                            ...value,
                            parentId: docKey,
                            folderId: key
                        });
                    }
                });
                tree.push(node);
            }
        });
        return tree;
    });
