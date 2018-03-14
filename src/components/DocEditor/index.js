import React from 'react';
import PropTypes from 'prop-types';
import { Editor, getEventRange, getEventTransfer } from 'slate-react';
import { Block, Value } from 'slate';
import { LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations';
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';
import { debounce } from 'lodash';
import { isKeyHotkey } from 'is-hotkey';
import Plain from 'slate-plain-serializer';

import './doc-editor.scss';

const DEFAULT_NODE = 'paragraph';
const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const schema = {
    document: {
        last: { types: ['paragraph'] },
        normalize: (change, reason, { node, child }) => {
            switch (reason) {
                case LAST_CHILD_TYPE_INVALID: {
                    const paragraph = Block.create('paragraph');
                    return change.insertNodeByKey(
                        node.key,
                        node.nodes.size,
                        paragraph
                    );
                }
                default:
                    break;
            }
        }
    }
};

class DocEditor extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const { data, title } = props;
        this.state = {
            value: Value.fromJSON(data),
            title: Plain.deserialize(title)
        };
        this.debouncedUpdate = debounce(this.handleUpdate, 300);
    }

    isImage = url => {
        return !!imageExtensions.find(url.endsWith);
    };

    insertImage = (change, src, target) => {
        if (target) {
            change.select(target);
        }

        change.insertBlock({
            type: 'image',
            isVoid: true,
            data: { src }
        });
    };

    hasMark = type => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type);
    };

    hasBlock = type => {
        const { value } = this.state;
        return value.blocks.some(node => node.type === type);
    };

    onDropOrPaste = (event, change, editor) => {
        const target = getEventRange(event, change.value);
        if (!target && event.type === 'drop') return;

        const transfer = getEventTransfer(event);
        const { type, text, files } = transfer;

        if (type === 'files') {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split('/');
                if (mime !== 'image') continue;

                reader.addEventListener('load', () => {
                    editor.change(c => {
                        c.call(this.insertImage, reader.result, target);
                    });
                });

                reader.readAsDataURL(file);
            }
        }

        if (type === 'text') {
            if (!isUrl(text)) return;
            if (!this.isImage(text)) return;
            change.call(this.insertImage, text, target);
        }
    };

    onChange = ({ value }) => {
        this.setState({ value }, this.debouncedUpdate);
    };

    handleUpdate = () => {
        const { value, title } = this.state;
        const updatedValue = value.toJSON();
        const updatedTitle = Plain.serialize(title);
        const { nodes } = updatedValue.document;
        if (nodes.length > 1) {
            this.props.onChange(updatedValue, updatedTitle);
        }
    };

    onKeyDown = (event, change) => {
        let mark;

        if (isBoldHotkey(event)) {
            mark = 'bold';
        } else if (isItalicHotkey(event)) {
            mark = 'italic';
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined';
        } else if (isCodeHotkey(event)) {
            mark = 'code';
        } else {
            return;
        }
        event.preventDefault();
        change.toggleMark(mark);
        return true;
    };

    onClickMark = (event, type) => {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change().toggleMark(type);
        this.onChange(change);
    };

    onClickBlock = (event, type) => {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change();
        const { document } = value;

        if (type === 'image') {
            const src = window.prompt('Enter the URL of the image:');
            if (!src) return;

            const change = this.state.value
                .change()
                .call(this.insertImage, src);
            this.onChange(change);
            return;
        }

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                change
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
            } else {
                change.setBlocks(isActive ? DEFAULT_NODE : type);
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item');
            const isType = value.blocks.some(block => {
                return !!document.getClosest(
                    block.key,
                    parent => parent.type === type
                );
            });

            if (isList && isType) {
                change
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
            } else if (isList) {
                change
                    .unwrapBlock(
                        type === 'bulleted-list'
                            ? 'numbered-list'
                            : 'bulleted-list'
                    )
                    .wrapBlock(type);
            } else {
                change.setBlocks('list-item').wrapBlock(type);
            }
        }

        this.onChange(change);
    };

    renderToolbar = () => {
        return (
            <div className="menu toolbar-menu">
                {this.renderMarkButton('bold', 'format_bold')}
                {this.renderMarkButton('italic', 'format_italic')}
                {this.renderMarkButton('underlined', 'format_underlined')}
                {this.renderMarkButton('code', 'code')}
                {this.renderBlockButton('heading-one', 'looks_one')}
                {this.renderBlockButton('heading-two', 'looks_two')}
                {this.renderBlockButton('block-quote', 'format_quote')}
                {this.renderBlockButton(
                    'numbered-list',
                    'format_list_numbered'
                )}
                {this.renderBlockButton(
                    'bulleted-list',
                    'format_list_bulleted'
                )}
                {this.renderBlockButton('image', 'image')}
            </div>
        );
    };

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type);
        const onMouseDown = event => this.onClickMark(event, type);

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <span
                className="button"
                onMouseDown={onMouseDown}
                data-active={isActive}
            >
                <span className="material-icons">{icon}</span>
            </span>
        );
    };

    renderBlockButton = (type, icon) => {
        const isActive = this.hasBlock(type);
        const onMouseDown = event => this.onClickBlock(event, type);

        return (
            // eslint-disable-next-line react/jsx-no-bind
            <span
                className="button"
                onMouseDown={onMouseDown}
                data-active={isActive}
            >
                <span className="material-icons">{icon}</span>
            </span>
        );
    };

    renderEditor = () => {
        return (
            <Editor
                placeholder="Enter some rich text..."
                schema={schema}
                value={this.state.value}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                renderNode={this.renderNode}
                renderMark={this.renderMark}
                onDrop={this.onDropOrPaste}
                onPaste={this.onDropOrPaste}
                spellCheck
            />
        );
    };

    renderNode = props => {
        const { attributes, children, node, isSelected } = props;
        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>;
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>;
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>;
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>;
            case 'list-item':
                return <li {...attributes}>{children}</li>;
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>;
            case 'image': {
                const src = node.data.get('src');
                const className = isSelected
                    ? 'img-responsive active'
                    : 'img-responsive';
                const style = { display: 'block' };
                return (
                    <img
                        src={src}
                        alt={src}
                        className={className}
                        style={style}
                        {...attributes}
                    />
                );
            }
            default:
                return null;
        }
    };

    renderMark = props => {
        const { children, mark } = props;
        switch (mark.type) {
            case 'bold':
                return <strong>{children}</strong>;
            case 'code':
                return <code>{children}</code>;
            case 'italic':
                return <em>{children}</em>;
            case 'underlined':
                return <u>{children}</u>;
            default:
                return null;
        }
    };

    onTitleChange = ({ value }) => {
        this.setState(
            {
                title: value
            },
            this.debouncedUpdate
        );
    };

    onTitleKeyDown = (event, change) => {
        let mark;

        if (isBoldHotkey(event)) {
            mark = 'bold';
        } else if (isItalicHotkey(event)) {
            mark = 'italic';
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined';
        } else if (isCodeHotkey(event)) {
            mark = 'code';
        } else if (event.which === 13) {
            event.preventDefault();
            return;
        } else {
            return;
        }
        event.preventDefault();
        change.toggleMark(mark);
        return true;
    };

    renderTitleEditor = () => {
        return (
            <Editor
                placeholder="Enter some rich text..."
                value={this.state.title}
                onChange={this.onTitleChange}
                onKeyDown={this.onTitleKeyDown}
            />
        );
    };

    render() {
        return (
            <div className="document-editor">
                <div className="title-editor">{this.renderTitleEditor()}</div>
                {this.renderToolbar()}
                {this.renderEditor()}
            </div>
        );
    }
}

export default DocEditor;
