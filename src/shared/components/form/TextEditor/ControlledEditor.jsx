import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


export default class ControlledEditor extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    initial: PropTypes.string,
  };

  static defaultProps = {
    initial: '<p></p> ',
  };

  static getDerivedStateFromProps(props, state) {
    if (props.initial !== state.initial) {
      const blocksFromHtml = htmlToDraft(props.initial);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap,
      );
      return {
        editorState: EditorState.createWithContent(contentState),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const blocksFromHtml = htmlToDraft(props.initial);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap,
    );
    this.state = {
      editorState: EditorState.createWithContent(contentState),
      initial: props.initial, // eslint-disable-line
    };
    this.props.onChange(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
  }

  onEditorStateChange = (editorState) => {
    const { onChange, value } = this.props;

    const newValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    if (value !== newValue) {
      onChange(newValue);
    }

    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;

    const ToolbarOptions = {
      options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'emoji', 'image', 'history'],
      inline: {
        options: ['bold', 'italic', 'underline'],
      },
    };

    return (
      <div className="text-editor w-100">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={ToolbarOptions}
        />
      </div>
    );
  }
}
