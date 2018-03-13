import React, { Component } from 'react';
import { FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { login, register } from './actions/login-actions';

import './login.scss';

class Login extends Component {
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
            this.props.login(this.state).then(() => {
                this.props.history.push('/');
            });
        } else {
            this.props.register(this.state).then(() => {
                this.props.history.push('/');
            });
        }
    };

    render() {
        const { username, password } = this.state;
        const { location: { pathname } } = this.props;
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
            </div>
        );
    }
}

const mapDispatchToActions = {
    login,
    register
};

export default connect(null, mapDispatchToActions)(Login);
