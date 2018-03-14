import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './data-card.scss';
import { selectDataFromId } from '../../selectors/documents-selectors';

class Folder extends Component {
    handleClick = () => {
        const { history, id } = this.props;
        history.push(`/docs/${id}`);
    };

    render() {
        const { data: { title } } = this.props;
        return (
            <div className="folder" onClick={this.handleClick}>
                <div className="folder-icon">
                    <i class="material-icons">folder</i>
                </div>
                <div className="folder-title">{title || ''}</div>
            </div>
        );
    }
}

Folder.propTypes = {
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
    data: selectDataFromId()
});

export default withRouter(connect(mapStateToProps)(Folder));
