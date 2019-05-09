import React, { Component } from "react";
import { Button, Card, Table, Modal, Tree, Transfer, Form } from "antd";
import utils from "../../utils/utils";
import Axios from "../../axios";
import BaseForm from "../../components/BaseForm";
import menuConfig from "../../config/menuConfig";
const TreeNode = Tree.TreeNode;
export default class index extends Component {
  state = {
    dataSource: [],
    selectedRowKeys: [],
    selectedItem: null,
    showCreateRole: false,
    permissionVisible: false,
    userAuthVisible: false,
    pagination: {},
    checkedKeys: [],
    userAuthDataSource: [],
    userAuthTargetKeys: []
  };
  params = {
    page: 1
  };
  roleFormConfig = {
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
        label: "角色名称",
        type: "INPUT",
        placeholder: "请输入角色名称",
        field: "role_name"
      },
      {
        label: "状态",
        type: "SELECT",
        field: "status",
        initialValue: "1",
        list: [{ id: "1", name: "开启" }, { id: "2", name: "关闭" }]
      }
    ]
  };
  permissionFormConfig = {
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
        label: "角色名称",
        type: "INPUT",
        placeholder: "请输入角色名称",
        field: "role_name",
        disabled: true
      },
      {
        label: "状态",
        type: "SELECT",
        field: "status",
        initialValue: "1",
        list: [{ id: 1, name: "开启" }, { id: 2, name: "关闭" }]
      }
    ]
  };
  userAuthFormConfig = {
    formItemLayout: {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 19
      }
    },
    formList: [
      {
        label: "角色名称",
        type: "INPUT",
        field: "role_name",
        disabled: true
      }
    ]
  };
  request = () => {
    Axios.requestList(this, "/role/list", this.params);
  };
  handleOnRowClick = (data, index) => {
    const keys = [data.key];
    this.setState({
      selectedRowKeys: keys,
      selectedItem: data
    });
  };
  handleCreateRole = () => {
    this.setState({
      showCreateRole: true
    });
  };
  handleRoleSubmit = () => {
    const formData = this.roleForm.props.form.getFieldsValue();
    console.log(formData);
  };
  handlePermissionSubmit = () => {
    let formData = this.permissionForm.props.form.getFieldsValue();
    formData.id = this.state.selectedItem.id;
    formData.permission = this.state.checkedKeys;
    console.log(formData);
  };
  handlePermissionSet = () => {
    let selectedRow = this.state.selectedItem;
    if (selectedRow) {
      this.permissionFormConfig.formList = this.permissionFormConfig.formList.map(
        item => {
          item.initialValue = selectedRow[item.field];
          return item;
        }
      );
      this.setState({
        permissionVisible: true,
        checkedKeys: selectedRow.permission
      });
      console.log(selectedRow);
    } else {
      Modal.info({
        title: "提示",
        content: "请选择一个角色"
      });
    }
  };
  onCheck = checkedKeys => {
    this.setState({
      checkedKeys
    });
  };
  renderTreeNode = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode {...item}>{this.renderTreeNode(item.children)}</TreeNode>
        );
      } else {
        return <TreeNode {...item} />;
      }
    });
  };
  handleUserAuth = () => {
    let selectedRow = this.state.selectedItem;
    if (selectedRow) {
      this.userAuthFormConfig.formList = this.userAuthFormConfig.formList.map(
        item => {
          item.initialValue = selectedRow[item.field];
          return item;
        }
      );
      this.getRoleList(selectedRow.id);
      console.log(selectedRow);
    } else {
      Modal.info({
        title: "提示",
        content: "请选择一个角色"
      });
    }
  };
  getRoleList = id => {
    Axios.ajax({
      url: "/role/user/list",
      data: {
        params: {
          id
        }
      }
    }).then(res => {
      if (res.code === 0) {
        this.getAuthUsers(res.result);
      }
    });
  };
  // 筛选目标用户
  getAuthUsers = data => {
    let dataSource = [];
    let targetKeys = [];
    if (data && data.length > 0) {
      data.forEach(item => {
        let newData = {
          key: item.id,
          title: item.user_name,
          status: item.status
        };
        dataSource.push(newData);
        if (item.status === 1) {
          targetKeys.push(newData.key);
        }
      });
    }
    this.setState({
      userAuthVisible: true,
      userAuthDataSource: dataSource,
      userAuthTargetKeys: targetKeys
    });
  };
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };
  handleUserAuthChange = targetKeys => {
    this.setState({
      userAuthTargetKeys: targetKeys
    });
  };
  handleUserAuthSubmit = () => {
    let data = {};
    data.user_ids = this.state.userAuthTargetKeys;
    data.role_ids = this.state.selectedItem.id;
    console.log(data);
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
        title: "角色ID",
        dataIndex: "id"
      },
      {
        title: "角色名称",
        dataIndex: "role_name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time"
      },
      {
        title: "使用状态",
        dataIndex: "status",
        render: data => {
          return data === 1 ? "开启" : "关闭";
        }
      },
      {
        title: "授权时间",
        dataIndex: "authorization_time",
        render: data => {
          return utils.formatDate(data);
        }
      },
      {
        title: "授权人",
        dataIndex: "authorization_name"
      }
    ];
    return (
      <div>
        <Card>
          <div className="btn-area">
            <Button type="primary" onClick={this.handleCreateRole}>
              创建角色
            </Button>
            <Button type="primary" onClick={this.handlePermissionSet}>
              设置权限
            </Button>
            <Button type="primary" onClick={this.handleUserAuth}>
              用户授权
            </Button>
          </div>
          <Table
            columns={columns}
            rowSelection={rowSelection}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
            bordered
            onRow={(data, index) => ({
              onClick: () => {
                this.handleOnRowClick(data, index);
              }
            })}
          />
        </Card>
        <Modal
          title="创建角色"
          visible={this.state.showCreateRole}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.setState({
              showCreateRole: false
            });
          }}
        >
          <BaseForm
            formList={this.roleFormConfig.formList}
            formItemLayout={this.roleFormConfig.formItemLayout}
            wrappedComponentRef={form => {
              this.roleForm = form;
            }}
          />
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.permissionVisible}
          onOk={this.handlePermissionSubmit}
          onCancel={() => {
            this.setState({
              permissionVisible: false
            });
          }}
        >
          <BaseForm
            formList={this.permissionFormConfig.formList}
            formItemLayout={this.permissionFormConfig.formItemLayout}
            wrappedComponentRef={form => {
              this.permissionForm = form;
            }}
          >
            <Tree
              checkable
              defaultExpandAll
              checkedKeys={this.state.checkedKeys}
              onCheck={checkedKeys => {
                this.onCheck(checkedKeys);
              }}
            >
              <TreeNode title="平台权限" key="permission_all">
                {this.renderTreeNode(menuConfig)}
              </TreeNode>
            </Tree>
          </BaseForm>
        </Modal>
        <Modal
          width={600}
          title="用户授权"
          visible={this.state.userAuthVisible}
          onOk={this.handleUserAuthSubmit}
          onCancel={() => {
            this.setState({
              userAuthVisible: false
            });
          }}
        >
          <BaseForm
            formList={this.userAuthFormConfig.formList}
            formItemLayout={this.userAuthFormConfig.formItemLayout}
            wrappedComponentRef={form => {
              this.userAuthForm = form;
            }}
          >
            <Form.Item
              label="用户授权"
              {...this.userAuthFormConfig.formItemLayout}
            >
              <Transfer
                listStyle={{ width: 195, height: 400 }}
                dataSource={this.state.userAuthDataSource}
                titles={["待选用户", "已选用户"]}
                showSearch
                filterOption={this.filterOption}
                targetKeys={this.state.userAuthTargetKeys}
                render={item => item.title}
                onChange={this.handleUserAuthChange}
              />
            </Form.Item>
          </BaseForm>
        </Modal>
      </div>
    );
  }
}
