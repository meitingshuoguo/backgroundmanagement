import React, { Component } from "react";
import { Card, Table } from "antd";
import axios from "../../../axios";
export default class index extends Component {
  state = {
    dataSource2: []
  };

  request = () => {
    axios
      .ajax({
        url: "/table/list",
        data: {
          params: {
            page: 1
          }
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            dataSource2: res.result
          });
        }
      });
  };
  componentDidMount() {
    this.request();
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
        </Card>
        <Card title="动态数据渲染表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
          />
        </Card>
      </div>
    );
  }
}
