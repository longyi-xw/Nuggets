const { fetchApi, Method } = require("./src/fetch");

(async function () {
  const params = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "你好" }],
    temperature: 0.7,
    // "stream": false
  };

  const data = await fetchApi(
    "https://api.chatanywhere.com.cn/v1/chat/completions",
    Method.POST,
    params
  );
  console.log(data.choices[0].message);
})();
