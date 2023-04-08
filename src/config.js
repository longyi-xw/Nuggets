const { COOKIE, USER_EMAIL, EMAIL_PASS, TO, UID, DD_BOT_TOKEN, DD_BOT_SECRET, WORKWX_WEBHOOK } = process.env;
// COOKIE = {
//   "__tea_cookie_tokens_2608": "%7B%22web_id%22%3A%227200646839983654459%22%2C%22user_unique_id%22%3A%227200646839983654459%22%2C%22timestamp%22%3A1676531249634%7D",
//   "_tea_utm_cache_2608": "{\"utm_source\":\"web1\",\"utm_medium\":\"feed\",\"utm_campaign\":\"rgznfc\"}",
//   "csrf_session_id": "ead7c2760b37e9f35ac86c30102fc7cb",
//   "msToken": "SanO-zW4ZEpZrIew1WHIOmeh1aV3Wx02qdOq-E44WDQvSFf5ATmwCIMW6b6RjDliPMm7U2MJNztjwUad17sRZPq00DTh12mCPTXnqwjgg18=",
//   "n_mh": "m4Nwod14ocYxZ8VeMr34-AMseNqHnd0sqChhin9oDYw",
//   "passport_csrf_token": "d8fc4ead36b18e1254409cd64962a8df",
//   "passport_csrf_token_default": "d8fc4ead36b18e1254409cd64962a8df",
//   "sessionid": "b6eee8663c22c773e118585d549d9f83",
//   "sessionid_ss": "b6eee8663c22c773e118585d549d9f83",
//   "sid_guard": "b6eee8663c22c773e118585d549d9f83|1678712359|31536000|Tue,+12-Mar-2024+12:59:19+GMT",
//   "sid_tt": "b6eee8663c22c773e118585d549d9f83",
//   "sid_ucp_v1": "1.0.0-KGMwNjYwNWVhNTU2NjkxNTRhYzhlOWQyYTZjMWM4YzI3NDExZjUyMzgKFQjXudCK2PUXEKe8vKAGGLAUOAhAOBoCbGYiIGI2ZWVlODY2M2MyMmM3NzNlMTE4NTg1ZDU0OWQ5Zjgz",
//   "ssid_ucp_v1": "1.0.0-KGMwNjYwNWVhNTU2NjkxNTRhYzhlOWQyYTZjMWM4YzI3NDExZjUyMzgKFQjXudCK2PUXEKe8vKAGGLAUOAhAOBoCbGYiIGI2ZWVlODY2M2MyMmM3NzNlMTE4NTg1ZDU0OWQ5Zjgz",
//   "store-region": "cn-sc",
//   "store-region-src": "uid",
//   "uid_tt": "a8faf3598c086cc0c12d681c9446031a",
//   "uid_tt_ss": "a8faf3598c086cc0c12d681c9446031a"
// }
let cookie_str
try {
  let cookie = COOKIE;
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
console.log("用户邮箱：", USER_EMAIL)
console.log("发送邮箱到：", TO)
module.exports = {
  headers,
  user: USER_EMAIL,
  pass: EMAIL_PASS,
  to: TO,
  uid: UID,
  DD_BOT_TOKEN,
  DD_BOT_SECRET,
  WORKWX_WEBHOOK
};
