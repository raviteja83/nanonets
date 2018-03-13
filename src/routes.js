import React from 'react';
import { Route, Switch } from 'react-router';

import App from './App';
import Login from './Login';
import Logout from './Logout';

const Routes = () => {
    return (
        <Switch>
            <Route path="*" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Login} />
        </Switch>
    );
};

export default Routes;
