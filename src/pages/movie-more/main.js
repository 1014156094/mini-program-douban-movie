import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: "更多电影",
    enablePullDownRefresh: true, // 开启下拉刷新
  },
}
