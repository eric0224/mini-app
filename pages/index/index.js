
Page({
    data:{
        swiperdata:[],
        catitemsList:[],
        floordata:[]
    },
    onLoad(){
        this.getSwiperData(),
        this.getCatitems(),
        this.getfloorList()
    },
    // 获取轮播图数据
    getSwiperData(){
        wx.request({
            url:'https://api.zbztb.cn/api/public/v1/home/swiperdata',
            success:(res)=>{
                // console.log(res)
                this.setData({
                    swiperdata:res.data.message
                })
            }
        })
    },
    // 获取导航栏
    getCatitems(){
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
            success: (res) => {
                // console.log(res)
                this.setData({
                    catitemsList:res.data.message
                })
            }
        });   
    },
    // 获取楼层数据
    getfloorList(){
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
            success: (res) => {
                // console.log(res)
                this.setData({
                    floordata:res.data.message
                })
            }
        });
          
    }
})
