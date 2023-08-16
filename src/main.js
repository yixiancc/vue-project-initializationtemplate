import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {Message} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/base.css";
import {post, get, request} from "./request/http";

Vue.prototype.$message = Message;

Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$request = request;
let bus = new Vue();
Vue.prototype.$bus = bus;

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
