import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addFolder } from '../../actions/folder-actions';

class AddFolder extends Component {
    state = {
        name: '',
        error: ''
    };

    handleClose = () => {
        this.props.history.push('/');
    };

    handleChange = e => {
        const { target: { value } } = e;
        this.setState(({ error }) => ({
            name: value,
            error: value ? '' : error
        }));
    };

    handleSubmit = e => {
        if (e.which === 13) {
            e.preventDefault();
            const { name } = this.state;
            if (!name) {
                this.setState({
                    error: 'Field cannot be empty'
                });
                return;
            }
            this.props.addFolder(name, key => {
                this.props.history.push(`/folders/${key}`);
            });
        }
    };

    render() {
        const { name, error } = this.state;
        return (
            <Modal show bsSize="xs">
                <Modal.Header closeButton>
                    <Modal.Title>Add Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="pt-20">
                        <textarea
                            className="form-control"
                            placeholder="Enter Folder name"
                            onKeyDown={this.handleSubmit}
                            onChange={this.handleChange}
                            value={name}
                            rows={1}
                        />
                        <div className="text-danger mt-5">{error}</div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AddFolder.propTypes = {
    history: PropTypes.object.isRequired,
    addFolder: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    addFolder
};

export default connect(null, mapDispatchToProps)(AddFolder);
