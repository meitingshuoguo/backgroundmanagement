import React, { Component } from "react";
import { Card, Table } from "antd";
export default class index extends Component {
  state = {};
  componentDidMount() {
    const dataSource = [
      {
        id: 0,
        name: "na",
        sex: "man",
        status: 0
      },
      {
        id: 1,
        name: "na",
        sex: "man",
        status: 0
      },
      {
        id: 0,
        name: "na",
        sex: "man",
        status: 0
      }
    ];
    this.setState({
      dataSource
    });
  }
  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id"
      },
      {
        title: "名字",
        dataIndex: "name"
      },
      {
        title: "性别",
        dataIndex: "sex"
      },
      {
        title: "状态",
        dataIndex: "status"
      }
    ];
    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={this.state.dataSource}
          />
          <p>f</p>
        </Card>
      </div>
    );
  }
}
