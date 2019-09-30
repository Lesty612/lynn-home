Page({
    onShow() {
        // 设置tabbar选中manage
        this.getTabBar().setData({
            curTabId: 'manage'
        });
    },
    data: {
      title: '衣物展示'
    }
});