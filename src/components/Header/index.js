import React from 'react';
import { Switch, Route } from 'react-router';

import HeaderAction from './HeaderAction';
import HeaderNav from './HeaderNav';

import './header.scss';

const Header = () => {
    return (
        <Switch>
            <Route path="/docs/:action" component={HeaderAction} />
            <Route path="/docs" exact component={HeaderNav} />
            <Route path="/" exact component={HeaderNav} />
            <Route path="/folders" exact component={HeaderNav} />
            <Route path="/folders/:action" component={HeaderAction} />
            <Route path="/logout" exact component={HeaderNav} />
        </Switch>
    );
};

export default Header;
