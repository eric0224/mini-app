// pages/goods_detail/index.js
import {request} from "../../request/index.js"
Page({
  data:{
    goodsObj:{}
  },
  onLoad(opt){
    // console.log(opt)
    this.getGoodsDetail(opt.goods_id)
  },
  getGoodsDetail(goods_id){
    request({
      url:"/goods/detail",
      data:{
        goods_id
      }
    }).then(res=>{
      // console.log(res)
      this.setData({
        goodsObj:res.data.message
      })
    })
  },
  // 点击轮播图
  hadleImagePreview(e){
    const {goodsObj} =this.data
    const urls=goodsObj.pics.map(v=>v.pics_mid_url)
    const current=e.currentTarget.dataset.current
    wx.previewImage({
      current: current,
      urls: urls
    });
      
  },
  // 点击加入购物车
  handleCartAdd(){
    const {goodsObj}=this.data
    let cartList=wx.getStorageSync("carts") || [];
    const index=cartList.findIndex(v=>v.goods_id===goodsObj.goods_id)
    if(index===-1){
      cartList.push({
        goods_id:goodsObj.goods_id,
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        goods_small_logo:goodsObj.goods_small_logo,
        num:1
      })
    }else{
      cartList[index].num++;
    }
    wx.setStorageSync("carts", cartList);
    // 弹出窗口提示用户加入购物车成功
    wx.showToast({
      title: '加入购物车成功',
      mask:true,
      icon: 'success'
    });
      
      
  }
})