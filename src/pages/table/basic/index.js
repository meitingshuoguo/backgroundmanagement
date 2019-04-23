import React, { Component } from "react";
import { Card, Table } from "antd";
import axios from "../../../axios";
export default class index extends Component {
  state = {
    dataSource: [],
    dataSource2: [],
    selectedRowKeys: []
  };

  request = () => {
    axios
      .ajax({
        url: "/table/list",
        data: {
          params: {
            page: 1
          },
          isShowLoading: true
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            dataSource2: this.getAddKeyData(res.result)
          });
        }
      });
  };
  getAddKeyData = data => {
    return data.map(item => {
      item.key = item.id;
      return item;
    });
  };
  rowOnClick = (record, index) => {
    let keys = [record.key];
    this.setState({
      selectedRowKeys: keys
    });
  };
  componentDidMount() {
    this.request();
    const dataSource = [
      {
        id: 0,
        name: "name1",
        sex: "man",
        status: 1
      },
      {
        id: 1,
        name: "name2",
        sex: "man",
        status: 2
      },
      {
        id: 2,
        name: "name3",
        sex: "man",
        status: 3
      }
    ];
    this.setState({
      dataSource: this.getAddKeyData(dataSource)
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
        dataIndex: "sex",
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "状态",
        dataIndex: "status",
        render(status) {
          let config = {
            1: "one",
            2: "two",
            3: "three"
          };
          return config[status];
        }
      }
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      selectedRowKeys
    };
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
        <Card title="动态数据渲染表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            rowSelection={rowSelection}
            onRow={(record, index) => ({
              onClick: () => {
                this.rowOnClick(record, index);
              }
            })}
          />
        </Card>
      </div>
    );
  }
}
