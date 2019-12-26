import {validateField} from './func.js';

const app = getApp();
const {CHANNEL_LIST, SEASON_LIST, TYPE_LIST} = app.Enumerate;
const Tools = app.Tools;
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
        // 渠道列表
        channelList: CHANNEL_LIST,
        // 错误信息对照表
        errorMsgMap: Object.assign({}, formMap),
        formData: Object.assign({}, formMap),
        // 是否展示弹出框
        isShowPopUp: false,
        isShowChannelPicker: false,
        isShowSeasonPicker: false,
        isShowTypePicker: false,
        // 适宜季节列表
        seasonList: SEASON_LIST,
        // 类别列表
        typeList: TYPE_LIST
    },

    observers: {
        // 任意一个picker展示都显示弹出框
        'isShowChannelPicker, isShowSeasonPicker, isShowTypePicker': function (isShowChannelPicker, isShowSeasonPicker, isShowTypePicker) {
            this.setData({
                isShowPopUp: isShowChannelPicker || isShowSeasonPicker || isShowTypePicker
            });
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 处理cell点击
        handCellClick({currentTarget}) {
            let data = {
            };
            curCellName = currentTarget.dataset.name;
            data[`isShow${curCellName}Picker`] = true;

            this.setData(data);
        },
        // 处理表单值发送改变
        handleFormChange({currentTarget, detail}) {
            this.setFieldValue(currentTarget.dataset.name, detail.value);
        },
        // 处理picker取消选择
        handlePickerCancel({currentTarget}) {
            this.setFieldValue(currentTarget.dataset.name, '');
            this.handPopUpClose();
        },
        // 处理picker确认
        handlePickerConfirm({currentTarget, detail}) {
            console.log(arguments);

            this.setFieldValue(currentTarget.dataset.name, detail.value);
            this.handPopUpClose();
        },
        // 处理弹框关闭
        handPopUpClose() {
            let data = {
            };
            data[`isShow${curCellName}Picker`] = false;

            this.setData(data);
        },

        onShow() {
        },

        // 设置表单字段值
        setFieldValue(fieldName, value = '') {
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
    }
})
