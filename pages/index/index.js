import {
    request
} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
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
    async getSwiperData() {
        const res = await request({
            url: '/home/swiperdata',
        })
        this.setData({
            swiperdata: res.data.message
        })

    },
    // 获取导航栏
    async getCatitems() {
        const res = await request({
            url: '/home/catitems',
        })
        this.setData({
            catitemsList: res.data.message
        })
    },
    // 获取楼层数据
    async getfloorList() {
        const res = await request({
            url: '/home/floordata',
        })
        this.setData({
            floordata: res.data.message
        })
    }
})