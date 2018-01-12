/*
 * @Author: 我家的小强 
 * @Date: 2018-01-12 11:06:20 
 * @Last Modified by: 我家的小强
 * @Last Modified time: 2018-01-12 16:05:03
 */
//1.导入第三方包
import Vue from "vue";
//导入自己写的东西
import App from "./component/App.vue";

//把根组件渲染到指定视图
new Vue({
  el:"#app",
  render: function (createElement) {
    return createElement(App);
  }
})