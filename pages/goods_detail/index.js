// pages/goods_detail/index.js
import {
  request,showToast
} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data: {
    goodsObj: {},
    isCollect:false
  },
  onLoad(opt) {
    // console.log(opt)
    this.getGoodsDetail(opt.goods_id);
  },
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    })
    this.setData({
      goodsObj: res.data.message
    })

    const {goodsObj}=this.data
    let collect=wx.getStorageSync("collect") ||[];
    const index=collect.findIndex(v=>v.goods_id===goodsObj.goods_id);
    this.setData({
      isCollect:index=== -1 ? false : true
    })
  },
  // 点击轮播图
  hadleImagePreview(e) {
    const {
      goodsObj
    } = this.data
    const urls = goodsObj.pics.map(v => v.pics_mid_url)
    const current = e.currentTarget.dataset.current
    wx.previewImage({
      current: current,
      urls: urls
    });

  },
  // 点击加入购物车
  handleCartAdd() {
    const {
      goodsObj
    } = this.data
    let cartList = wx.getStorageSync("carts") || [];
    const index = cartList.findIndex(v => v.goods_id === goodsObj.goods_id)
    if (index === -1) {
      cartList.push({
        goods_id: goodsObj.goods_id,
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_small_logo: goodsObj.goods_small_logo,
        num: 1,
        checked:true
      })
    } else {
      cartList[index].num++;
    }
    wx.setStorageSync("carts", cartList);
    // 弹出窗口提示用户加入购物车成功
    wx.showToast({
      title: '加入购物车成功',
      mask: true,
      icon: 'success'
    });
  },
  // 点击收藏按钮
  async handleCartAdd(){
    const {goodsObj}=this.data
    let collect=wx.getStorageSync("collect") ||[];
    const index=collect.findIndex(v=>v.goods_id===goodsObj.goods_id);
    if(index===-1){
      collect.push(goodsObj)
      await showToast({title:"收藏成功"})
    }else{
      collect.splice(index,1)
      await showToast({title:"取消收藏"})
      this.setData({
        isCollect:false
      })
    } 
    wx.setStorageSync("collect", collect);

  }
})