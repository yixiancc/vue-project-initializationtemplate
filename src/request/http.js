import axios from "axios";
import {Message} from "element-ui";

// 环境的切换
if (import.meta.env.VITE_ENV === "dev") {
    axios.defaults.baseURL = ""; //本地测试
} else if (import.meta.env.VITE_ENV === "prod") {
    axios.defaults.baseURL = ""; //发布版本
}
axios.defaults.timeout = 60000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// 请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.error(error);
    });

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 404:
                    Message({
                        type: "error",
                        message: "网络中断或该请求不存在"
                    });
                    break;

                // 其他错误，直接抛出错误提示
                default:
                    Message({
                        type: "error",
                        message: error.response.data.msg
                    });
                    break;
            }
            return Promise.reject(error.response);
        } else {
            if (error.message.indexOf(JSON.stringify(axios.defaults.timeout)) != -1) {
                Message({
                    type: "error",
                    message: "接口请求时长超过" + axios.defaults.timeout / 1000 + "s"
                });
            } else {
                Message({
                    type: "error",
                    message: "Network Error"
                });
            }
            return Promise.reject(error.message);
        }
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} headers [请求时携带的hearder]
 */
export function get(url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            responseType: headers.responseType ? headers.responseType : "json",
            headers: headers
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} hearder [请求时携带的hearder]
 */
export function post(url, params = "", hearder = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, hearder).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * 不常用的接口方法，对应put,del请求
 * @param {String} type [请求类型，put,delete]
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} hearder [请求时携带的hearder]
 */
export function request(type, url, params = "", hearder = {}) {
    return new Promise((resolve, reject) => {
        axios[type](url, params, hearder).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    });
}
