import {
    request
} from "../../request/index.js"
Page({
    data: {
        swiperdata: [],
        catitemsList: [],
        floordata: []
    },
    onLoad() {
        this.getSwiperData(),
            this.getCatitems(),
            this.getfloorList()
    },
    // 获取轮播图数据
    getSwiperData() {
        request({
            url: '/home/swiperdata',
        }).then(res => {
            this.setData({
                swiperdata: res.data.message
            })
        })
    },
    // 获取导航栏
    getCatitems() {
        request({
            url: '/home/catitems',
        }).then(res => {
            this.setData({
                catitemsList: res.data.message
            })
        })
    },
    // 获取楼层数据
    getfloorList() {
        request({
            url: '/home/floordata',
        }).then(res => {
            this.setData({
                floordata: res.data.message
            })
        })
    }
})