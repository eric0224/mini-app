/**
 * promise 形式的 异步代码
 * @param {object} params 请求的参数
 */
export const request=(params)=>{
    // 公共的url
    const baseUrl="https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url: baseUrl+params.url,
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