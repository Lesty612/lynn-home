//app.js
App({
    globalData: {
        userInfo: null
    },

    onLaunch: function () {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                traceUser: true,
            })
        }

        // 获取用户当前授权设置
        wx.getSetting({
            success: (res) => {
                // 获取用户信息
                if(!res.authSetting['scope.userInfo']) {
                    console.log('用户未授权getUserInfo');
                    return;
                }

                console.log('用户已授权getUserInfo');
                wx.getUserInfo({
                    success: ({userInfo}) => {
                        this.globalData.userInfo = userInfo;
                        // 存在回调则执行
                        if(this.userInfoReadyCallBack) {
                            this.userInfoReadyCallBack(userInfo)
                        }

                        console.log('getUserInfo: ', userInfo);
                    }
                });
            }
        });
    },

    // 获取用户信息回调
    userInfoReadyCallBack: null
})
