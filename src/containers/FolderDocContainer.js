import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import DataCard from '../components/DataCard';
import { GradientLoader } from '../components/GradientLoader';

import { getFolderDataById } from '../actions/folder-actions';

import {
    selectCurrentId,
    selectGetLoading,
    selectFirstVisit,
    selectDocsForFolder
} from '../selectors/folders-selectors';

class FolderDocContainer extends Component {
    componentDidMount() {
        this.getData(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.getData(nextProps.id);
        }
    }

    getData = id => {
        const { getFolderDataById } = this.props;
        getFolderDataById(id);
    };

    handleAddDoc = () => {
        this.props.history.push('/docs/add', { folderId: this.props.id });
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
                            onClick={this.handleAddDoc}
                        >
                            <i className="material-icons">insert_drive_file</i>
                            <div className="blank-card-title">Add Doc</div>
                        </div>,
                        keys.map(key => {
                            const value = data[key];
                            return (
                                <DataCard
                                    key={key}
                                    data={value}
                                    id={value.id}
                                />
                            );
                        })
                    ]
                )}
            </div>
        );
    }
}

FolderDocContainer.propTypes = {
    data: PropTypes.object.isRequired,
    getFolderDataById: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    firstVisit: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
    data: selectDocsForFolder(),
    loading: selectGetLoading(),
    firstVisit: selectFirstVisit(),
    id: selectCurrentId()
});

const mapDispatchToProps = {
    getFolderDataById
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderDocContainer);
