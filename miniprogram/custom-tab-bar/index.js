Component({
    options: {
        // 使得全局/page样式能够影响到该组件及其子组件
        styleIsolation: 'apply-shared'
    },
    data: {
        curTabId: 'manage',
        // icon图表大小
        iconSize: '25px'
    },

    methods: {
        // 处理tab改变
        handleChange(event) {
            const curId = event.detail;
            console.log(event);
            this.setData({
                curTabId: curId
            });
        }
    }
});