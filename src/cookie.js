const COOKIE = {
    "__tea_cookie_tokens_2608": "%257B%2522user_unique_id%2522%253A%25227246965070184531495%2522%252C%2522web_id%2522%253A%25227246965070184531495%2522%252C%2522timestamp%2522%253A1721874302049%257D",
    "passport_csrf_token": "23e3ad1c1452a17de88d9434ea353744",
    "passport_csrf_token_default": "23e3ad1c1452a17de88d9434ea353744",
    "csrf_session_id": "",
    "msToken": "lUIjDi1KfiXypGgDt4KgCqJHwK-ajpXHixCAJw3rIKsb7w8vRB8WjqmM642qATWYzl4v2eOXw27Sqow5rCF14EGIO3XkPZPNTZujay-RpSzkhWAoTeBg7y2OnWkXbsc%3D",
    "n_mh": "m4Nwod14ocYxZ8VeMr34-AMseNqHnd0sqChhin9oDYw",
    "sid_guard": "3c9107823affbdb408f41affaec50576%7C1722415338%7C31536000%7CThu%2C+31-Jul-2025+08%3A42%3A18+GMT",
    "sid_tt": "3c9107823affbdb408f41affaec50576",
    "uid_tt": "cc04021c192331a70120fe8eefdb0a50",
    "uid_tt_ss": "cc04021c192331a70120fe8eefdb0a50"
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
