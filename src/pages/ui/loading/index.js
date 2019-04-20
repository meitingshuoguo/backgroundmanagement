import React, { Component } from "react";
import { Card, Spin, Icon, Alert } from "antd";
import "./../ui.less";
export default class index extends Component {
  render() {
    const icon = <Icon type="loading" style={{ fontSize: 30 }} />;
    return (
      <div>
        <Card title="Spin用法">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
          <Spin indicator={icon} />
        </Card>
        <Card title="内容遮罩">
          <Alert
            message="react"
            description="welcome react + antd lesson"
            type="error"
          />
          <Spin tip="……">
            <Alert message="hello" description="no" type="success" />
          </Spin>
          <Spin indicator={icon}>
            <Alert message="hello" description="no" type="success" />
          </Spin>
        </Card>
      </div>
    );
  }
}
