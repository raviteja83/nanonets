import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import GradientLoader from '../components/GradientLoader';

import {
    updateDataForId,
    getDataById,
    addListener,
    removeListener
} from '../actions/document-actions';

import { updateDocDataForId } from '../actions/folder-actions';

import {
    selectDataFromId,
    selectGetOneLoading,
    selectCurrentId
} from '../selectors/documents-selectors';

import './document-detail.scss';
import DocEditor from '../components/DocEditor';

class DocumentDetail extends React.Component {
    static propTypes = {
        updateDataForId: PropTypes.func.isRequired,
        updateDocDataForId: PropTypes.func.isRequired,
        getDataById: PropTypes.func.isRequired,
        addListener: PropTypes.func.isRequired,
        removeListener: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.getData(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.props.removeListener(this.props.id);
            this.getData(nextProps.id);
        }
    }

    componentWillUnmount() {
        this.props.removeListener(this.props.id);
    }

    getData = id => {
        const { getDataById, addListener } = this.props;
        addListener(id);
        getDataById(id);
    };

    handleUpdate = (value, title) => {
        const {
            id,
            updateDataForId,
            updateDocDataForId,
            location: { state }
        } = this.props;

        updateDataForId(id, { content: value, title }).then(() => {
            if (state) {
                const { parentId, folderId } = state;
                const { data: { title } } = this.props;
                updateDocDataForId(folderId, parentId, { title });
            }
        });
    };

    render() {
        const { loading, data: { content } } = this.props;

        return (
            <div className="document-detail">
                {loading ? (
                    <div className="loader">
                        <GradientLoader />
                    </div>
                ) : isEmpty(content) ? null : (
                    <DocEditor data={content} onChange={this.handleUpdate} />
                )}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    data: selectDataFromId(),
    loading: selectGetOneLoading(),
    id: selectCurrentId()
});

const mapDispatchToProps = {
    updateDataForId,
    getDataById,
    addListener,
    removeListener,
    updateDocDataForId
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);
