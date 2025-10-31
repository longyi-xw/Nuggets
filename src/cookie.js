const COOKIE = {

};

const getTokenParams = (cookie) => {
  const cookieTokens = {
    aid: "",
    uuid: "",
    user_unique_id: "",
    web_id: "",
    msToken: cookie.msToken,
  };

  const tokensReg = /^__tea_cookie_tokens_(\d+)$/;
  // @ts-ignore
  for (const [key, value] of Object.entries(cookie)) {
    if (tokensReg.test(key)) {
      cookieTokens.aid = key.match(tokensReg)[1];
      const json = JSON.parse(
        decodeURIComponent(decodeURIComponent(value.toString()))
      );
      cookieTokens.uuid = json.user_unique_id;
      cookieTokens.user_unique_id = json.user_unique_id;
      cookieTokens.web_id = json.web_id;
      break
    }
  }

  return cookieTokens;
};

module.exports = {
  COOKIE,
  getTokenParams,
};
