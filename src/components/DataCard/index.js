import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import './data-card.scss';

class DataCard extends Component {
    handleClick = () => {
        const { history, id } = this.props;
        history.push(`/docs/${id}`);
    };

    render() {
        const { id } = this.props;
        return (
            <div className="data-card" onClick={this.handleClick}>
                <div className="data-card-title">{id}</div>
            </div>
        );
    }
}

DataCard.propTypes = {
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(DataCard);
