const {
  COOKIE,
  OPENAI_KEY,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_TO,
  UID,
  DD_BOT_TOKEN,
  DD_BOT_SECRET,
  WORKWX_WEBHOOK,
} = process.env;
const { getTokenParams, COOKIE: DC } = require("./cookie");


console.log("gpt key --->", OPENAI_KEY);

let COOKIE_DEFAULT = COOKIE
let cookie_str;
let tokenParams
try {
  let cookie = COOKIE_DEFAULT;
  if (typeof cookie === "string") {
    cookie = JSON.parse(cookie);
    COOKIE_DEFAULT = cookie;
  }
  tokenParams = getTokenParams(cookie)
  cookie_str = Object.keys(cookie)
    .map((key) => `${key}=${cookie[key]}`)
    .join(";");
} catch (error) {
  console.log("json 字符串格式错误！");
  cookie_str = COOKIE_DEFAULT;
}
const headers = {
  "content-type": "application/json; charset=utf-8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0",
  "accept": "*/*",
  "accept-language":
    "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
  "Authorization": "Bearer " + OPENAI_KEY,
  "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "Referer": "https://juejin.cn/",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  cookie: cookie_str,
};
console.log("用户邮箱：", EMAIL_USER);
console.log("发送邮箱到：", EMAIL_TO);
module.exports = {
  headers,
  user: EMAIL_USER,
  pass: EMAIL_PASS,
  to: EMAIL_TO,
  uid: UID,
  DD_BOT_TOKEN,
  DD_BOT_SECRET,
  WORKWX_WEBHOOK,
  COOKIE_DEFAULT,
  tokenParams
};
