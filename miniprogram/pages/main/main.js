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
        // 筛选器是否吸顶
        isFilterFixed: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onShow() {
            // 设置tabbar选中
            // 确保即使不是通过点击tab打开的页面，也能高亮tab
            this.getTabBar().setData({
                curTabId: 'main'
            });
        },
        // 处理筛选条件变化
        handleFilterConditionChange(event) {
            console.log('handleFilterConditionChange', event);
        },
        // 处理sticky滚动
        handleStickyScroll(event) {
            // TODO: 加个函数节流
            this.setData({
                isFilterFixed: event.detail.isFixed
            });
        }
    }
})
