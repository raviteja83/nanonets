import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import Editable from '../Editable';

import { addFolder } from '../../actions/folder-actions';

class AddFolder extends Component {
    handleClose = () => {
        this.props.history.push('/');
    };

    handleSubmit = (_, name) => {
        if (!name) {
            return;
        }
        this.props.addFolder(name, key => {
            this.props.history.push(`/folders/${key}`);
        });
    };

    render() {
        return (
            <Modal show bsSize="xs">
                <Modal.Header closeButton>
                    <Modal.Title>Add Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="pt-20">
                        <Editable
                            text="Folder name"
                            onSubmit={this.handleSubmit}
                            inputProps={{ rows: 1 }}
                        />
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
