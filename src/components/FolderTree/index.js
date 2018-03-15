import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { PanelGroup, Panel } from 'react-bootstrap';
import { isEqual } from 'lodash';

import './folder-tree.scss';

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

    render() {
        const { treeData } = this.state;

        return (
            <PanelGroup
                accordion
                id="sidebar-nav"
                className="folder-tree"
                onSelect={this.handleSelect}
            >
                {treeData.map(parent => {
                    const { children, id, title } = parent;

                    return (
                        <Panel eventKey={id} key={id}>
                            <Panel.Heading>
                                <Panel.Title toggle>
                                    <NavLink
                                        className="sidebar-nav-link"
                                        to={`/folders/${id}`}
                                    >
                                        {title}
                                    </NavLink>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                {children.map(child => {
                                    const {
                                        id: childId,
                                        parentId,
                                        title: childTitle
                                    } = child;

                                    return (
                                        <NavLink
                                            key={childId}
                                            className="sidebar-nav-link"
                                            to={{
                                                pathname: `/docs/${childId}`,
                                                state: {
                                                    parentId,
                                                    folderId: id
                                                }
                                            }}
                                        >
                                            {childTitle}
                                        </NavLink>
                                    );
                                })}
                            </Panel.Body>
                        </Panel>
                    );
                })}
            </PanelGroup>
        );
    }
}

export default Tree;
