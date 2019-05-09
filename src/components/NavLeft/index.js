import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import "./index.less";
import MenuConfig from "./../../config/menuConfig";
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup
export default class Navleft extends Component {
  state = {
    currentUrl: ""
  };
  componentWillMount() {
    const currentUrl = window.location.hash.replace(/#|\?.*$/g, "");
    const menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode,
      currentUrl
    });
  }
  handleClick = item => {
    this.setState({
      currentUrl: item.key
    });
  };
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}> {item.title} </NavLink>
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1> Imooc MS </h1>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.currentUrl]}
          mode="vertical"
          theme="dark"
        >
          {this.state.menuTreeNode}
          {/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                                        <MenuItemGroup title="Item 1">
                                            <Menu.Item key="1">Option 1</Menu.Item>
                                            <Menu.Item key="2">Option 2</Menu.Item>
                                        </MenuItemGroup>
                                        <MenuItemGroup title="Iteom 2">
                                            <Menu.Item key="3">Option 3</Menu.Item>
                                            <Menu.Item key="4">Option 4</Menu.Item>
                                        </MenuItemGroup>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                                        <Menu.Item key="5">Option 5</Menu.Item>
                                        <Menu.Item key="6">Option 6</Menu.Item>
                                        <SubMenu key="sub3" title="Submenu">
                                            <Menu.Item key="7">Option 7</Menu.Item>
                                            <Menu.Item key="8">Option 8</Menu.Item>
                                        </SubMenu>
                                    </SubMenu>
                                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                                        <Menu.Item key="9">Option 9</Menu.Item>
                                        <Menu.Item key="10">Option 10</Menu.Item>
                                        <Menu.Item key="11">Option 11</Menu.Item>
                                        <Menu.Item key="12">Option 12</Menu.Item>
                                    </SubMenu> */}
        </Menu>
      </div>
    );
  }
}
