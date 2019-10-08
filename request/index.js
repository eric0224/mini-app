/**
 * promise 形式的 异步代码
 * @param {object} params 请求的参数
 */
export const request=(params)=>{
    // 判断要不要带token
    let header={...params.header};
    if(params.url.includes("/my/")){
        header["Authorization"]=wx.getStorageSync("token");
          
    }
    // 发送了几次 被递增几个
    // requestTimes++;
    // wx.showLoading({
    //     title: "加载中",
    //     mask: true
    // });
      
    // 公共的url
    const baseUrl="https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url: baseUrl+params.url,
            header,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}

/**
 * promise 形式的 getSetting
 */
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });  
    })
}
/**
 * promise 形式的 openSetting
 */
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });  
    })
}
/**
 * promise 形式的 chooseAddress
 */
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });  
    })
}

export const showModal=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            ...params,
            success: (res) => {
                resolve(res.confirm);
            }
        });  
    })
}

export const showToast=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            ...params,
            success: (res) => {
                resolve(res);
            }
        });  
    })
}

export const login=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        });
            
    })
}

/**
 * 发起微信支付的API
 * @param {object} pay 支付参数
 */
export const requestPayment=(pay)=>{
    return new Promise((resolve,reject)=>{
       wx.requestPayment({
           ...pay,
           success: (res) => {
            resolve(res)
           },
           fail: (err) => {
            reject(err) 
           }
       });
         
            
    })
}