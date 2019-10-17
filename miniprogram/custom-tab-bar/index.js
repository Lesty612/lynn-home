const urlMap = {
    main: '/pages/main/main',
    apps: '/pages/apps/apps',
    my: '/pages/my/my'
};

Component({
    options: {
        // 使得全局/page样式能够影响到该组件及其子组件
        styleIsolation: 'apply-shared'
    },
    data: {
        curTabId: 'main',
        // icon图表大小
        iconSize: '25px'
    },

    methods: {
        // 处理tab改变
        handleChange(event) {
            const curId = event.detail;
            console.log('handleTabChange', curId);
            // 设置当前tabId(选中效果)
            this.setData({
                curTabId: curId
            });
            // 跳转页面
            wx.switchTab({
                url: urlMap[curId]
            });
        }
    }
});