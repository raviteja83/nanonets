import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';
import createHistory from 'history/createBrowserHistory';

import registerServiceWorker from './registerServiceWorker';
import store from './store';
import Routes from './routes';

import './index.scss';

const history = createHistory();

firebase.initializeApp({
    apiKey: 'AIzaSyB3_tAFLY0drjQZuCkB4JqW-OPAxI9Hw2w',
    authDomain: 'nanonets-5df68.firebaseapp.com',
    databaseURL: 'https://nanonets-5df68.firebaseio.com',
    projectId: 'nanonets-5df68',
    storageBucket: 'nanonets-5df68.appspot.com',
    messagingSenderId: '995908925155'
});

// Create an enhanced history that syncs navigation events with the store
render(
    <Provider store={store}>
        <BrowserRouter history={history} basename={process.env.PUBLIC_URL}>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
