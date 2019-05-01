import React, { Component } from "react";
import { Card, Button, Form, message, Table, Modal } from "antd";
import BaseForm from "../../components/BaseForm";
import Axios from "../../axios";
const FormItem = Form.Item;
export default class index extends Component {
  state = {
    dataSource: [],
    selectedRowKeys: [],
    pagination: {},
    type: "",
    title: "",
    isVisible: false
  };
  params = {
    page: 1
  };
  formConfig = {
    formList: [
      {
        type: "INPUT",
        field: "loginName",
        placeholder: "请输入用户名",
        rules: [
          {
            required: true,
            message: "不能为空"
          }
        ]
      },
      {
        type: "INPUT",
        field: "pwd",
        placeholder: "请输入密码",
        inputType: "password",
        rules: [
          {
            required: true,
            message: "不能为空"
          }
        ]
      }
    ]
  };
  userFormConfig = {
    formItemLayout: {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    },
    formList: [
      {
        label: "姓名",
        type: "INPUT",
        field: "name",
        placeholder: "请输入姓名",
        rules: [
          {
            required: true,
            message: "不能为空"
          }
        ]
      },
      {
        label: "性别",
        type: "RADIO",
        field: "sex",
        rules: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        list: [{ id: "1", name: "男" }, { id: "2", name: "女" }]
      },
      {
        label: "状态",
        type: "SELECT",
        field: "status",
        initialValue: "1",
        rules: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        list: [{ id: "1", name: "状态1" }, { id: "2", name: "状态2" }]
      },
      {
        label: "生日",
        type: "DATEPICKER",
        field: "birthday",
        rules: [
          {
            required: true,
            message: "不能为空"
          }
        ]
      },
      {
        label: "联系地址",
        type: "TEXTAREA",
        field: "address"
      }
    ]
  };
  handleLogin = () => {
    const form = this.loginForm.props.form;
    let data = form.getFieldsValue();
    form.validateFields((err, value) => {
      if (!err) {
        // ajax
        console.log(data);
      }
    });
  };
  onRowClick = (data, index) => {
    const selectedRowKeys = [data.key];
    this.setState({
      selectedRowKeys
    });
  };
  request = () => {
    Axios.requestList(this, "/table/list", this.params);
  };
  handleUserOperate = (type, e) => {
    if (type === "add") {
      this.setState({
        type,
        title: "创建员工",
        isVisible: true
      });
    } else if (type === "edit") {
    } else if (type === "detail") {
    } else if (type === "delete") {
    }
  };
  handleSubmit = () => {
    const form = this.userForm.props.form;
    let data = form.getFieldsValue();
    form.validateFields((err, value) => {
      if (!err) {
        // ajax
        this.setState({
          isVisible: false
        });
        this.userForm.props.form.resetFields();
        console.log(value);
      }
    });
  };
  handleCancel = () => {
    this.setState({
      isVisible: false
    });
  };
  componentDidMount() {
    this.request();
  }
  render() {
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
        title: "用户名",
        dataIndex: "name"
      },
      {
        title: "时间",
        dataIndex: "time"
      },
      {
        title: "地址",
        dataIndex: "address"
      }
    ];
    return (
      <div>
        <Card>
          <BaseForm
            layout="inline"
            formList={this.formConfig.formList}
            wrappedComponentRef={form => {
              this.loginForm = form;
            }}
          >
            <FormItem>
              <Button type="primary" onClick={this.handleLogin}>
                登录
              </Button>
            </FormItem>
          </BaseForm>
        </Card>
        <Card>
          <div className="btn-area">
            <Button
              type="primary"
              icon="plus"
              onClick={() => this.handleUserOperate("add")}
            >
              创建员工
            </Button>
            <Button
              type="primary"
              onClick={() => this.handleUserOperate("edit")}
            >
              编辑员工
            </Button>
            <Button
              type="primary"
              onClick={() => this.handleUserOperate("detail")}
            >
              员工详情
            </Button>
            <Button
              type="danger"
              icon="delete"
              onClick={() => this.handleUserOperate("delete")}
            >
              删除员工
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(data, index) => ({
              onClick: () => {
                this.onRowClick(data, index);
              }
            })}
          />
        </Card>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <BaseForm
            formList={this.userFormConfig.formList}
            formItemLayout={this.userFormConfig.formItemLayout}
            wrappedComponentRef={form => {
              this.userForm = form;
            }}
          />
        </Modal>
      </div>
    );
  }
}
