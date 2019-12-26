const validateMap = {
    itemType(value) {
        if(value === '') {
            return '请选择类别'
        }

        return '';
    },
    price(value) {
        if(value === '') {
            return '请输入价格'
        }

        return '';
    }
};

// 验证表单字段
function validateField(key, value) {
    if(!(key in validateMap)) {
        return '';
    }

    return validateMap[key](value);
}

export {
    validateField
};