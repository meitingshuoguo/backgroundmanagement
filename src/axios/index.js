import JsonP from "jsonp";
import axios from "axios";
import utils from "../utils/utils";
import { Modal } from "antd";
export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(
        options.url,
        {
          param: "callback"
        },
        function(err, response) {
          if (response.status === "success") {
            resolve(response);
          } else {
            reject(response.message);
          }
        }
      );
    });
  }
  static ajax(options) {
    let loading = document.getElementById("ajaxLoading");
    if (options.data && options.data.isShowLoading !== false) {
      loading.style.display = "block";
    }
    let baseURL = "https://easy-mock.com/mock/5cbe8c2f562d3c66b9c354ea/mockapi";
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        baseURL,
        method: "get",
        timeout: 5000,
        params: (options.data && options.data.params) || ""
      }).then(response => {
        loading.style.display = "none";
        if (response.status === 200) {
          let res = response.data;
          if (res.code === 0) {
            resolve(res);
          } else {
            Modal.info({
              title: "提示",
              content: res.msg
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }
  static requestList(_this, url, params) {
    let data = {
      params
    };
    this.ajax({
      url,
      data
    }).then(res => {
      if (res.code === 0) {
        _this.setState({
          dataSource: utils.getIncludeKeyPropData(res.result.list),
          pagination: utils.pagination(res, current => {
            _this.params.page = current;
            this.requestList();
          })
        });
      }
    });
  }
}
