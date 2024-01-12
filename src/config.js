const {
  COOKIE,
  OPENAI_API_KEY,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_TO,
  UID,
  DD_BOT_TOKEN,
  DD_BOT_SECRET,
  WORKWX_WEBHOOK,
} = process.env;

let COOKIE_DEFAULT = require("./cookie").COOKIE;
let cookie_str;
try {
  let cookie = COOKIE;
  if (typeof cookie === "string") {
    cookie = JSON.parse(cookie);
    COOKIE_DEFAULT = cookie;
  }
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
  Accept: "*/*",
  "Accept-Language":
    "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
  Authorization: "Bearer " + "sk-i82RYQ4SXNjpbpnZUhdqufCf6G1RKSPGcMTs9KxUjipAXNtl",
  referer: "https://juejin.cn/",
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
};
