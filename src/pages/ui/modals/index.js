import React, { Component } from "react";
import { Card, Button, Modal } from "antd";
import "./../ui.less";
export default class index extends Component {
  state = {
    m1: false
  };
  handleOpen = type => {};

  render() {
    return (
      <div>
        <Card>
          <Button onClick={this.handleOpen("m1")}>open1</Button>
          <Button onClick={this.handleOpen("m2")}>open2</Button>
          <Button onClick={this.handleOpen("m3")}>open3</Button>
          <Button onClick={this.handleOpen("m4")}>open4</Button>
        </Card>
        <Modal title="React" visible={this.state.m1}>
          <p>welcome modal m1</p>
        </Modal>
      </div>
    );
  }
}
