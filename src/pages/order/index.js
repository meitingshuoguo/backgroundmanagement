import React, { Component } from "react";
import { Button, Card, Table, Form, Modal, message } from "antd";
import Axios from "../../axios";
import utils from "../../utils/utils";
import BaseForm from "../../components/BaseForm";
const FormItem = Form.Item;
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
  formConfig = {
    formList: [
      {
        type: "SELECT",
        label: "城市",
        field: "city_id",
        placeholder: "全部",
        initialValue: "1",
        style: { width: 100 },
        list: [
          { id: "0", name: "全部" },
          { id: "1", name: "成都" },
          { id: "2", name: "深圳" }
        ]
      },
      {
        type: "DATEPICKER",
        label: "开始时间",
        field: "start_time",
        placeholder: "请选择时间",
        rules: [
          {
            required: true,
            message: "不能为空"
          }
        ]
      },
      {
        type: "RANGEPICKER",
        label: "时间范围",
        field: "time",
        showTime: true,
        placeholder: ["开始时间", "结束时间"]
      },
      {
        type: "SELECT",
        label: "订单状态",
        field: "order_status",
        placeholder: "全部",
        initialValue: "1",
        style: { width: 100 },
        list: [
          { id: "0", name: "全部" },
          { id: "1", name: "已完成" },
          { id: "2", name: "进行中" }
        ]
      }
    ]
  };
  request = () => {
    Axios.ajax({
      url: "/order/list",
      data: {
        params: this.params
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
  handleSearch = () => {
    const formData = this.BaseForm.props.form.getFieldsValue();
    this.BaseForm.props.form.validateFields((error, values) => {
      if (!error) {
        this.params = formData;
        this.request();
        console.log("TCL: index -> handleSearch -> formData", formData);
      }
    });
  };
  handleFormReset = () => {
    this.BaseForm.props.form.resetFields();
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
  handleEndOrderSubmit = () => {
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
  handleOrderDetail = () => {
    const key = this.state.selectedRowKeys[0];
    if (key) {
      window.open("/#/common/order/detail/" + key, "_blank");
    } else {
      Modal.info({
        title: "提示",
        content: "请选择一条订单"
      });
    }
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrappedCol: { span: 18 }
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
          <BaseForm
            layout="inline"
            formList={this.formConfig.formList}
            wrappedComponentRef={form => {
              this.BaseForm = form;
            }}
          >
            <FormItem>
              <Button
                type="primary"
                style={{ marginRight: 20 }}
                onClick={this.handleSearch}
              >
                查询
              </Button>
              <Button type="primary" onClick={this.handleFormReset}>
                重置
              </Button>
            </FormItem>
          </BaseForm>
        </Card>
        <Card>
          <div style={{ marginBottom: 20 }}>
            <Button
              type="primary"
              style={{ marginRight: 20 }}
              onClick={this.handleOrderDetail}
            >
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
            onOk={this.handleEndOrderSubmit}
          >
            <Form>
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
