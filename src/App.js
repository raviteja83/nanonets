import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import DataContainer from './containers/DataContainer';
import DocumentDetail from './containers/DocumentDetail';
import AddDocument from './components/AddDocument';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import { saveUserInfo } from './actions/login-actions';

import './app.scss';

class App extends Component {
    static propTypes = {
        uid: PropTypes.string,
        saveUserInfo: PropTypes.func.isRequired
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                this.props.saveUserInfo(user);
            } else {
                this.props.history.push('/login');
                // User is signed out.
            }
        });
    }

    render() {
        return (
            <div className="main-page">
                <Header />
                <Sidebar />
                <div className="main-content">
                    <Switch>
                        <Route path="/docs/add" exact component={AddDocument} />
                        <Route
                            path="/docs/:action"
                            component={DocumentDetail}
                        />
                        <Route path="/" component={DataContainer} />
                        <Route path="/docs" component={DataContainer} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapDispatchToActions = {
    saveUserInfo
};

export default connect(null, mapDispatchToActions)(App);
