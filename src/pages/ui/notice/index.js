import React, { Component } from "react";
import { Card, Button, notification } from "antd";
import "./../ui.less";
export default class index extends Component {
  handleOpenNotification = (type, direction) => {
    if (direction) {
      notification.config({
        placement: direction
      });
    }
    notification[type]({
      message: "发工资了",
      description: "假的"
    });
  };
  render() {
    return (
      <div>
        <Card title="通知提醒框" className="single-button">
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("success")}
          >
            success
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("info")}
          >
            info
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("warning", "topLeft")}
          >
            warning-top-left
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("error")}
          >
            error
          </Button>
        </Card>
      </div>
    );
  }
}
