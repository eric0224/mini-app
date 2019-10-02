import {
  request
} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarData: [{
        id: 0,
        text: "综合"
      },
      {
        id: 1,
        text: "销量"
      },
      {
        id: 2,
        text: "价格"
      }
    ],
    currentIndex: 0,
    goodsList: []
  },
  // 请求参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  TotalPages: 1,
  handleitemChange(e) {
    // console.log(e)
    this.setData({
      currentIndex: e.detail.index
    })
  },
  onLoad(options) {
    // console.log(options)
    const {
      cid
    } = options
    this.QueryParams.cid = cid
    this.getGoodsList()
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    })
    const newGoodsList = res.data.message.goods;
    // 旧数组
    const beforeGoodsList = this.data.goodsList;
    const total = res.data.message.total;
    // 计算总页数
    this.TotalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...newGoodsList, ...beforeGoodsList]
    })
    // 关闭下拉刷新事件
    wx.stopPullDownRefresh()
  },

  // 滚动条触底事件
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.TotalPages) {
      wx.showToast({
        title: '不要再滑动了',
        icon: 'none'
      });
      this.setData({
        isNoMore: true
      })
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 页面下拉刷新事件
  onPullDownRefresh() {
    this.QueryParams.pagenum = 1;
    this.setData({
      goodsList: []
    })
    this.getGoodsList();
  }
})