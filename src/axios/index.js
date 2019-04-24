import JsonP from "jsonp";
import axios from "axios";
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
}
