import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

// pages/cart/index.js
Page({
  data: {
    address: {},
    carts: [],
    allChecked: false,
    totalNum: 0,
    totalPrice: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    const carts = wx.getStorageSync("carts");
    this.setData({
      address,
      carts
    });
    this.countData(carts)
  },
  handleChooseAddress() {
    this.getUserAddress();
    // wx.getSetting({
    //   success: (res) => {
    //     const auth=res.authSetting["scope.address"];
    //     if(auth===false){
    //       wx.openSetting({
    //         success: (res) => {
    //           wx.chooseAddress({
    //             success: (res) => {

    //             }
    //           });
    //         }
    //       });

    //     }else{
    //       wx.chooseAddress({
    //         success: (res) => {

    //         }
    //       });

    //     }
    //   }
    // });

  },
  // 获取用户的收货地址
  async getUserAddress() {
    const res = await getSetting();
    const auth = res.authSetting["scope.address"];
    if (auth === false) {
      await openSetting();
    }
    const res1 = await chooseAddress()
    res1.detailAddress = res1.provinceName + res1.cityName + res1.countyName + res1.detailInfo
    this.setData({
      address: res1
    })
    wx.setStorageSync("address", res1);
  },
  // 计算数据
  countData(carts) {
    let allChecked = true;
    let totalNum = 0;
    let totalPrice = 0;
    carts.forEach((v, i) => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } else {
        allChecked = false;
      }
    });
    allChecked = carts.length === 0 ? false : allChecked;
    this.setData({
      allChecked,
      totalNum,
      totalPrice
    })
  },
  //  商品的单选功能
  handleItemChange(e) {
    const {
      index
    } = e.target.dataset;
    let {
      carts
    } = this.data;
    carts[index].checked = !carts[index].checked;
    this.setData({
      carts
    })
    wx.setStorageSync("carts", carts);
    this.countData(carts)
  },
  //  商品的数量编辑
  async handleNumUpdate(e) {
    const {
      operation,
      index
    } = e.target.dataset;
    let {
      carts
    } = this.data;
    if (operation === -1 && carts[index].num === 1) {
      const res = await showModal({
        title: "警告",
        content: "您确定要删除吗?"
      })
      if (res) {
        carts.splice(index, 1)
      } else {
        return;
      }
    } else {
      carts[index].num += operation;
    }
    this.setData({
      carts
    })
    wx.setStorageSync("carts", carts);
    this.countData(carts)
  },
  // 结算按钮的点击事件
  async handleOrderPay() {
    const {
      totalNum,
      address
    } = this.data
    if (totalNum === 0) {
      await showToast({
        title: "您还没有选购商品",
        icon: 'none',
        mask: true
      })
      return;
    }
    if (address === "") {
      await showToast({
        title: "请选择收货地址",
        icon: 'none',
        mask: true
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
      
  }
})