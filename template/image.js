function download(e){
  let src = e.currentTarget.dataset.src;
  //下载文件到本地
  wx.downloadFile({
    url: src,
    success(res) {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      if (res.statusCode === 200) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          //临时文件路径--res.tempFilePath
          filePath: res.tempFilePath
          //永久文件路径
          // filePath: '/images/download1.png'
        })
      }
    }
  })
}

//点击查看大图
function look(e){
  let middle = e.currentTarget.dataset.middle;
  let urls = [...this.data.imgs.left,...this.data.imgs.right].map(item => item.middle);
  wx.previewImage({
    current: middle, // 当前显示图片的http链接
    urls // 需要预览的图片http链接列表
  })
}

module.exports = { download, look }