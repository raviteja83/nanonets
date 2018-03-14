import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import './editable.scss';

class Editable extends Component {
    static propTypes = {
        text: PropTypes.string,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        preventNewLine: false
    };

    constructor(props) {
        super(props);
        this.state = { text: props.text, editable: false };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.text !== nextProps.text) {
            this.setState({
                text: nextProps.text
            });
        }
    }

    handleKeyDown = e => {
        const { onSubmit, name } = this.props;
        const { text } = this.state;
        if (e.which === 13 && !e.shiftKey && text) {
            e.preventDefault();
            this.setState(
                {
                    editable: false
                },
                () => {
                    onSubmit(name, this.state.text);
                }
            );
        }
    };

    handleChange = e => {
        this.setState({ text: e.target.value });
    };

    handleClickOutside = () => {
        this.setState({
            editable: false
        });
    };

    handleClick = () => {
        this.setState({
            editable: true
        });
    };

    render() {
        const { className, inputProps, text: defaultValue } = this.props;
        const { editable, text } = this.state;

        return (
            <div className="editable" onClick={this.handleClick}>
                {editable ? (
                    <div className={`${className} ${!text ? 'has-error' : ''}`}>
                        <textarea
                            className="form-control"
                            defaultValue={defaultValue}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            {...inputProps}
                        />
                        {!text && (
                            <div className="mt-5 text-danger text-small">
                                Value cannot be empty
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={className}>{text}</div>
                )}
            </div>
        );
    }
}

export default onClickOutside(Editable);
