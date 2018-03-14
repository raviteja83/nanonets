import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [{ title: 'Chicken', children: [{ title: 'Egg' }] }]
        };
    }

    render() {
        return (
            <div className="folder-tree" style={{ height: 400 }}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    theme={FileExplorerTheme}
                />
            </div>
        );
    }
}

export default Tree;
