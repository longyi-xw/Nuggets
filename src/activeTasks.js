/**
 *
 * 成长活跃任务
 */

const fetch = require('node-fetch');
const { headers } = require('./config');

const Method = {
  GET: 'GET',
  POST: 'POST',
}

const fetchApi = async (url, method, params) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers, method: 'GET', credentials: 'include'
    }

    method = method && method.toLocaleUpperCase() || 'GET'
    if (method === 'GET') {
      let params_str = params && Object.keys(params).map(key => `${key}=${params[key]}`).join("&")
      url += '?' + params_str
    } else if (method === 'POST') {
      params = JSON.stringify(params)
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
  },
  Interact: {
    base: "/interact_api/v1",
    unfollow: "/follow/undo",
    follow: "/follow/do",
    digg: "/digg/save",
    cancel_digg: "/digg/cancel"
  },
  Interact_v2: {
    base: "/interact_api/v2",
    add_article_collect: "/collectionset/add_article",
    delete_article_collect: "/collectionset/delete_article"
  },
  Recommend: {
    base: "/recommend_api/v1",
    get_articles: "/article/recommend_all_feed"
  },
}
generatingAPI(Api)

function generatingAPI(api) {
  if (api && Object.keys(api).length) {
    for (let key of Object.keys(api)) {
      if (!api.hasOwnProperty('base')) {
        console.log("Api 中必须有base属性!")
        return
      }
      const value = api[key]
      if (key === 'base' || key === 'host') continue;
      if (typeof value === "object" && value instanceof Object) generatingAPI(value);
      else api[key] = Api.host + api['base'] + value;
    }
  }
}

const activeTask = async () => {
  try {
    const apiConfig = {
      headers, method: 'GET', credentials: 'include',
    }

    // await followTask(apiConfig)

    await articleCollect()

    return "成长活跃任务完成!"
  } catch (error) {
    console.error("成长活跃任务捕获的错误：", error)
  }
}

/**
 * 关注任务
 */
async function followTask() {
  // 通过个人关注列表完成任务

  // 1.获取个人关注列表
  const { data } = (await fetchApi(Api.User.get_follows, Method.GET))?.data
  const userIds = data?.map(u => u['user_id'])
  for (const id of userIds) {

    // 2.取消关注
    const un_result = await fetchApi(Api.Interact.unfollow, Method.POST, { id, type: 1 });

    // 3.重新关注
    const do_result = await fetchApi(Api.Interact.follow, Method.POST, { id, type: 1 })

    if (un_result['err_no'] !== 0 && do_result['err_no'] !== 0) {
      throw `关注任务失败 发生未知错误: ${JSON.stringify(un_result)}`
    }
  }
}

/**
 * 文章 收藏、点赞任务
 * @returns {Promise<void>}
 */
async function articleCollect() {
  // 通过综合推荐完成任务，也可以通过个人收藏完成

  // 1.获取收藏列表
  const data = (await fetchApi(Api.Recommend.get_articles, Method.POST, { id_type: 2, limit: 1200 }))?.data
  let count = 2
  let index = 0
  while (count > 0 && data && data.length) {
    const { article_info } = data[index]['item_info']
    const rd = (n, m) => Math.floor(Math.random() * (m - n + 1) + n)
    // 生成随机限制防止重复任务不成功
    if (article_info && article_info["view_count"] >= rd(3000, 30000)) {
      // 2.收藏
      const result = await fetchApi(Api.Interact_v2.add_article_collect, Method.POST, {
        article_id: article_info["article_id"],
        // 收藏夹收藏id
        select_collection_ids: ["7117170426861584420"]
      })
      if (result['err_no'] !== 0) {
        throw `文章收藏任务失败: ${JSON.stringify(result)}`
      }

      // 3.收藏后取消，避免出现重复收藏
      await fetchApi(Api.Interact_v2.delete_article_collect, Method.POST, { article_id: article_info["article_id"] })

      // 4.点赞
      const digg_result = await fetchApi(Api.Interact.digg, Method.POST, {
        item_id: article_info['article_id'],
        item_type: 2
      })
      if (digg_result['err_no'] !== 0) {
        throw `点赞任务失败: ${JSON.stringify(digg_result)}`
      }

      // 5.取消点赞
      await fetchApi(Api.Interact.cancel_digg, Method.POST, {
        item_id: article_info["article_id"],
        item_type: 2
      })
      count--
    }
    index++
  }
}

exports.activeTask = activeTask