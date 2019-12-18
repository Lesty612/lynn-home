import Toast from '/@vant/weapp/toast/toast';
import Notify  from '/@vant/weapp/notify/notify';

// pages/my/my.js
const app = getApp();
const db = wx.cloud.database();

// 获取性别颜色
function getGenderColor(gender) {
    const map = {
        0: '#969799',
        1: '#1989fa',
        2: '#da78dc'
    };

    return map[gender];
}

// 获取性别描述
function getGenderDesc(gender) {
    const map = {
        0: '神秘性别',
        1: '男',
        2: '女'
    };

    return map[gender];
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      // 头像地址
      avatarUrl: './user-unlogin.png',
      // 性别
      gender: 0,
      // 性别颜色
      genderColor: '#969799',
      // 性别描述
      genderDesc: '',
      // 昵称
      nickName: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 处理获取用户信息
      handleGetUserInfo({detail}) {
          console.log(detail);

          // 拒绝授权
          if(!detail.userInfo) {
              return Toast({
                  message: '您已取消登录授权，为了您的最优体验，请重新点击登录',
                  duration: 4000
              });
          }

          const userInfo = detail.userInfo;
          app.globalData.userInfo = userInfo;
          this.setUserInfo(userInfo);

          this.login({
              time: +new Date(),
              userName: userInfo.nickName
          });
      },
      // 登录
      login(params) {
          wx.cloud.callFunction({
              name: 'login',
              data: params
          }).then(res => {
              console.log(res);
          }).catch(err => {
              if(err.errCode !== 0) {
                  Notify({
                      type: 'danger',
                      message: err.errMsg,
                      duration: 4000
                  });
              }
          });
      },
      onLoad() {
          const userInfo = app.globalData.userInfo;
          /*
          * 此处由于首页获取用户信息操作是异步的
          * 所以my页面加载完后，可能请求还没结束
          * 需要加个回调进行处理
          * */
          if(userInfo) {
              this.setUserInfo(userInfo);
          } else {
              // 首页获取用户信息回调
              app.userInfoReadyCallBack = (info) => {
                  this.setUserInfo(info);
              };
          }
      },
      onShow() {
          // 设置tabbar选中
          this.getTabBar().setData({
              curTabId: 'my'
          });
      },

      // 设置用户信息
      setUserInfo({avatarUrl, gender, nickName}) {
          this.setData({
              avatarUrl,
              gender,
              genderColor: getGenderColor(gender),
              genderDesc: getGenderDesc(gender),
              nickName
          });
      }
  }
})
