// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    menuList:[],
    goodsList:[]
  },
  Cates:[],
  onLoad(){
    this.getCates()
  },
  getCates(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/categories',
      success: (res) => {
        this.Cates=res.data.message
        const menuList=this.Cates.map(v=>v.cat_name)
        // console.log(this.menuList)
        const goodsList=this.Cates[0].children
        // console.log(goodsList)
        this.setData({
          menuList,
          goodsList
        })
      }
    });
      
  },
  handleMenuTap(e){
    const {index}=e.target.dataset
    const goodsList=this.Cates[index].children
    this.setData({
      currentIndex:index,
      goodsList
    })
  }
})