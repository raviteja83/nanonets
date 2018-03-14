export default {
    login: {
        email: '',
        loading: {
            login: false,
            register: false
        },
        error: '',
        uid: ''
    },
    documents: {
        loading: {
            add: false,
            get: false,
            getOne: false
        },
        error: {
            add: '',
            get: '',
            getOne: ''
        },
        data: {},
        firstVisit: true
    },
    folders: {
        loading: {
            add: false,
            get: false,
            getOne: false
        },
        error: {
            add: '',
            get: '',
            getOne: ''
        },
        data: {},
        firstVisit: true
    }
};
