const fetch = require('node-fetch');
const { headers, tokenParams } = require('./config');
const Method = {
    GET: 'GET',
    POST: 'POST',
}

const fetchApi = async (url, method, params) => {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers, method: 'GET', credentials: 'include'
        }

        if (tokenParams && Object.keys(tokenParams).length) {
            const urlParams = Object.keys(tokenParams).map((key) => (`${key}=${tokenParams[key]}`)).join("&")
            url += "?" + urlParams
        }

        method = method && method.toLocaleUpperCase() || 'GET'
        if (method === 'GET') {
            let params_str = (params && Object.keys(params).map(key => `${key}=${params[key]}`).join("&")) || ""
            url += url.includes("?") ? params_str : "?" + params_str
        } else if (method === 'POST') {
            params = JSON.stringify(params ?? {})
            config.body = params
        }
        config.method = method
        const data = await fetch(url, config)
            .then(res => res.json())
            .catch(err => reject(`fetchApi捕获错误：${err}`))

        resolve(data)
    })
}

const Api = {
    host: "https://api.juejin.cn",
    base: "/",
    User: {
        base: "/user_api/v1",
        get_follows: "/follow/followees",
        get_bugfix: "/bugfix/not_collect",
        collect_bug: "/bugfix/collect",
        login: "/user/get"
    },
    Interact: {
        base: "/interact_api/v1",
        unfollow: "/follow/undo",
        follow: "/follow/do",
        digg: "/digg/save",
        cancel_digg: "/digg/cancel",
        comment: "/comment/publish"
    },
    Interact_v2: {
        base: "/interact_api/v2",
        add_article_collect: "/collectionset/add_article",
        delete_article_collect: "/collectionset/delete_article"
    },
    Recommend: {
        base: "/recommend_api/v1",
        get_articles: "/article/recommend_all_feed",
        add_hot_digg: "/short_msg/hot"
    },
    Growth: {
        base: "/growth_api/v1",
        get_benefit: "/get_benefit_page",
        add_exchange: "/publish_benefit_history",
        get_today_status: "/get_today_status",
        check_in: "/check_in",
        free_lottery: "/lottery_config/get",
        lottery: "/lottery/draw",
        publish_benefit: "/publish_benefit_history"
    },
    Content: {
        base: "/content_api/v1",
        publishHot: "/short_msg/publish",
    }
}


function generatingAPI(api) {
    const _api = {}
    if (api && Object.keys(api).length) {
        for (let key of Object.keys(api)) {
            if (!api.hasOwnProperty('base')) {
                console.log("Api 中必须有base属性!")
                return
            }
            const value = api[key]
            if (key === 'base' || key === 'host') continue;
            if (typeof value === "object" && value instanceof Object) _api[key] = generatingAPI(value);
            else _api[key] = Api.host + api['base'] + value;
        }
    }
    return _api
}

module.exports = {
    fetchApi,
    Method,
    Api: generatingAPI(Api),
    headers
}
