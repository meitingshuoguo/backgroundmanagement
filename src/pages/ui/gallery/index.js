import React, { Component } from "react";
import { Card, Row, Col, Modal } from "antd";
export default class index extends Component {
  state = {
    imgSrc: "",
    visible: false
  };
  openGallery = img => {
    this.setState({
      imgSrc: img,
      visible: true
    });
  };
  render() {
    const imgs = [
      ["1.png", "2.png", "3.png", "4.png"],
      ["5.png", "6.png", "7.png", "8.png"],
      ["9.png", "10.png", "11.png", "12.png"],
      ["13.png", "14.png", "15.png", "16.png"],
      ["17.png", "18.png", "19.png", "20.png"],
      ["21.png", "22.png", "23.png", "24.png"],
      ["25.png"]
    ];
    const imgList = imgs.map(list =>
      list.map((item, i) => (
        <Card
          cover={
            <img
              onClick={() => this.openGallery(item)}
              src={"/gallery/" + item}
              alt="this is gallery img"
            />
          }
          key={i}
        >
          <Card.Meta title="react" description="lalala lol" />
        </Card>
      ))
    );
    return (
      <div>
        <Row gutter={10}>
          {imgs.map((img, index) => (
            <Col key={index} md={4}>
              {imgList[index]}
            </Col>
          ))}
        </Row>
        <Modal
          title="what"
          width="25%"
          visible={this.state.visible}
          footer={null}
          onCancel={() => this.setState({ visible: false })}
        >
          <img
            width="100%"
            src={"/gallery/" + this.state.imgSrc}
            alt="this is gallery"
          />
        </Modal>
      </div>
    );
  }
}
