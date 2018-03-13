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
        const { title, content, assets = {} } = this.props.data;
        const assetsSize = Object.keys(assets).length;

        return (
            <div className="data-card" onClick={this.handleClick}>
                <div className="data-card-title">{title}</div>
                <div className="data-card-content">{content}</div>
                {assetsSize > 0 && (
                    <div className="data-card-attachments">
                        <i className="fa fa-paperclip" /> {assetsSize}
                    </div>
                )}
            </div>
        );
    }
}

DataCard.propTypes = {
    data: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(DataCard);
