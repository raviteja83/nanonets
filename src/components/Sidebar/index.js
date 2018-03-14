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
    selectData,
    selectFirstVisit
} from '../../selectors/documents-selectors';

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
                        <NavLink to="/docs">Home</NavLink>
                        {Object.keys(data).map(key => {
                            const { title } = data[key];
                            return (
                                <NavLink
                                    key={key}
                                    className={action === key ? 'active' : ''}
                                    to={`/docs/${key}`}
                                    title={title}
                                >
                                    {title}
                                </NavLink>
                            );
                        })}
                        <FolderTree />
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
