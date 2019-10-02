// pages/category/index.js
import {
  request
} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    currentIndex: 0,
    menuList: [],
    goodsList: []
  },
  Cates: [],
  onLoad() {
    this.loadData()
  },
  loadData() {
    const loadCate = wx.getStorageSync("cates");
    if (loadCate) {
      if (Date.now() - loadCate.time > 1000 * 30) {
        this.getCates()
      } else {
        this.Cates = loadCate.data
        const menuList = this.Cates.map(v => v.cat_name)
        const goodsList = this.Cates[0].children
        this.setData({
          menuList,
          goodsList
        })
      }
    } else {
      this.getCates()
    }

  },
  async getCates() {
    const res = await request({
      url: '/categories'
    })
    this.Cates = res.data.message
    const menuList = this.Cates.map(v => v.cat_name)
    // console.log(this.menuList)
    const goodsList = this.Cates[0].children
    // console.log(goodsList)
    wx.setStorageSync("cates", {
      data: this.Cates,
      time: Date.now()
    });
    this.setData({
      menuList,
      goodsList
    })

  },
  handleMenuTap(e) {
    const {
      index
    } = e.target.dataset
    const goodsList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      goodsList,
      scrollTop: 0
    })
  }
})