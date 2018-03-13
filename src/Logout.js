import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logout } from './actions/login-actions';
import { connect } from 'react-redux';

class Logout extends Component {
    componentDidMount() {
        this.props.logout().then(() => {
            this.props.history.push('/login');
        });
    }

    render() {
        return <div />;
    }
}

Logout.propTypes = {
    history: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    logout
};

export default connect(null, mapDispatchToProps)(Logout);
