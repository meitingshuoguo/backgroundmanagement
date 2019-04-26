import React, { Component } from "react";
import { Row } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style/common.less";

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Row className="simple-page">
          <Header menuType="second" />
        </Row>
        <Row className="content">
          {this.props.children}
          <Footer />
        </Row>
      </div>
    );
  }
}
