import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectEmail } from '../../selectors/login-selectors';

const Header = ({ email }) => {
    return (
        <div className="header">
            <Navbar className="mt-navbar" fluid>
                <Nav pullRight>
                    <NavDropdown title={email} id="header-user-dropdown">
                        <LinkContainer to="/logout">
                            <MenuItem>Logout</MenuItem>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </div>
    );
};

Header.propTypes = {
    email: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
    email: selectEmail()
});

export default connect(mapStateToProps)(Header);
