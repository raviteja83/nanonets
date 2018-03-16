import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectData, selectLoading } from '../../selectors/header-selectors';

const HeaderAction = ({ data: { title }, loading }) => {
    return loading ? null : (
        <div className="header header-action">
            <Link to="/folders">
                <i className="fa fa-times mr-5" />
            </Link>
            <div className="header-title">{title}</div>
        </div>
    );
};

HeaderAction.propTypes = {
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
    data: selectData(),
    loading: selectLoading()
});

export default connect(mapStateToProps)(HeaderAction);
