/*
* @author Lesty
* @codeDate 2019.12.18
* @desc [公用的工具类]
* */

// 一个什么都不干的咸鱼函数
function doNothing() {}

/**
 * @desc [按相应规则格式化日期]
 * @date Date 要格式化的日期
 * @formatStr String 格式化规则
 * @returns String 格式化的日期
 */
function formatDate(date, formatStr) {
    if (date instanceof Date) {
        let formatDate = formatStr || 'YYYY-MM-DD',
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds();

        formatDate = formatDate.replace(/yyyy|YYYY/, year.toString());
        formatDate = formatDate.replace(/yy|YY/, (year % 100) > 9 ? (year % 100).toString() : '0' + (year % 100));

        formatDate = formatDate.replace(/MM/, month > 9 ? month.toString() : '0' + month);
        formatDate = formatDate.replace(/M/g, month.toString());

        formatDate = formatDate.replace(/dd|DD/, day > 9 ? day.toString() : '0' + day);
        formatDate = formatDate.replace(/d|D/g, day.toString());

        formatDate = formatDate.replace(/HH/, hour > 9 ? hour.toString() : '0' + hour);
        formatDate = formatDate.replace(/H/g, hour.toString());
        // 12小时制时间
        let hHour = hour % 12;
        formatDate = formatDate.replace(/hh/, hHour > 9 ? hHour.toString() : '0' + hHour);
        formatDate = formatDate.replace(/h/g, hHour.toString());

        formatDate = formatDate.replace(/mm/, minute > 9 ? minute.toString() : '0' + minute);
        formatDate = formatDate.replace(/m/g, minute.toString());

        formatDate = formatDate.replace(/ss|SS/, second > 9 ? second.toString() : '0' + second);
        formatDate = formatDate.replace(/s|S/g, second.toString());
        return formatDate;
    }
    else {
        return "";
    }
};

/**
 * 字符串转成日期类型
 * 日期时间格式 YYYY/MM/dd HH:mm:ss  YYYY-MM-dd HH:mm:ss
 * 日期格式 YYYY/MM/dd YYYY-MM-dd
 */
function stringToDate(dateStr) {
    return new Date(Date.parse(dateStr.replace(/-/g, '/')));
};

export default {
    doNothing,
    formatDate,
    stringToDate
};
