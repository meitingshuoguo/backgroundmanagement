import React, { Component } from "react";
import { Card, Button, Radio } from "antd";
import "./../ui.less";
export default class buttons extends Component {
  state = {
    loading: true,
    size: "small"
  };
  handleClose = () => {
    this.setState({
      loading: false
    });
  };
  handleTurnOn = () => {
    this.setState({
      loading: true
    });
  };
  handleRadio = e => {
    this.setState({
      size: e.target.value
    });
  };
  render() {
    return (
      <div>
        <Card title="基础按钮" className="single-button">
          <Button> 按钮1 </Button> <Button type="primary"> 按钮1 </Button>{" "}
          <Button type="danger"> 按钮1 </Button>{" "}
          <Button type="dashed"> 按钮1 </Button>{" "}
          <Button disabled> 按钮1 </Button>{" "}
        </Card>{" "}
        <Card title="图形按钮" className="single-button">
          <Button icon="plus"> 按钮1 </Button>{" "}
          <Button type="primary" icon="search">
            {" "}
            按钮1{" "}
          </Button>{" "}
          <Button type="danger" icon="delete">
            {" "}
            按钮1{" "}
          </Button>{" "}
          <Button type="dashed" icon="edit">
            {" "}
            按钮1{" "}
          </Button>{" "}
          <Button shape="circle" icon="search">
            {" "}
          </Button>{" "}
        </Card>{" "}
        <Card title="loading按钮" className="single-button">
          <Button type="primary" loading={this.state.loading}>
            {" "}
            按钮1{" "}
          </Button>{" "}
          <Button shape="circle" loading={this.state.loading}>
            {" "}
          </Button>{" "}
          <Button
            type="danger"
            onClick={this.handleTurnOn}
            loading={this.state.loading}
          >
            {" "}
            点击加载{" "}
          </Button>{" "}
          <Button onClick={this.handleClose}> 关闭 </Button>{" "}
        </Card>{" "}
        <Card title="按钮组">
          <Button.Group>
            <Button type="primary" icon="left">
              {" "}
              前进{" "}
            </Button>{" "}
            <Button type="primary" icon="right">
              {" "}
              返回{" "}
            </Button>{" "}
          </Button.Group>{" "}
        </Card>{" "}
        <Card title="按钮尺寸" className="single-button">
          <Radio.Group value={this.state.size} onChange={this.handleRadio}>
            <Radio value="small"> 小 </Radio>{" "}
            <Radio value="default"> 中 </Radio>{" "}
            <Radio value="large"> 大 </Radio>{" "}
          </Radio.Group>{" "}
          <Button.Group>
            <Button size={this.state.size}> 1 </Button>{" "}
            <Button size={this.state.size}> 1 </Button>{" "}
            <Button size={this.state.size}> 1 </Button>{" "}
          </Button.Group>{" "}
          <Button size={this.state.size}> 1 </Button>{" "}
          <Button size={this.state.size}> 1 </Button>{" "}
        </Card>{" "}
      </div>
    );
  }
}
