import React, { Component } from "react";
import { Card, Table, Badge, Modal, message, Button } from "antd";
import Axios from "../../../axios";
import utils from "../../../utils/utils";

export default class index extends Component {
  state = {
    dataSource: [],
    pagination: {}
  };
  params = {
    page: 1
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortOrder: sorter.order
    });
  };
  handleDelete = data => {
    let id = data.id;
    Modal.confirm({
      title: "确认",
      content: `确定删除${id}？`,
      onOk: () => {
        message.success("删除成功");
        this.request();
      }
    });
  };
  getIncludeKeyPropData = data => {
    return data.map(item => {
      item.key = item.id;
      return item;
    });
  };
  request = () => {
    let _this = this;
    Axios.ajax({
      url: "table/list",
      data: {
        params: {
          page: _this.params.page
        }
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          dataSource: this.getIncludeKeyPropData(res.result.list),
          pagination: utils.pagination(res, current => {
            _this.params.page = current;
            this.request();
          })
        });
      }
    });
  };
  componentDidMount() {
    this.request();
  }
  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        width: 80
      },
      {
        title: "姓名",
        dataIndex: "name",
        width: 80
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 80
      }
    ];
    const columns2 = [
      {
        title: "id",
        dataIndex: "id",
        width: 80,
        fixed: "left"
      },
      {
        title: "姓名",
        dataIndex: "name",
        width: 80,
        fixed: "left"
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 80
      },
      {
        title: "状态",
        dataIndex: "status",
        width: 80
      },
      {
        title: "时间",
        dataIndex: "time",
        width: 280
      },
      {
        title: "地址",
        dataIndex: "address",
        width: 380
      },
      {
        title: "详情",
        dataIndex: "details",
        width: 480
      }
    ];
    const columns3 = [
      {
        title: "id",
        dataIndex: "id"
      },
      {
        title: "姓名",
        dataIndex: "name"
      },
      {
        title: "性别",
        dataIndex: "sex"
      },
      {
        title: "状态",
        dataIndex: "status",
        render: data => {
          let config = {
            1: <Badge status="error" text="错误" />,
            2: <Badge status="success" text="成功" />,
            3: <Badge status="warning" text="警告" />
          };
          return config[data];
        },
        sorter: (a, b) => {
          return a.status - b.status;
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: "时间",
        dataIndex: "time"
      },
      {
        title: "操作",
        render: (text, item) => {
          return (
            <Button
              size="small"
              onClick={() => {
                this.handleDelete(item);
              }}
            >
              删除
            </Button>
          );
        }
      }
    ];

    let columns2WidthCount = 0;
    columns2.map(item => {
      columns2WidthCount += item.width;
      return item;
    });
    return (
      <div>
        <Card title="头部固定">
          <Table
            scroll={{ y: 200 }}
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={this.state.pagination}
          />
        </Card>
        <Card title="左侧固定">
          <Table
            scroll={{ x: columns2WidthCount }}
            bordered
            dataSource={this.state.dataSource}
            columns={columns2}
            pagination={this.state.pagination}
          />
        </Card>
        <Card title="排序">
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns3}
            pagination={this.state.pagination}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="操作按钮">
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns3}
            pagination={this.state.pagination}
            onChange={this.handleChange}
          />
        </Card>
      </div>
    );
  }
}
