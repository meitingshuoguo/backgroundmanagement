import React, { Component } from "react";
import { Card, Form, Button, Input, message, Icon, Checkbox } from "antd";
const FormItem = Form.Item;
class login extends Component {
  handleSubmit = () => {
    const userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        message.success(`${userInfo.userName}你的密码是：${userInfo.userPwd}`);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="行内登录表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="用户名" />
            </FormItem>
            <FormItem>
              <Input placeholder="密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="水平登录表单">
          <Form style={{ width: 280 }}>
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "不能为空" }]
              })(<Input prefix={<Icon type="user" />} placeholder="用户名" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("userPwd", {
                rules: [
                  { required: true, message: "不能为空" },
                  {
                    min: 5,
                    max: 10,
                    message: "长度不在范围内"
                  },
                  {
                    pattern: new RegExp("^\\w+$", "g"),
                    message: "密码必须为字母或数字"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="key" />}
                  placeholder="密码"
                  type="password"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("remember", {
                initialValue: true,
                valuePropName: "checked"
              })(<Checkbox>记住密码</Checkbox>)}
              <a href="http://www.google.com" style={{ float: "right" }}>
                忘记密码
              </a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>
                登录
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(login);
