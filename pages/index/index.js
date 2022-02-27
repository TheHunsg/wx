// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
   
   
    isShowStartBtn:true,//是否展示开始按钮
    colorArr:["blue","white","green","red","yellow"],//背景颜色数组
    colorIndex:0,//数组下标
    timeNum:"",//倒计时
    showTime:false,//倒计时展示
    isShowCardChangeButtom:false,
    sthYouCantNotDo:"",//数据集
  },

  startGame(){ 

    this.initGame();
    this.startButtonShowOrHidden(false);
    this.changeBodyColor(()=>{
      this.timeDownShowOrHidden(false);
      this.showCard();
      this.cardChangeBtnShowOrHidden(true);
    });
 
   
  },
  //初始化游戏，方便进行再次开始
  initGame(){
    this.setData({
      isShowCardChangeButtom:false,
      showTime:false,
      timeNum:false,
      colorIndex:0,
    });
  },
  //按钮的显示或者隐藏
  startButtonShowOrHidden(btnSwitch){
      this.setData({
        isShowStartBtn:btnSwitch
      })
  },
  //显示或隐藏倒计时
  timeDownShowOrHidden(flag){
    this.setData({
      showTime:flag
    })
  },

  //循环改变背景颜色
  changeBodyColor(callback){
    let timer;
    let that = this;
    let length = this.data.colorArr.length;
    that.setData({
      timeNum:length
    })
    that.timeDownShowOrHidden(true);
    timer = setInterval(()=>{
      this.data.colorIndex = this.data.colorIndex+1;
      console.log(this.data.colorIndex);
      length --;
      that.setData({
        colorIndex : this.data.colorIndex,
        timeNum:length
      })

      if(this.data.colorIndex ==  this.data.colorArr.length){
          clearInterval(timer);
          callback();
      }
    },1000);

  },

  //游戏正式开始，展示不能做的内容
  showCard(){
    let card = "呼吸";
    this.setData({
      sthYouCantNotDo:card
    })
  },
  //展示或隐藏切换卡片按钮
  cardChangeBtnShowOrHidden(btnSwitch){
    console.log(4558);
      this.setData({
        isShowCardChangeButtom:btnSwitch
      })
  },
  
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
