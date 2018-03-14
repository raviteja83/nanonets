import React from 'react';
import { Route, Switch } from 'react-router';

import App from './App';
import Login from './Login';
import Logout from './Logout';

const Routes = () => {
    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact component={Login} />
            <Route path="*" component={App} />
        </Switch>
    );
};

export default Routes;
