import React, { Component } from "react";
import { Card } from "antd";
import "./detail.less";
import Axios from "../../axios";
export default class detail extends Component {
  state = {
    infoData: {}
  };
  request = () => {
    Axios.ajax({
      url: "/order/info",
      data: {
        params: {
          id: ""
        }
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          infoData: res.result
        });
        console.log("TCL: detail -> request -> res.result", res.result);
      }
    });
  };
  renderMap = () => {
    const map = new window.BMap.Map("order-map");
    const point = new window.BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    window.setTimeout(function() {
      map.panTo(new window.BMap.Point(116.409, 39.918));
    }, 2000);

    const top_left_navigation = new window.BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_LEFT,
      type: window.BMAP_NAVIGATION_CONTROL_SMALL
    }); //右上角，仅包含平移和缩放按钮
    map.enableScrollWheelZoom();
    map.addControl(top_left_navigation);
  };
  componentDidMount() {
    const orderId = this.props.match.params.orderId;
    if (orderId) {
      this.request();
    }
    this.renderMap();
  }
  render() {
    const { id, bike_sn, battery, location } = this.state.infoData;
    return (
      <div>
        <Card>
          <div id="order-map" />
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-title">ID</div>
                <div className="detail-form-content">{id}</div>
              </li>
              <li>
                <div className="detail-form-title">自行车编号</div>
                <div className="detail-form-content">{bike_sn}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">其他信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-title">电量</div>
                <div className="detail-form-content">{battery}</div>
              </li>
              <li>
                <div className="detail-form-title">位置</div>
                <div className="detail-form-content">{location}</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}
