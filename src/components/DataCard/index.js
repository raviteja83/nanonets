import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './data-card.scss';
import { selectDataFromId } from '../../selectors/documents-selectors';

class DataCard extends Component {
    handleClick = () => {
        const { history, id } = this.props;
        history.push(`/docs/${id}`);
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
    history: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
    data: selectDataFromId()
});

export default withRouter(connect(mapStateToProps)(DataCard));
