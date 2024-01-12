const { fetchApi, Method } = require("./src/fetch");

(async function () {
  const data = await fetchApi(
    "https://api.chatanywhere.com.cn/v1/chat/completions",
    Method.POST,
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "突然发现今天是我生日，还只有我爸妈记得，早上还来个电话让我今天吃好点[流泪]",
        },
      ],
      temperature: 0.7,
    }
  );

  console.log(data.choices[0].message.content);
})();
