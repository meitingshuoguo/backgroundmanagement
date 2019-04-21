import React, { Component } from "react";
import {
  Card,
  Form,
  Button,
  Input,
  Checkbox,
  Radio,
  Select,
  DatePicker,
  TimePicker,
  Upload,
  InputNumber,
  Switch,
  Icon
} from "antd";
import moment from "moment";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
class register extends Component {
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  state = {
    imageUrl: ""
  };
  handleUpload = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };
  handleSubmit = () => {
    const userInfo = this.props.form.getFieldsValue();
    if (userInfo.birthday) {
      userInfo.birthday = userInfo.birthday.format("YYYY/MM/DD");
    }
    console.log("TCL: register -> handleSubmit -> userInfo", userInfo);
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 3
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    };
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 3
        }
      }
    };
    return (
      <div>
        <Card title="注册">
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "不能为空" }]
              })(<Input />)}
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {getFieldDecorator("pwd", {
                rules: [{ required: true, message: "不能为空" }]
              })(<Input type="password" />)}
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {getFieldDecorator("gender", {
                rules: [{ required: true, message: "不能为空" }]
              })(
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {getFieldDecorator("age", {
                initialValue: 18
              })(<InputNumber />)}
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {getFieldDecorator("status", {
                initialValue: "1"
              })(
                <Select>
                  <Option value="1">单身</Option>
                  <Option value="2">恋爱</Option>
                  <Option value="3">结婚</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {getFieldDecorator("hobby", {
                initialValue: ["1", "3"]
              })(
                <Select mode="multiple">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {getFieldDecorator("isMarried", {
                initialValue: true,
                valuePropName: "checked"
              })(<Switch />)}
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {getFieldDecorator("birthday", {
                initialValue: moment("2018-08-08")
              })(<DatePicker format="YYYY/MM/DD" />)}
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {getFieldDecorator("address", {
                initialValue: "xx"
              })(<TextArea autosize={{ minRows: 3, maxRows: 5 }} />)}
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {getFieldDecorator("morningTime", {
                initialValue: moment("06:00:00", "HH:mm:ss")
              })(<TimePicker placeholder="" />)}
            </FormItem>
            <FormItem label="上传头像" {...formItemLayout}>
              {getFieldDecorator("uploadImg")(
                <Upload
                  onChange={this.handleUpload}
                  listType="picture-card"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                >
                  {this.state.imageUrl ? (
                    <img src={this.state.imageUrl} alt="img" />
                  ) : (
                    <Icon type="plus" />
                  )}
                </Upload>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              {getFieldDecorator("agree", {})(
                <Checkbox>
                  我已阅读过
                  <a href="http://www.google.com">协议</a>
                </Checkbox>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>
                注册
              </Button>
              <Button type="primary" onClick={this.handleReset}>
                重置
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(register);
