import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { addDocument } from '../../actions/document-actions';

import DocEditor from '../DocEditor';

import initialValue from './value.json';

import './add-document.scss';

class AddDocument extends Component {
    handleUpdate = (update, title) => {
        if (!title) {
            alert('Please add title');
        }
        const { history, addDocument, location: { pathname } } = this.props;
        if (pathname === '/docs/add') {
            addDocument({ title, content: update }, id => {
                history.push(`/docs/${id}`);
            });
        }
    };

    render() {
        return (
            <DocEditor
                data={initialValue}
                title="Title"
                onChange={this.handleUpdate}
            />
        );
    }
}

AddDocument.propTypes = {
    addDocument: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

const mapDispatchToProps = {
    addDocument
};

export default withRouter(connect(null, mapDispatchToProps)(AddDocument));
