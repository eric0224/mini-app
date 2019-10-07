// pages/auth/index.js
import {
  login,request
} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  handleGetuserinfo(e){
    this.wxLogin(e);  
  },
//wx4f072b3aff1ad4a3
  // 执行微信登陆
  async wxLogin(e){
    const {code}=await login();
    const {encryptedData,rawData,iv,signature}=e.detail;
    const tokenParam={
      code,encryptedData,rawData,iv,signature
    };
    const res=await request({url:"/users/wxlogin",method:"post",data:tokenParam})
    // console.log(res)
    wx.setStorageSync("token", res.token);
    wx.navigateBack({
      // 返回上一页
      delta: 1
    });
      
      
  }

})