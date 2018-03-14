import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import DataCard from '../components/DataCard';

import { getAllDocuments } from '../actions/document-actions';
import {
    selectData,
    selectGetLoading,
    selectFirstVisit
} from '../selectors/documents-selectors';
import { GradientLoader } from '../components/GradientLoader';
import EmptyDocs from '../components/EmptyDocs';

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
                ) : keys.length === 0 ? (
                    <EmptyDocs
                        description="No Folders Found. Please create one"
                        onClick={this.redirectToAdd}
                    />
                ) : (
                    keys.map(key => {
                        const value = data[key];
                        return <DataCard key={key} data={value} id={key} />;
                    })
                )}
            </div>
        );
    }
}

FolderContainer.propTypes = {
    data: PropTypes.object.isRequired,
    getAllDocuments: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    firstVisit: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
    data: selectData(),
    loading: selectGetLoading(),
    firstVisit: selectFirstVisit()
});

const mapDispatchToProps = {
    getAllDocuments
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(FolderContainer)
);
