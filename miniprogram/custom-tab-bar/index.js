Component({
    data: {
        curTabId: 'manage',
        // icon图表大小
        iconSize: '25px'
    },
    attached() {
    },
    methods: {
        // 处理点击tab
        handleTapTab(e) {
            const curId = e.currentTarget.dataset.id;
            this.setData({
                curTabId: curId
            });
        }
    }
})