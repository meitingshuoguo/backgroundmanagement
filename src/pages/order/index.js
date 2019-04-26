import React, { Component } from "react";
import {
  Button,
  Card,
  Table,
  Form,
  Modal,
  message,
  Select,
  DatePicker
} from "antd";
import Axios from "../../axios";
import utils from "../../utils/utils";
import moment from "moment";
const FormItem = Form.Item;
const Option = Select.Option;
export default class index extends Component {
  state = {
    dataSource: [],
    selectedRowKeys: [],
    pagination: {},
    isShowEndOrder: false,
    orderInfo: {}
  };
  params = {
    page: 1
  };
  request = () => {
    Axios.ajax({
      url: "/order/list",
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          dataSource: utils.getIncludeKeyPropData(res.result.list),
          pagination: utils.pagination(res, current => {
            this.params.page = current;
            this.request();
          })
        });
      }
    });
  };

  componentDidMount() {
    this.request();
  }
  isSearch = status => {
    if (status) {
      message.success("可以查询");
      this.request();
    } else {
      message.error("不能查询");
    }
    console.log("TCL: index -> isSearch -> status", status);
  };
  rowOnClick = (data, index) => {
    const key = [data.key];
    this.setState({
      selectedRowKeys: key
    });
  };
  handleEndOrder = () => {
    const key = this.state.selectedRowKeys[0];
    if (key) {
      Axios.ajax({
        url: "/order/info",
        data: {
          params: {
            id: key
          }
        }
      }).then(res => {
        if (res.code === 0) {
          this.setState({
            orderInfo: res.result,
            isShowEndOrder: true
          });
        }
      });
    } else {
      message.info("请选择一项订单");
    }
  };
  handleSubmit = () => {
    const key = this.state.selectedRowKeys[0];
    Axios.ajax({
      url: "/order/finish",
      data: {
        params: {
          id: key
        }
      }
    }).then(res => {
      if (res.code === 0) {
        message.success("删除成功");
        this.setState({
          isShowEndOrder: false
        });
        this.request();
      }
    });
  };
  render() {
    const formItemLayout = {
      rowCol: { span: 4 },
      wrappedCol: { span: 8 }
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      selectedRowKeys
    };
    const columns = [
      {
        title: "id",
        dataIndex: "id"
      },
      {
        title: "车辆标识",
        dataIndex: "car_id"
      },
      {
        title: "姓名",
        dataIndex: "name"
      },
      {
        title: "电话",
        dataIndex: "tel"
      },
      {
        title: "状态",
        dataIndex: "status",
        render: data => {
          return data === 1 ? "进行中" : "行程结束";
        }
      },
      {
        title: "时间",
        dataIndex: "open_time"
      },
      {
        title: "金额",
        dataIndex: "cost"
      }
    ];
    return (
      <div>
        <Card>
          <FilterForm isSearch={this.isSearch} />
        </Card>
        <Card>
          <div style={{ marginBottom: 20 }}>
            <Button type="primary" style={{ marginRight: 20 }}>
              订单详情
            </Button>
            <Button type="primary" onClick={this.handleEndOrder}>
              结束订单
            </Button>
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(data, index) => ({
              onClick: () => {
                this.rowOnClick(data, index);
              }
            })}
          />
          <Modal
            title="结束订单"
            visible={this.state.isShowEndOrder}
            onCancel={() => {
              this.setState({ isShowEndOrder: false });
            }}
            onOk={this.handleSubmit}
          >
            <Form layout="inline">
              <FormItem label="车辆编号" {...formItemLayout}>
                {this.state.orderInfo.bike_sn}
              </FormItem>
              <FormItem label="剩余电量" {...formItemLayout}>
                {this.state.orderInfo.battery}
              </FormItem>
              <FormItem label="行程开始时间" {...formItemLayout}>
                {this.state.orderInfo.start_time}
              </FormItem>
              <FormItem label="当前位置" {...formItemLayout}>
                {this.state.orderInfo.location}
              </FormItem>
            </Form>
          </Modal>
        </Card>
      </div>
    );
  }
}

class FilterForm extends Component {
  handleSearch = () => {
    const userInfo = this.props.form.getFieldsValue();
    if (userInfo.start_time) {
      userInfo.start_time = userInfo.start_time.format("YYYY-MM-DD HH:mm:ss");
    }
    if (userInfo.end_time) {
      userInfo.end_time = userInfo.end_time.format("YYYY-MM-DD HH:mm:ss");
    }
    this.props.form.validateFields((error, values) => {
      if (!error) {
        message.info(userInfo.end_time);
        this.props.isSearch(true);
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator("city_id")(
            <Select placeholder="全部" style={{ width: 120 }}>
              <Option value="">全部</Option>
              <Option value="1">成都</Option>
              <Option value="2">深圳</Option>
              <Option value="3">广州</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("start_time", {
            initialValue: moment("2018-08-08 00:00:00"),
            rules: [
              {
                required: true,
                message: "不能为空"
              }
            ]
          })(
            <DatePicker
              placeholder="请选择开始时间"
              format="YYYY-MM-DD HH:mm:ss"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("end_time", {
            initialValue: moment("2018-08-08 00:00:00"),
            rules: [
              {
                required: "true",
                message: "不能为空"
              }
            ]
          })(
            <DatePicker
              placeholder="请选择结束时间"
              format="YYYY-MM-DD HH:mm:ss"
            />
          )}
        </FormItem>
        <FormItem label="订单状态">
          {getFieldDecorator("status")(
            <Select placeholder="全部" style={{ width: 120 }}>
              <Option value="">全部</Option>
              <Option value="1">成都</Option>
              <Option value="2">深圳</Option>
              <Option value="3">广州</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            style={{ marginRight: 20 }}
            onClick={this.handleSearch}
          >
            查询
          </Button>
          <Button type="primary" onClick={this.handleReset}>
            重置
          </Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);
