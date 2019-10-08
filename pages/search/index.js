// pages/search/index.js
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import {
  request
} from "../../request/index.js";
Page({
  data: {
    list: [],
    isFocus: false,
    inpValue: ""
  },
  thisID: -1,
  handleInput(e) {
    // console.log(e.detail.value)
    const {
      value
    } = e.detail;
    if (value.trim()) {
      this.setData({
        isFocus: true
      })
      chearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.getQueryList(value)
      }, 1000)

    }
  },
  async getQueryList(value) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query: value
      }
    })
    this.setData({
      list: res
    })
  },
  handleCancel() {
    this.setData({
      list: [],
      isFocus: false,
      inpValue: ""
    })
  }
})