import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import './data-card.scss';

class DataCard extends Component {
    handleClick = () => {
        const { history, id, type, state } = this.props;
        history.push(`/${type}/${id}`, state);
    };

    render() {
        const { data: { title } } = this.props;
        return (
            <div className="data-card" onClick={this.handleClick}>
                <div className="data-card-title">{title || ''}</div>
            </div>
        );
    }
}

DataCard.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    type: PropTypes.string,
    state: PropTypes.shape({
        parentId: PropTypes.string,
        folderId: PropTypes.string
    })
};

DataCard.defaultProps = {
    type: 'docs'
};

export default withRouter(DataCard);
