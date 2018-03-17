import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { login, register } from './actions/login-actions';

import './login.scss';
import {
    selectLoginError,
    selectRegisterError
} from './selectors/login-selectors';

class Login extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        loginError: PropTypes.string,
        registerError: PropTypes.string
    };
    state = {
        username: '',
        password: ''
    };

    handleChange = e => {
        const { target: { value, name } } = e;
        this.setState({
            [name]: value
        });
    };

    handleLoginRegistration = () => {
        if (this.props.location.pathname === '/login') {
            this.props.login(this.state, () => {
                this.props.history.push('/');
            });
        } else {
            this.props.register(this.state, () => {
                this.props.history.push('/');
            });
        }
    };

    render() {
        const { username, password } = this.state;
        const {
            location: { pathname },
            loginError,
            registerError
        } = this.props;
        const isLogin = pathname === '/login';

        return (
            <div className="login-container">
                <FormGroup controlId="username">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        type="text"
                        value={username}
                        name="username"
                        placeholder="Enter Username"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="password">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={password}
                        name="password"
                        placeholder="Enter password"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <Button
                    onClick={this.handleLoginRegistration}
                    disabled={!username || !password}
                    className="btn-primary"
                >
                    {isLogin ? 'Login' : 'Register'}
                </Button>
                {isLogin ? (
                    <span className="ml-10">
                        New User?
                        <Link to="/register" className="ml-5">
                            Register
                        </Link>
                    </span>
                ) : (
                    <span className="ml-10">
                        Have an account?
                        <Link to="/login" className="ml-5">
                            Login
                        </Link>
                    </span>
                )}
                <div className="text-danger mt-10">
                    {isLogin ? loginError : registerError}
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loginError: selectLoginError(),
    resgisterError: selectRegisterError()
});

const mapDispatchToActions = {
    login,
    register
};

export default connect(mapStateToProps, mapDispatchToActions)(Login);
