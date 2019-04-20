import React, { Component } from "react";
import { Row, Col } from "antd";
import "./index.less";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <Row>
          <Col span={24}> & copy; footer </Col>
        </Row>
      </footer>
    );
  }
}
