const app = getApp();
const Tools = app.Tools;
const TYPE_LIST = ['短袖', '长袖', '外套', '长裤', '短裤', '裙子', '卫衣', '其它'];
// 当前操作的cell name，用于唯一确认当前操作的popUp
let curCellName;
// pages/apps/pages/add-item/add-item.js
Component({
    /**
     * 组件的初始数据
     */
    data: {
        formData: {
            channel: '',
            desc: '',
            itemType: '',
            name: '',
            price: '',
            score: '',
            season: ''
        },
        // 是否隐藏textare
        isHideTextarea: false,
        // 是否展示类别弹出框
        isShowTypePopUp: false,
        // 类别列表
        typeList: TYPE_LIST
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 处理cell点击
        handCellClick({currentTarget}) {
            // popUp的时候隐藏textarea(层级太高)
            let data = {
                isHideTextarea: true
            };
            curCellName = currentTarget.dataset.name;
            data[`isShow${curCellName}PopUp`] = true;

            this.setData(data);
        },
        // 处理表单值发送改变
        handleFormChange({currentTarget, detail}) {
            if(detail.value === this.data.formData[currentTarget.dataset.name]) {
                return;
            }

            let data = {};
            data[`formData.${currentTarget.dataset.name}`] = detail.value;

            this.setData(data);
        },
        // 处理picker确认
        handlePickerConfirm({currentTarget, detail}) {
            console.log(arguments);
            let data = {};
            data[`formData.${currentTarget.dataset.name}`] = detail.value;

            this.setData(data);
            this.handPopUpClose();
        },
        // 处理弹框关闭
        handPopUpClose() {
            let data = {
                isHideTextarea: false
            };
            data[`isShow${curCellName}PopUp`] = false;

            this.setData(data);
        },

        onShow() {
        }
    }
})
