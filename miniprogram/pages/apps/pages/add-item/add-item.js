import {validateField} from './func.js';

const app = getApp();
const Tools = app.Tools;
const TYPE_LIST = ['短袖', '长袖', '外套', '长裤', '短裤', '裙子', '卫衣', '其它'];
// 表单属性对照表
const formMap = {
    channel: '',
    desc: '',
    itemType: '',
    name: '',
    price: '',
    score: '',
    season: ''
};
// 当前操作的cell name，用于唯一确认当前操作的popUp
let curCellName;

Component({
    /**
     * 组件的初始数据
     */
    data: {
        // 错误信息对照表
        errorMsgMap: Object.assign({}, formMap),
        formData: Object.assign({}, formMap),
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
            const fieldName = currentTarget.dataset.name;
            const value = detail.value;

            // 值没改变则不做赋值操作
            if(value === this.data.formData[fieldName]) {
                return;
            }

            let data = {};
            data[`formData.${fieldName}`] = value;
            // 错误校验
            data[`errorMsgMap.${fieldName}`] = validateField(fieldName, value);

            console.log(this.data);
            this.setData(data);
        },
        // 处理picker取消选择
        handlePickerCancel({currentTarget, detail}) {
            this.handPopUpClose();
        },
        // 处理picker确认
        handlePickerConfirm({currentTarget, detail}) {
            console.log(arguments);
            const fieldName = currentTarget.dataset.name;
            const value = detail.value;

            let data = {};
            data[`formData.${fieldName}`] = value;

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
