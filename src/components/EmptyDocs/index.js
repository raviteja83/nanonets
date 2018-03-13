import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './empty-docs.scss';

const EmptyDocs = ({ onClick, description }) => {
    return (
        <div className="empty-docs">
            <div className="empty-docs-content">
                <div className="empty-docs-description">{description}</div>
                <Button className="btn-primary" onClick={onClick}>
                    Add New Doc
                </Button>
            </div>
        </div>
    );
};

EmptyDocs.propTypes = {
    onClick: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired
};

export default EmptyDocs;
