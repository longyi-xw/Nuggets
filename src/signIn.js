/**
 *
 * 签到
 *
 *  */
const { fetchApi, Api, Method } = require("./fetch");

async function sign_in() {
    // 查询今日是否已经签到
    const today_status = await fetchApi(Api.Growth2.get_today_status, Method.GET);

    if (today_status.err_no !== 0) return Promise.reject('签到失败！');
    if (today_status.data?.check_in_done) return '今日已经签到！';

    // 签到
    const res = await fetchApi(Api.Growth.check_in, Method.POST)
    if (res?.err_no !== 0) return "签到异常！";

    return `签到成功！`;
}


/** 补签卡兑换 */
async function exchange_card() {

    function isWeekend() {
        const today = new Date();
        const day = today.getDay();
        return day === 0 || day === 6;
    }

    if (!isWeekend()) {
        return "不是周末，跳过兑换补签卡！"
    }
    const res = await fetchApi(Api.Growth.publish_benefit, Method.POST, {
        "id": 63,
        "lottery_id": "7024030703209676814",
        "lottery_name": "补签卡",
        "lottery_type": 5,
        "lottery_image": "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f727c91a8b4248499c1f8b12acb91b05~tplv-k3u1fbpfcp-no-mark:0:0:0:0.image?",
        "lottery_desc": "近30日内可补签",
        "lottery_cost": 0,
        "lottery_reality": 2,
        "recycle_point": 0,
        "donate_point": 0,
        "benefit_id": "7024031089404411941",
        "user_id": "105198803754199"
    });

    if (res['err_no'] !== 0) return Promise.reject('兑换失败！');

    return `兑换成功！`;
}

module.exports = {
    sign_in,
    exchange_card
};
