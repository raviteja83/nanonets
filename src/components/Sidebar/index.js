import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import FolderTree from '../FolderTree';
import { GradientLoader } from '../GradientLoader';

import {
    selectGetLoading,
    selectFirstVisit,
    selectFormatDataToTree
} from '../../selectors/folders-selectors';

class Sidebar extends Component {
    render() {
        const { loading, data, firstVisit } = this.props;

        return (
            <div className="sidebar">
                {loading && firstVisit ? (
                    <div className="loader">
                        <GradientLoader />
                    </div>
                ) : (
                    <Fragment>
                        <NavLink to="/folders">Home</NavLink>
                        <FolderTree data={data} />
                    </Fragment>
                )}
            </div>
        );
    }
}

Sidebar.propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    firstVisit: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
    data: selectFormatDataToTree(),
    loading: selectGetLoading(),
    firstVisit: selectFirstVisit()
});

export default withRouter(connect(mapStateToProps)(Sidebar));
