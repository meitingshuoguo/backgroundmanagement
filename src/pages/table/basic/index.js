import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import axios from "../../../axios";
import utils from "../../../utils/utils";
export default class index extends Component {
  params = {
    page: 1
  };
  state = {
    dataSource: [],
    dataSource2: [],
    selectedRowKeys: [],
    selectedCheckRows: [],
    selectedCheckRowKeys: []
  };

  request = () => {
    let _this = this;
    axios
      .ajax({
        url: "/table/list",
        data: {
          params: {
            page: _this.params.page
          },
          isShowLoading: false
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            dataSource2: this.getAddKeyData(res.result.list),
            pagination: utils.pagination(res, current => {
              _this.params.page = current;
              this.request();
            })
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
  rowCheckOnClick = record => {
    let key = record.key;
    const keys = this.state.selectedCheckRowKeys;
    if (keys.indexOf(key) < 0) {
      keys.push(key);
    } else {
      keys.splice(keys.indexOf(keys), 1);
    }
    this.setState({
      selectedCheckRowKeys: keys
    });
  };
  handleDelete = () => {
    let rows = this.state.selectedCheckRows;
    let ids = [];
    rows.map(item => {
      return ids.push(item.id);
    });

    Modal.confirm({
      title: "删除提示",
      content: `确定？${ids}`,
      onOk: () => {
        message.success("删除成功");
      }
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
    const { selectedCheckRowKeys } = this.state;
    const rowCheckSelection = {
      type: "checkbox",
      selectedRowKeys: selectedCheckRowKeys,
      onChange: (selectedCheckRowKeys, selectedCheckRows) => {
        this.setState({
          selectedCheckRowKeys,
          selectedCheckRows
        });
      }
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
            pagination={false}
            columns={columns}
            dataSource={this.state.dataSource2}
          />
        </Card>
        <Card title="动态数据渲染表格-单选">
          <Table
            bordered
            pagination={false}
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
        <Card title="动态数据渲染表格-复选">
          <div style={{ marginBottom: 20 }}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={this.state.dataSource2}
            rowSelection={rowCheckSelection}
            onRow={record => ({
              onClick: () => {
                this.rowCheckOnClick(record);
              }
            })}
          />
        </Card>
        <Card title="动态数据渲染表格-分页">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}
