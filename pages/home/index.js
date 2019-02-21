Page({
  data: {
    showOrder: true,
    setInter: '', // 
  },
  onLoad: function (e) {
    this.mapCtx = wx.createMapContext("myMap");
  },
  onShow: function () {
    var that = this
    this.data.setInter = setInterval(
      function () {
        that.mapCtx.moveToLocation()
      }
      , 2000);
  },
  getLocation: function() {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  hideInfo: function() {
    this.setData({
      showOrder: !this.data.showOrder
    })
  }
})
