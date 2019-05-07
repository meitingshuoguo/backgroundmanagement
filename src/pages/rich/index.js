import React, { Component } from "react";
import { Button, Card, Modal } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
export default class index extends Component {
  state = {
    editorState: "",
    contentState: "",
    showContent: false
  };
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  handleClearContent = () => {
    this.setState({
      editorState: ""
    });
  };
  handleShowContent = () => {
    this.setState({
      showContent: true
    });
  };
  onContentChange = contentState => {
    this.setState({
      contentState
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Card>
          <Button onClick={this.handleClearContent} style={{ marginRight: 15 }}>
            清空内容
          </Button>
          <Button onClick={this.handleShowContent}>获取HTML文本</Button>
        </Card>
        <Card title="富文本编辑">
          <Editor
            editorState={editorState}
            onContentStateChange={this.onContentChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="内容"
          visible={this.state.showContent}
          onCancel={() => {
            this.setState({
              showContent: false
            });
          }}
          footer={null}
        >
          {draftToHtml(this.state.contentState)}
        </Modal>
      </div>
    );
  }
}
