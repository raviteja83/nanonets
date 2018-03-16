import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => {
    return (
        <div className="header header-nav">
            <NavLink to="/folders">Nanonets</NavLink>
            <NavLink to="/folders/add">Add Folder</NavLink>
            <div className="logout">
                <NavLink to="/logout">Logout</NavLink>
            </div>
        </div>
    );
};

export default HeaderNav;
