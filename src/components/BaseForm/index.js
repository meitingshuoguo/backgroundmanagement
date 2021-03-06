import React, { Component } from "react";
import { Input, Select, Checkbox, Radio, DatePicker, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

class BaseForm extends Component {
  layout = this.props.layout || "horizontal";
  formItemLayout = this.props.formItemLayout || {};
  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];
    if (formList && formList.length > 0) {
      formList.forEach(item => {
        let formItem = "";
        let {
          label,
          field,
          initialValue,
          list,
          placeholder,
          style,
          showTime,
          rules,
          inputType,
          disabled
        } = item;

        if (item.type === "SELECT") {
          formItem = (
            <FormItem label={label} key={field} {...this.formItemLayout}>
              {getFieldDecorator(field, {
                initialValue,
                rules
              })(
                <Select
                  disabled={disabled}
                  style={style}
                  placeholder={placeholder}
                >
                  {this.getOptionList(list)}
                </Select>
              )}
            </FormItem>
          );
        } else if (item.type === "INPUT") {
          formItem = (
            <FormItem label={label} key={field} {...this.formItemLayout}>
              {getFieldDecorator(field, {
                initialValue,
                rules
              })(
                <Input
                  disabled={disabled}
                  type={inputType ? inputType : "text"}
                  placeholder={placeholder}
                />
              )}
            </FormItem>
          );
        } else if (item.type === "RADIO") {
          formItem = (
            <FormItem label={label} key={field} {...this.formItemLayout}>
              {getFieldDecorator(field, {
                initialValue,
                rules
              })(
                <RadioGroup disabled={disabled}>
                  {this.getRadioList(list)}
                </RadioGroup>
              )}
            </FormItem>
          );
        } else if (item.type === "CHECKBOX") {
          formItem = (
            <FormItem label={label} key={field} {...this.formItemLayout}>
              {getFieldDecorator(field, {
                valuePropName: "checked",
                initialValue,
                rules
              })(<Checkbox disabled={disabled}>{label}</Checkbox>)}
            </FormItem>
          );
        } else if (item.type === "DATEPICKER") {
          formItem = (
            <FormItem label={label} key={field} {...this.formItemLayout}>
              {getFieldDecorator(field, {
                initialValue,
                rules
              })(<DatePicker showTime={showTime} placeholder={placeholder} />)}
            </FormItem>
          );
        } else if (item.type === "RANGEPICKER") {
          formItem = (
            <FormItem label={label} key={field} {...this.formItemLayout}>
              {getFieldDecorator(field, {
                initialValue,
                rules
              })(<RangePicker showTime={showTime} placeholder={placeholder} />)}
            </FormItem>
          );
        } else if (item.type === "TEXTAREA") {
          formItem = (
            <FormItem label={label} key={field} {...this.formItemLayout}>
              {getFieldDecorator(field, {
                initialValue,
                rules
              })(<TextArea disabled={disabled} />)}
            </FormItem>
          );
        } else {
          console.error("BaseForm：传入未知表单组件类型！");
        }
        formItemList.push(formItem);
      });
    }
    return formItemList;
  };
  getOptionList = list => {
    let options = [];
    if (list && list.length > 0) {
      list.map(item => {
        options.push(
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        );
        return item;
      });
    }
    return options;
  };
  getRadioList = list => {
    let radios = [];
    if (list && list.length > 0) {
      list.map(item => {
        radios.push(
          <Radio value={item.id} key={item.id}>
            {item.name}
          </Radio>
        );
        return item;
      });
    }
    return radios;
  };
  render() {
    return (
      <Form layout={this.layout}>
        {this.initFormList()}
        {this.props.children}
      </Form>
    );
  }
}
export default Form.create({})(BaseForm);
