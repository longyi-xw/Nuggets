const COOKIE = {
    "__tea_cookie_tokens_2608": "%257B%2522user_unique_id%2522%253A%25227441043812309829155%2522%252C%2522web_id%2522%253A%25227441043812309829155%2522%252C%2522timestamp%2522%253A1732503760378%257D",
    "passport_csrf_token": "cb21d93a190bcd021653a667e7637592",
    "passport_csrf_token_default": "cb21d93a190bcd021653a667e7637592",
    "csrf_session_id": "",
    "msToken": "TtrzVL8C63YDHIrXQ65olqzBw2bl5ABoYyuJBWRdz3K0UjzJq-Rn82JAf5AVebPchO7CPqjKlMan4QIdmQCiAbQMJr7Mn9e0DE7c-0cukR9CeVJPD594kXkgx9J_TRbL",
    "n_mh": "m4Nwod14ocYxZ8VeMr34-AMseNqHnd0sqChhin9oDYw",
    "sid_guard": "53253ade00c8e77c18e9dba6d7e78ac3%7C1732513119%7C31536000%7CTue%2C+25-Nov-2025+05%3A38%3A39+GMT",
    "sid_tt": "53253ade00c8e77c18e9dba6d7e78ac3",
    "uid_tt": "360e9fb36b833373e3d52d26918c257e",
    "uid_tt_ss": "360e9fb36b833373e3d52d26918c257e"
}

const getTokenParams = (cookie) => {
    const cookieTokens = {
        aid: "",
        uuid: "",
        user_unique_id: "",
        web_id: ""
    };

    const tokensReg = /^__tea_cookie_tokens_(\d+)$/;
    // @ts-ignore
    for (const [ key, value ] of Object.entries(cookie)) {
        if (tokensReg.test(key)) {
            cookieTokens.aid = key.match(tokensReg)[1];
            const json = JSON.parse(decodeURIComponent(decodeURIComponent(value.toString())));
            cookieTokens.uuid = json.user_unique_id;
            cookieTokens.user_unique_id = json.user_unique_id;
            cookieTokens.web_id = json.web_id;
            break;
        }
    }

    return cookieTokens;
}

module.exports = {
    COOKIE,
    getTokenParams
}
