import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
    selectDataFromId,
    selectGetOneLoading
} from '../../selectors/documents-selectors';

const HeaderAction = ({ data: { title }, loading }) => {
    return loading ? null : (
        <div className="header header-action">
            <Link to="/docs">
                <i className="fa fa-times mr-5" />
            </Link>
            <div className="header-title">{title}</div>
        </div>
    );
};

HeaderAction.propTypes = {
    data: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
    data: selectDataFromId(),
    loading: selectGetOneLoading()
});

export default connect(mapStateToProps)(HeaderAction);