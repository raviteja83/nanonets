import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => {
    return (
        <div className="header header-nav">
            <NavLink to="/docs">Home</NavLink>
            <NavLink to="/docs/add">Add Doc</NavLink>
            <div className="logout">
                <NavLink to="/logout">Logout</NavLink>
            </div>
        </div>
    );
};

export default HeaderNav;
