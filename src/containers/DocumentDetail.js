import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import GradientLoader from '../components/GradientLoader';

import { updateDataForId, getDataById } from '../actions/document-actions';

import {
    selectDataFromId,
    selectGetOneLoading,
    selectCurrentId
} from '../selectors/documents-selectors';

import './document-detail.scss';
import DocEditor from '../components/DocEditor';

class DocumentDetail extends React.Component {
    componentDidMount() {
        this.getData(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.getData(nextProps.id);
        }
    }

    getData = id => {
        const { getDataById } = this.props;

        getDataById(id);
    };

    handleUpdate = value => {
        const { id, updateDataForId } = this.props;
        updateDataForId(id, value);
    };

    render() {
        const { loading, data } = this.props;

        return (
            <div className="document-detail">
                {loading ? (
                    <div className="loader">
                        <GradientLoader />
                    </div>
                ) : isEmpty(data) ? null : (
                    <DocEditor data={data} onChange={this.handleUpdate} />
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
    getDataById
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);
