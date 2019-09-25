// components/Tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbarData:{
      type:Array,
      value:[]
    },
    currentIndex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e){
      const {index}=e.target.dataset
      this.triggerEvent("itemChange",{index})
    }
  }
})
