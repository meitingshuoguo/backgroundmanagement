import React, { Component } from "react";
import { message, Button, Card } from "antd";
export default class index extends Component {
  handleShowMessage = type => {
    message[type]("gggg");
  };
  render() {
    return (
      <div>
        <Card title="全局提示框">
          <Button onClick={() => this.handleShowMessage("success")}>
            success
          </Button>
          <Button onClick={() => this.handleShowMessage("info")}>info</Button>
        </Card>
      </div>
    );
  }
}
