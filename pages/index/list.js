// pages/index/mulu.js
let imgurl = "https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj";
let imagejs = require('../../template/image.js');
Page(Object.assign({
  
  /**
   * 页面的初始数据
   */
  data: {
    word: "cf", //搜索的内容
    page: 1, //加载第几页
    row: 30, //每页加载的条目数
    //存放图片的imgs对象
    imgs: {
      left:[],
      right:[]
    },
    //存放图片高度图像
    height:{
      left:0,
      right:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.word = "CF" + options.q;
    this.serchData();
  },
  //查询数据
  serchData(){
    this.query()
      .then((res) => {
        let condeData = this.codeData(res.data.data);
        this.showData(condeData);
      });
  },
  //打包url，保持接口的粒度，一个功能是通过多个接口合并而成
  codeUrl(){
    let codeurl = imgurl
    //搜索的关键字
    + "&word=" + this.data.word
    //从第几条数据开始获取 1*30-30=0 / 2*30-30=30
    + "&pn=" + (this.data.page * this.data.row - this.data.row)
    + "&rn=" + this.data.row;
    return codeurl;
  },
  //请求方法
  query() {
    let queryUrl = this.codeUrl();
    return new Promise((resolve, reject) => {
      wx.request({
        url: queryUrl,
        success: resolve,
        fail: reject
      })
    })
  },
  //打包数据
  codeData(data){
    //定义空数组存放数据
    let codedata = [];
    data.forEach( (img) => {
      //判断对象不为空
      if(img.objURL){
        //添加需要的数据至空数组
        codedata.push(Object.assign({
          thumb: img.thumbURL,//小图
          middle: img.middleURL,//中图
          obj: img.objURL//加密后的大图
        }, this.zoom(img)))
      }
    })
    return codedata;
  },
  //数据筛选
  showData(data){
    data.forEach( (img) => {
      //若左列图片高度小于右列图片高度，则添加左列
      if(this.data.height.left <= this.data.height.right){
        this.data.imgs.left.push(img);
        this.data.height.left += img.height;
      }else{
        this.data.imgs.right.push(img);
        this.data.height.right += img.height;
      }
    })
    //数据更新
    this.setData({
      imgs: this.data.imgs
    })
  },
  //固定宽度
  zoom(img){
    let zom = 100/img.width;
    return{
      width: img.width * zom,
      height: img.height * zom
    }
  },
  lower(){
    this.data.page++;
    this.serchData();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}, imagejs))