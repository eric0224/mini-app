// import {
//   getSetting,
//   openSetting,
//   chooseAddress,
//   showModal,
//   showToast
// } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { request,requestPayment,showToast } from "../../request/index.js";

// pages/cart/index.js
Page({
  data: {
    address: {},
    carts: [],
    totalNum: 0,
    totalPrice: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    let carts = wx.getStorageSync("carts") || [];
    // 筛选出checked=true数据
    carts=carts.filter(v=>v.checked)
    this.setData({
      address,
      carts
    });
    this.countData(carts)
  },

  // 计算数据
  countData(carts) {

    let totalNum = 0;
    let totalPrice = 0;
    carts.forEach((v, i) => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } 
    });
    this.setData({
      totalNum,
      totalPrice
    })
  },
  // 点击支付按钮
  handleOrderPay(){
    this.orderPay();
    
  },
  // 执行支付的逻辑
  async orderPay(){
    try {
      const token=wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    // 构造订单参数
    const {totalPrice,address,carts}=this.data;
    const order_price=totalPrice;
    const consignee_addr=address.detailAddress;
    const goods=carts.map(v=>{
      return{
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price
      }
    });
    const orderParams={
      order_price,consignee_addr,goods
    },
    // 创建订单
    const {order_number}=await request({url:"/my/orders/create",method:"post",data:orderParams});
    // 获取支付参数
    const {pay}=await request({url:"/my/orders/req_unifidorder",method:"post",data:{order_number}});
    // 调用微信内置的支付
    await requestPayment(pay);
    // 查询订单支付状态
    const {message}=await request({url:"/my/orders/chkOrder",method:"post",data:{order_number}});
    await showToast({title:message,mask:true})
    // 保留未选中的商品
    const localCarts=wx.getStorageSync("carts");
    wx.setStorageSync("carts", localCarts.filter(v=>!v.checked));
      
    wx.navigateTo({
      url: '/pages/order/index'
    }); 
    } catch (error) {
      console.log(error)
    }
  }
})