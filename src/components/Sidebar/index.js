import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import {
    selectGetLoading,
    selectData,
    selectFirstVisit
} from '../../selectors/documents-selectors';
import { GradientLoader } from '../GradientLoader';

class Sidebar extends Component {
    render() {
        const {
            loading,
            data,
            match: { params: { action } },
            firstVisit
        } = this.props;

        return (
            <div className="sidebar">
                {loading && firstVisit ? (
                    <div className="loader">
                        <GradientLoader />
                    </div>
                ) : (
                    <Fragment>
                        <NavLink to="/docs/add">
                            <i className="fa fa-plus mr-5" />Add New Doc
                        </NavLink>
                        {Object.keys(data).map(key => {
                            return (
                                <NavLink
                                    key={key}
                                    className={action === key ? 'active' : ''}
                                    to={`/docs/${key}`}
                                >
                                    {key}
                                </NavLink>
                            );
                        })}
                    </Fragment>
                )}
            </div>
        );
    }
}

Sidebar.propTypes = {
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    firstVisit: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
    data: selectData(),
    loading: selectGetLoading(),
    firstVisit: selectFirstVisit()
});

export default withRouter(connect(mapStateToProps)(Sidebar));
