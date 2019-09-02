// pages/detail/detail.js
let datas=require('../../datas/list-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailobj:{},
    index:null,
    isCollected:false
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
   let index=options.index;
   this.setData({
     detailobj:datas.list_data[index],
     index
   });
   let detailStorage = wx.detailStorageSync('isCollected');
   if (!detailStorage){
     wx.setStorageSync('isCollected',{});
   }
   if (detailStorage[index]){
     this.setData({
       isCollected:true
     })
   }
  },
  handlecollection(){
    let isCollected =!this.data.isCollected;
    this.setData({
      isCollected
    });
  
  let title= isCollected?'收藏成功':'取消收藏';
  wx.showToast({
    title,
    icon:'success'
  });
  let [index] = this.data;
  wx.setStorage({
    key: 'isCollected',
    success: (datas) => {
      let obj = datas.data;
      obj[index] = isCollected;
      wx.setStorage({
        key: 'isCollected',
        data: obj,
        success: () => {
        }
      })
    }
  })
  
  },
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈','分享到qq空间','分享到微博'
      ]
    })
  }
})