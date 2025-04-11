const COOKIE = {
  __tea_cookie_tokens_2608:
    "%257B%2522web_id%2522%253A%25227480369815116744227%2522%252C%2522user_unique_id%2522%253A%25227480369815116744227%2522%252C%2522timestamp%2522%253A1741659346705%257D",
  passport_csrf_token: "b285e80217ec09e5f78498f5d506e516",
  passport_csrf_token_default: "b285e80217ec09e5f78498f5d506e516",
  csrf_session_id: "",
  msToken:
    "DYC8HWkopljiAP9MQShEP46uwig70RvmaIuYh_xv-7yRBy7-yFxnbJueUjHZTNSYkqcqQIqO_0q8j7qNO2QdQcfacgXuTTZ7OVXHo135juLJ3LFfXR117TtIjJpkvPMk",
  n_mh: "m4Nwod14ocYxZ8VeMr34-AMseNqHnd0sqChhin9oDYw",
  sid_guard:
    "f39a3246dc92c3cec0441a2c151e385f%7C1741659368%7C31536000%7CWed%2C+11-Mar-2026+02%3A16%3A08+GMT",
  sid_tt: "f39a3246dc92c3cec0441a2c151e385f",
  uid_tt: "f4408b9fbc68dadc87fedaccf0c6cedd",
  uid_tt_ss: "f4408b9fbc68dadc87fedaccf0c6cedd",
  s_v_web_id: "verify_m83v08f3_2UalL2dZ_IizM_4obj_AzbZ_wTbdwHW0rvKg",
};

const getTokenParams = (cookie) => {
  const cookieTokens = {
    aid: "",
    uuid: "",
    user_unique_id: "",
    web_id: "",
    verifyFp: cookie.s_v_web_id,
    fp: cookie.s_v_web_id,
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
