/**
 *
 * 签到
 *
 *  */
const { fetchApi, Api, Method } = require("./fetch");

async function sign_in() {
    // 查询今日是否已经签到
    const today_status = await fetchApi(Api.Growth.get_today_status, Method.GET);

    if (today_status.err_no !== 0) return Promise.reject('签到失败！');
    if (today_status.data) return '今日已经签到！';

    // 签到
    const res = await fetchApi(Api.Growth.check_in, Method.POST)
    if (res.err_no !== 0) return Promise.reject('签到异常！');

    return `签到成功！`;
}

module.exports = sign_in;
