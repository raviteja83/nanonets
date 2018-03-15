import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import FolderTree from '../FolderTree';
import { GradientLoader } from '../GradientLoader';

import { addListener, removeListener } from '../../actions/folder-actions';

import {
    selectGetLoading,
    selectFirstVisit,
    selectFormatDataToTree
} from '../../selectors/folders-selectors';

class Sidebar extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        firstVisit: PropTypes.bool.isRequired,
        addListener: PropTypes.func.isRequired,
        removeListener: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.addListener();
    }

    componentWillUnmount() {
        this.props.removeListener();
    }

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
                        <NavLink
                            className="sidebar-nav-link"
                            to="/folders"
                            exact
                        >
                            Home
                        </NavLink>
                        <FolderTree data={data} />
                    </Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    data: selectFormatDataToTree(),
    loading: selectGetLoading(),
    firstVisit: selectFirstVisit()
});

const mapDispatchToProps = {
    addListener,
    removeListener
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
