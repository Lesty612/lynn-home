// pages/order-list/filter-panel/filter-panel.js
/**
 * 筛选组件
 * @author Lesty
 * @date 2019.10.12
 */
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        // 筛选条件
        filterCondition: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tapCondition(event) {
            const condition = event.currentTarget.dataset.condition;
            // 切换选中状态(重复点击则清空)
            this.setData({
                filterCondition: this.data.filterCondition === condition
                    ? ''
                    : condition
            });

            this.triggerEvent('condition-change', this.data.filterCondition);
        }
    }
})
