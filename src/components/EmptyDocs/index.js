import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './empty-docs.scss';

const EmptyDocs = ({ onClick, description, btnText, iconName }) => {
    return (
        <div className="empty-docs">
            <div className="empty-docs-content">
                <i className="material-icons">{iconName}</i>
                <div className="empty-docs-description">{description}</div>
                <Button className="btn-primary" onClick={onClick}>
                    {btnText}
                </Button>
            </div>
        </div>
    );
};

EmptyDocs.propTypes = {
    onClick: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired
};

export default EmptyDocs;
