import React, { Component } from "react";
import { Button, Card, Table, Form, Select, Modal, message } from "antd";
import Axios from "../../axios";
import utils from "../../utils/utils";

const FormItem = Form.Item;
const Option = Select.Option;

export default class index extends Component {
  state = {
    dataSource: [],
    pagination: {},
    isShowOpenCity: false
  };
  params = {
    page: 1
  };
  request = () => {
    const _this = this;
    Axios.ajax({
      url: "/city/list",
      data: {
        params: _this.params.page
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          dataSource: utils.getIncludeKeyPropData(res.result.list),
          pagination: utils.pagination(res, current => {
            _this.params.page = current;
            _this.request();
          })
        });
      }
    });
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
          <FilterForm />
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
          <OpenCityForm
            wrappedComponentRef={form => {
              this.openCityForm = form;
            }}
          />
        </Modal>
      </div>
    );
  }
}

class FilterForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="inline">
          <FormItem label="城市">
            {getFieldDecorator("city_id")(
              <Select style={{ width: 100 }} placeholder="全部">
                <Option value="">全部</Option>
                <Option value="1">成都</Option>
                <Option value="2">杭州</Option>
                <Option value="3">深圳</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="用车模式">
            {getFieldDecorator("model")(
              <Select style={{ width: 140 }} placeholder="全部">
                <Option value="">全部</Option>
                <Option value="1">指定停车点模式</Option>
                <Option value="2">禁停区模式</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="营运模式">
            {getFieldDecorator("op_model")(
              <Select style={{ width: 100 }} placeholder="全部">
                <Option value="">全部</Option>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="加盟商授权状态">
            {getFieldDecorator("auth_status")(
              <Select style={{ width: 100 }} placeholder="全部">
                <Option value="">全部</Option>
                <Option value="1">已授权</Option>
                <Option value="2">未授权</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="城市">
            <Button type="primary" style={{ marginRight: 20 }}>
              查询
            </Button>
            <Button>重置</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 8
      }
    };
    return (
      <Form>
        <FormItem label="选择城市" {...formItemLayout}>
          {getFieldDecorator("city_id", {
            initialValue: "1"
          })(
            <Select placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">成都</Option>
              <Option value="2">杭州</Option>
              <Option value="3">深圳</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="营运模式" {...formItemLayout}>
          {getFieldDecorator("op_model", {
            initialValue: "1"
          })(
            <Select>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
          {getFieldDecorator("model", {
            initialValue: "1"
          })(
            <Select>
              <Option value="1">指定停车点</Option>
              <Option value="2">禁停区</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}
OpenCityForm = Form.create({})(OpenCityForm);
