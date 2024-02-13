/**
 *
 * 成长活跃任务
 */

const { fetchApi, Api, Method } = require("./fetch");
const rd = (n, m) => Math.floor(Math.random() * (m - n + 1) + n);

const activeTask = async () => {
  try {
    await followTask();

    await hotDigg();

    await articleCollect();

    await hotPublish();

    await hotPublish();

    return "成长活跃任务完成!";
  } catch (error) {
    console.error("成长活跃任务捕获的错误：", error);
  }
};

/**
 * 关注任务
 */
async function followTask() {
  // 通过个人关注列表完成任务

  // 1.获取个人关注列表
  const { data } = (await fetchApi(Api.User.get_follows, Method.GET))?.data;
  const userIds = data?.map((u) => u["user_id"]);
  for (const id of userIds) {
    // 2.取消关注
    const un_result = await fetchApi(Api.Interact.unfollow, Method.POST, {
      id,
      type: 1,
    });

    // 3.重新关注
    const do_result = await fetchApi(Api.Interact.follow, Method.POST, {
      id,
      type: 1,
    });

    if (un_result["err_no"] !== 0 && do_result["err_no"] !== 0) {
      throw `关注任务失败 发生未知错误: ${JSON.stringify(un_result)}`;
    }
  }
}

/**
 * 文章 收藏、点赞任务
 * @returns {Promise<void>}
 */
async function articleCollect() {
  // 通过综合推荐完成任务，也可以通过个人收藏完成
  const data = (
    await fetchApi(Api.Recommend.get_articles, Method.POST, {
      id_type: 2,
      limit: 20,
    })
  )?.data;
  let count = 2;
  while (count > 0 && data && data.length) {
    const index = rd(0, 20 - 1);
    const { article_info } = data[index]["item_info"];
    // 2.收藏
    const result = await fetchApi(
      Api.Interact_v2.add_article_collect,
      Method.POST,
      {
        article_id: article_info["article_id"],
        // 收藏夹收藏id
        select_collection_ids: ["7117170426861584420"],
      }
    );
    if (result["err_no"] !== 0) {
      throw `文章收藏任务失败: ${JSON.stringify(result)}`;
    }

    // 3.收藏后取消，避免出现重复收藏
    await fetchApi(Api.Interact_v2.delete_article_collect, Method.POST, {
      article_id: article_info["article_id"],
    });

    // 4.点赞
    const digg_result = await fetchApi(Api.Interact.digg, Method.POST, {
      item_id: article_info["article_id"],
      item_type: 2,
    });
    if (digg_result["err_no"] === 3001) {
      // 5.取消点赞
      await fetchApi(Api.Interact.cancel_digg, Method.POST, {
        item_id: article_info["article_id"],
        item_type: 2,
      });
      count++;
      console.log(`文章点赞任务失败, 重复点赞`);
    } else if (digg_result["err_no"] !== 0) {
      console.log(`文章点赞任务失败 ${JSON.stringify(digg_result)}`);
    }

    count--;
  }
}

async function hotPublish() {
  // 获取每日一言
  const word = await fetchApi("https://v1.hitokoto.cn/");
  const hotParams = {
    content: word.hitokoto + "               --" + word.from,
    sync_to_org: false,
  };

  // 发布沸点
  const { data } = await fetchApi(
    Api.Content.publishHot,
    Method.POST,
    hotParams
  );
  console.log("发布沸点 --->", data);
  if (data === null) {
    console.log(`发布沸点失败 ${JSON.stringify(data)} 重新发布沸点 ---->`);
    hotPublish();
  }
}

/**
 * 沸点评论
 * @param {*} comment
 */
async function hotComment(comment, id) {
  console.log("chatgpt ----->", comment);
  // 调用chatgpt api
  const data = await fetchApi(
    "https://api.chatanywhere.com.cn/v1/chat/completions",
    Method.POST,
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: comment }],
      temperature: 0.7,
    }
  );

  if (data.choices) {
    await fetchApi(Api.Interact.comment, Method.POST, {
      item_id: id,
      item_type: 4,
      comment_content: data.choices[0].message?.content,
      comment_pics: [],
    });
  } else {
    throw "chatgpt api error";
  }
}

/**
 * 沸点点赞任务
 * @returns {Promise<void>}
 */
async function hotDigg() {
  // 获取热门沸点点赞

  // 1.获取沸点列表
  const { data } = await fetchApi(Api.Recommend.add_hot_digg, Method.POST, {
    id_type: 4,
    limit: 50,
    sort_type: 200,
  });

  if (data && data.length) {
    const messages = [];
    for (let i = 0; i < 5; i++) {
      // 防止重复点赞
      const rdIndex = rd(1, data.length - 1);
      const { msg_id, msg_Info } = data[rdIndex];

      messages.push({ id: msg_id, content: msg_Info.content });
      // 2.点赞
      const digg_result = await fetchApi(Api.Interact.digg, Method.POST, {
        item_id: msg_id,
        item_type: 4,
      });
      if (digg_result["err_no"] === 3001) {
        console.log(`沸点点赞失败, 重复点赞`);
        // 3.取消点赞
        await fetchApi(Api.Interact.cancel_digg, Method.POST, {
          item_id: msg_id,
          item_type: 4,
        });
        i = Math.max(0, i - 1);
      } else if (digg_result["err_no"] !== 0) {
        console.log(`沸点点赞失败 ${JSON.stringify(digg_result)}`);
      }
    }

    // 沸点评论
    let count = 0;
    for (let comment of messages) {
      try {
        hotComment(comment.content, comment.id);
      } catch (error) {
        count++;
        if (count < 10) {
          hotComment(comment.content, comment.id);
        }
      }
    }
  }
}

/**
 * 收取bugfix
 * @returns {Promise<void>}
 */
async function harvestBugfix() {
  // 收取bug

  // 1.获取bug列表
  const { data, err_msg } = await fetchApi(Api.User.get_bugfix, Method.POST);
  if (!data) throw `获取bug失败 ${JSON.stringify(err_msg)}`;
  for (let bug of data) {
    // 2.收取bug
    const result = await fetchApi(Api.User.collect_bug, Method.POST, {
      bug_type: bug.bug_type,
      bug_time: bug.bug_time,
    });
    if (result["err_no"] !== 0) {
      throw `bug消除失败 ${JSON.stringify(result)}`;
    }
  }
}

exports.activeTask = activeTask;
