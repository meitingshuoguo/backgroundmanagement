import React, { Component } from "react";
import { Card, Carousel } from "antd";
import "./../ui.less";
export default class index extends Component {
  render() {
    return (
      <div>
        <Card title="文字背景轮播">
          <Carousel autoplay={true} autoplaySpeed={2000}>
            <div>
              <h3>ant1</h3>
            </div>
            <div>
              <h3>ant2</h3>
            </div>
            <div>
              <h3>ant3</h3>
            </div>
            <div>
              <h3>ant4</h3>
            </div>
          </Carousel>
        </Card>
        <Card title="图片背景轮播">
          <Carousel autoplay={true}>
            <div>
              <img src="/carousel-img/carousel-1.jpg" alt="" />
            </div>
            <div>
              <img src="/carousel-img/carousel-2.jpg" alt="" />
            </div>
            <div>
              <img src="/carousel-img/carousel-3.jpg" alt="" />
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}
