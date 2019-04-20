import React, { Component } from "react";
import { Card, Button, Modal } from "antd";
import "./../ui.less";
export default class index extends Component {
  state = {
    m1: false
  };
  handleOpen = type => {
    this.setState({
      [type]: true
    });
  };

  handleConfirm = type => {
    Modal[type]({
      title: "确认？",
      content: "嗯",
      onOk() {
        console.log("object");
      },
      onCancel() {
        console.log("object");
      }
    });
  };

  render() {
    return (
      <div>
        <Card title="基础模态框" className="single-button">
          <Button onClick={() => this.handleOpen("m1")}>open1</Button>
          <Button onClick={() => this.handleOpen("m2")}>open2</Button>
          <Button onClick={() => this.handleOpen("m3")}>open3</Button>
          <Button onClick={() => this.handleOpen("m4")}>open4</Button>
        </Card>
        <Card title="信息确认框" className="single-button">
          <Button onClick={() => this.handleConfirm("confirm")}>confirm</Button>
          <Button onClick={() => this.handleConfirm("info")}>info</Button>
          <Button onClick={() => this.handleConfirm("success")}>success</Button>
          <Button onClick={() => this.handleConfirm("warning")}>warning</Button>
        </Card>
        <Modal
          title="React"
          visible={this.state.m1}
          onCancel={() => {
            this.setState({
              m1: false
            });
          }}
        >
          <p>welcome modal m1</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.m2}
          okText="下一步"
          cancelText="算了"
          onCancel={() => {
            this.setState({
              m2: false
            });
          }}
        >
          <p>welcome modal m2</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.m3}
          style={{ top: 20 }}
          onCancel={() => {
            this.setState({
              m3: false
            });
          }}
        >
          <p>welcome modal m3</p>
        </Modal>
        <Modal
          title="React"
          wrapClassName="vertical-center-modal"
          visible={this.state.m4}
          onCancel={() => {
            this.setState({
              m4: false
            });
          }}
        >
          <p>welcome modal m4</p>
        </Modal>
      </div>
    );
  }
}
