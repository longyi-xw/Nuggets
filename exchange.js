const { fetchApi, Api, Method } = require("./src/fetch");
const sendMail = require("./src/sendMail");
const cookie = require("./src/config").COOKIE_DEFAULT;

/**
 * 兑换
 * 让你不让我兑换马克杯！！！
 */
(async () => {

    try {
        const exchangeItems = ["苹果耳机", "马克杯"]
        const address_info = {
            receive_name: "xxx",
            receive_phone: "xxxxx",
        }

        // 获取兑换商店
        const { data } = await fetchApi(Api.Growth.get_benefit, Method.POST, {
            got_channel: 2, page_no: 1, page_size: 150, type: 1
        })

        const names = data.map(d => d['benefit_config']['lottery_name'])
        let targets = []
        for (let item of data) {
            const benefit = item['benefit_config']
            if (exchangeItems.filter(ex => benefit['lottery_name'].includes(ex)).length) {
                targets.push(Object.assign({}, benefit, item['lottery']['lottery_base']))
            }
        }
        console.log(targets)
        for (let target of targets) {
            let header_params = {
                msToken: cookie.msToken,
                a_bogus: "YysdhcgYMsm1t8az2hkz9j3B6NY0YW5ugZENAxgFHtog"
            }
            header_params = Object.keys(header_params).map(key => key + "=" + header_params[key]).join("&")
            const body_params = {
                benefit_id: target.benefit_id,
                donate_point: target.donate_point,
                id: target.id,
                lottery_cost: target.lottery_cost,
                lottery_desc: target.lottery_desc,
                lottery_id: target.lottery_id,
                lottery_image: target.lottery_image,
                lottery_reality: target.lottery_reality,
                lottery_name: target.lottery_name,
                lottery_type: target.lottery_type,
                recycle_point: target.recycle_point,
                ...address_info,
                remark: "",
                user_id: "105198803754199"
            }
            const data = await fetchApi(Api.Growth.add_exchange + "?" + header_params, Method.POST, body_params)
            console.log(data)

            const html = `
          <h1 style="text-align: center">福利兑换通知</h1>
          <p style="text-indent: 2em">所有商品：${JSON.stringify(names)}</p>
          <p style="text-indent: 2em">是否有马克杯：${!!names.filter(n => n.includes("马克杯")).length}</p>
          <p style="text-indent: 2em">兑换结果：兑换签证待破解</p>
        `

            await sendMail({ from: '掘金', subject: '定时任务', html });

            console.log('邮件发送完成');
        }
    } catch (error) {
        console.log(error)
    }
})()