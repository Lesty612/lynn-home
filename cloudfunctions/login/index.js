// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”
const cloud = require('wx-server-sdk');
// 初始化 cloud
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * event 参数包含小程序端调用传入的 data
 *
 */
exports.main = async ({time, userName}) => {
    try {
        const res = await db.collection('login-manage').add({
            data: {
                time: new Date(time),
                userName
            }
        });

        // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
        const wxContext = cloud.getWXContext();

        return {
            code: 0,
            msg: '登录成功',
            rows: {
                _id: res._id,
                _openid: wxContext.OPENID
            }
        };
    } catch(err) {
        throw err;
    }
};
