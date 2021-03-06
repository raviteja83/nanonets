import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import DataCard from '../components/DataCard';
import { GradientLoader } from '../components/GradientLoader';

import { getAllFolders } from '../actions/folder-actions';
import {
    selectData,
    selectGetLoading,
    selectFirstVisit
} from '../selectors/folders-selectors';

class FolderContainer extends Component {
    componentDidMount() {
        this.props.getAllFolders().then(() => {
            const { location: { pathname }, data, history } = this.props;
            const key = Object.keys(data)[0];
            if (key && pathname === '/') {
                history.push(`/folders/${key}`);
            }
        });
    }

    redirectToAdd = () => {
        this.props.history.push('/folders/add');
    };

    render() {
        const { data, loading, firstVisit } = this.props;
        const keys = Object.keys(data);

        return (
            <div className="data-container">
                {firstVisit && loading ? (
                    <div className="loader">
                        <GradientLoader />
                    </div>
                ) : (
                    [
                        <div
                            key="blank"
                            className="blank-card"
                            onClick={this.redirectToAdd}
                        >
                            <i className="material-icons">create_new_folder</i>
                            <div className="blank-card-title">Add Folder</div>
                        </div>,
                        keys.map(key => {
                            const value = data[key];
                            return (
                                <DataCard
                                    type="folders"
                                    key={key}
                                    data={value}
                                    id={key}
                                />
                            );
                        })
                    ]
                )}
            </div>
        );
    }
}

FolderContainer.propTypes = {
    data: PropTypes.object.isRequired,
    getAllFolders: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    firstVisit: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
    data: selectData(),
    loading: selectGetLoading(),
    firstVisit: selectFirstVisit()
});

const mapDispatchToProps = {
    getAllFolders
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderContainer);
