import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { PanelGroup, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import Editable from '../Editable';

import { updateDataForId } from '../../actions/folder-actions';

import './folder-tree.scss';

class Tree extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        updateDataForId: PropTypes.func.isRequired
    };

    state = {
        activeKey: ''
    };

    handleSelect = activeKey => {
        this.setState({
            activeKey
        });
    };

    handleFolderRename = (id, title) => {
        this.props.updateDataForId(id, { title });
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
                                            <i className="material-icons">
                                                folder
                                            </i>
                                            <span className="ml-5">
                                                <Editable
                                                    text={title}
                                                    name={id}
                                                    onSubmit={
                                                        this.handleFolderRename
                                                    }
                                                    inputProps={{ rows: 1 }}
                                                />
                                            </span>
                                            {hasChildren && (
                                                <i className="material-icons">
                                                    {activeKey === id
                                                        ? 'expand_more'
                                                        : 'chevron_right'}
                                                </i>
                                            )}
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
                                                <span>{childTitle}</span>
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

const mapDispatchToProps = {
    updateDataForId
};

export default connect(null, mapDispatchToProps)(Tree);
