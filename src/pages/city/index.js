import React, { Component } from "react";
import { Button, Card, Table, Form, Modal, message } from "antd";
import Axios from "../../axios";
import utils from "../../utils/utils";
import BaseForm from "../../components/BaseForm";

const FormItem = Form.Item;

export default class index extends Component {
  state = {
    dataSource: [],
    pagination: {},
    isShowOpenCity: false
  };
  params = {
    page: 1
  };
  formConfig = {
    formItemLayout: {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 8
      }
    },
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
        type: "SELECT",
        label: "用车模式",
        field: "model",
        placeholder: "全部",
        initialValue: "1",
        style: { width: 140 },
        list: [
          { id: "0", name: "全部" },
          { id: "1", name: "指定停车点模式" },
          { id: "2", name: "禁停区模式" }
        ]
      },
      {
        type: "SELECT",
        label: "营运模式",
        field: "op_model",
        placeholder: "全部",
        initialValue: "1",
        style: { width: 100 },
        list: [
          { id: "0", name: "全部" },
          { id: "1", name: "自营" },
          { id: "2", name: "加盟" }
        ]
      },
      {
        type: "SELECT",
        label: "加盟商授权状态",
        field: "auth_status",
        placeholder: "全部",
        initialValue: "1",
        style: { width: 100 },
        list: [
          { id: "0", name: "全部" },
          { id: "1", name: "已授权" },
          { id: "2", name: "未授权" }
        ]
      }
    ]
  };
  request = () => {
    Axios.requestList(this, "/city/list", this.params);
  };
  handleSearch = () => {
    const formData = this.BaseForm.props.form.getFieldsValue();
    this.params = formData;
    this.request();
  };
  handleFormReset = () => {
    this.BaseForm.props.form.resetFields();
  };
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    });
  };
  handleSubmit = () => {
    const form = this.openCityForm.props.form.getFieldsValue();
    Axios.ajax({
      url: "/city/open",
      data: {
        params: form
      }
    }).then(res => {
      if (res.code === 0) {
        message.success(res.result);
        this.setState({
          isShowOpenCity: false
        });
        this.request();
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
        dataIndex: "id"
      },
      {
        title: "名称",
        dataIndex: "name"
      },
      {
        title: "用车模式",
        dataIndex: "model",
        render: data => {
          return data === 1 ? "停车点" : "禁停区";
        }
      },
      {
        title: "营运模式",
        dataIndex: "op_model"
      },
      {
        title: "授权加盟商",
        dataIndex: "franchisee_name"
      },
      {
        title: "城市管理员",
        dataIndex: "city_admins",
        render: data => {
          return data
            .map(item => {
              return item.user_name;
            })
            .join("，");
        }
      },
      {
        title: "城市开通时间",
        dataIndex: "open_time"
      },
      {
        title: "更新时间",
        dataIndex: "update_time",
        render: data => {
          return utils.formatDate(data);
        }
      },
      {
        title: "操作人",
        dataIndex: "sys_user_name"
      }
    ];
    return (
      <div>
        <Card>
          <BaseForm
            formList={this.formConfig.formList}
            layout={"inline"}
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
              <Button type="default" onClick={this.handleFormReset}>
                重置
              </Button>
            </FormItem>
          </BaseForm>
        </Card>
        <Card style={{ marginBottom: -15 }}>
          <Button type="primary" onClick={this.handleOpenCity}>
            开通城市
          </Button>
        </Card>
        <Card style={{ borderTop: "none" }}>
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={this.state.pagination}
          />
        </Card>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({ isShowOpenCity: false });
          }}
          onOk={this.handleSubmit}
        >
          <BaseForm
            formList={this.formConfig.formList}
            formItemLayout={this.formConfig.formItemLayout}
            wrappedComponentRef={form => {
              this.openCityForm = form;
            }}
          />
        </Modal>
      </div>
    );
  }
}
