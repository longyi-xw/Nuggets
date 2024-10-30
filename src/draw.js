/**
 *
 * 自动抽奖
 *
 *  */

const { fetchApi, Api, Method } = require("./fetch");

async function draw() {
    // 查询今日是否有免费抽奖机会
    const today = await fetchApi(Api.Growth.free_lottery, Method.GET)

    if (today.err_no !== 0) return Promise.reject('查询免费抽奖，接口调用异常！');
    if (today.data.free_count === 0) return '今日已经免费抽奖！';

    // 免费抽奖
    const res = await fetchApi(Api.Growth.lottery, Method.POST)
    if (res.err_no !== 0) return Promise.reject('免费抽奖异常，接口调用异常！');

    return res.data.lottery_name;
}

module.exports = draw;
