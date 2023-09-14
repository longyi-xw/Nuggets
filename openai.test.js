const { fetchApi, Method } = require("./src/fetch");

(async function () {
    const params = {
        "model": "text-davinci-003",
        "prompt": "Say this is a test",
        "temperature": 0,
        "top_p": 1,
        "n": 1,
        "stream": false
    }

    const data = await fetchApi("https://api.openai.com/v1/completions", Method.POST, params)
    console.log(data)
})()