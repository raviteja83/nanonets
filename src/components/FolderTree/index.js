import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { PanelGroup, Panel } from 'react-bootstrap';

import './folder-tree.scss';

class Tree extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    state = {
        activeKey: ''
    };

    handleSelect = activeKey => {
        this.setState({
            activeKey
        });
    };

    render() {
        const { activeKey } = this.state;
        const { data } = this.props;

        return (
            <PanelGroup
                accordion
                id="sidebar-nav"
                className="folder-tree"
                activeKey={activeKey}
                onSelect={this.handleSelect}
            >
                {data.map(parent => {
                    const { children, id, title } = parent;
                    const hasChildren = children.length > 0;

                    return (
                        <Panel eventKey={id} key={id}>
                            <Panel.Heading>
                                <Panel.Toggle componentClass="div">
                                    <NavLink
                                        className="sidebar-nav-link"
                                        to={`/folders/${id}`}
                                    >
                                        <span className="sidebar-nav-link-content">
                                            {hasChildren && (
                                                <i className="material-icons">
                                                    {activeKey === id
                                                        ? 'expand_more'
                                                        : 'chevron_right'}
                                                </i>
                                            )}
                                            <i className="material-icons">
                                                folder
                                            </i>
                                            <span className="ml-5">
                                                {title}
                                            </span>
                                        </span>
                                    </NavLink>
                                </Panel.Toggle>
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
                                            <span className="sidebar-nav-link-content">
                                                <i className="material-icons">
                                                    insert_drive_file
                                                </i>
                                                {childTitle}
                                            </span>
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
