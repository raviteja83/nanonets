import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { isEqual } from 'lodash';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

class Tree extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            treeData: props.data
        };
    }
    componentWillReceiveProps({ data }) {
        if (!isEqual(this.props.data, data)) {
            this.setState({
                treeData: data
            });
        }
    }

    handleNodeClick = () => {};

    generateNodeProps = rowInfo => {
        return {
            onClick: () => {
                this.handleNodeClick(rowInfo);
            }
        };
    };

    render() {
        return (
            <div className="folder-tree" style={{ height: 400 }}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    theme={FileExplorerTheme}
                    generateNodeProps={this.generateNodeProps}
                />
            </div>
        );
    }
}

export default Tree;
