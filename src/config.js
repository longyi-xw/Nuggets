const { COOKIE, USER, PASS, TO, UID, DD_BOT_TOKEN, DD_BOT_SECRET, WORKWX_WEBHOOK } = process.env;
let cookie_str
try {
  let cookie;
  if (typeof COOKIE === 'string') cookie = JSON.parse(COOKIE);
  cookie_str = Object.keys(cookie).map(key => `${key}=${cookie[key]}`).join(";")
} catch (error) {
  console.log("json 字符串格式错误！")
  cookie_str = COOKIE
}
const headers = {
  'content-type': 'application/json; charset=utf-8',
  'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0",
  "Accept": "*/*",
  "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
  referer: 'https://juejin.cn/',
  cookie: cookie_str
};

module.exports = { headers, user: USER, pass: PASS, to: TO, uid: UID, DD_BOT_TOKEN, DD_BOT_SECRET, WORKWX_WEBHOOK };
