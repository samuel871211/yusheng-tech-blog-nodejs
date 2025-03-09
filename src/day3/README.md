# Day3: HTTP 1.1 HOL (head-of-line) blocking

今天要來讓大家實際體驗 HTTP 1.1 HOL (head-of-line) blocking

首先，用 nodejs http module 建立一個簡易的 http server

```js
import { createServer } from 'http';
const httpServer = createServer().listen(5000);
httpServer.on('request', (req, res) => {
  setTimeout(() => { res.end("ok") }, 2000);
});
httpServer.on('connection', (req, res) => {
  console.log('connection');
});
```

再來用瀏覽器打開 http://localhost:5000，打開 F12 > Console 輸入以下程式碼

按下 Enter 之前，請各位想想

1. 以下請求會同時發出去嗎?

2. 總共會看到幾次 `console.log('connection')` 呢?

```js
const responses = await Promise.all([
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000")
]);
```

公布答案，
1. 不會，第 7 個 request 被停滯了
2. 觸發 6 次
![browerMaxConnection](圖片地址)
```
[nodemon] starting `ts-node src/index.ts`
connection
connection
connection
connection
connection
connection
```

為什麼會這樣呢?我們看看 MDN 的解說

https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http2_messages

```
This means that browsers are limited in the number of resources that they can download and render at the same time, which has typically been limited to 6 parallel connections.
```

前面 6 個請求會建立 6 個 parallel TCP Connection

第 7 個請求則因為 HTTP 1.1 預設 Keep-Alive 的機制

所以可以重複使用同樣的 TCP Connection

那我們再進一步嘗試，如果一次發 12 個請求呢?

1. 以下請求會同時發出去嗎?

2. 總共會看到幾次 `console.log('connection')` 呢?

```js
const responses = await Promise.all([
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
  fetch("http://localhost:5000"),
]);
```

聰明的小夥伴們肯定想到答案了

1. 1 ~ 6 會在第一波發出去，7 ~ 12 會在第二波發出去

2. 6 次，因為 7 ~ 12 個請求可以重複使用前面的 TCP Connection
![browerMaxConnection](圖片地址)
```
[nodemon] starting `ts-node src/index.ts`
connection
connection
connection
connection
connection
connection
```

而 HTTP2 的 `multiplexing` 解決了這個問題，我們來看看 MDN 原文的解說

https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http2_messages

```
HTTP/2 allows you to use a single TCP connection for multiple requests and responses at the same time. This is done by wrapping messages into a binary frame and sending the requests and responses in a numbered stream on a connection. Data and header frames are handled separately, which allows headers to be compressed via an algorithm called HPACK. Using the same TCP connection to handle multiple requests at the same time is called multiplexing.
```

我們接著來嘗試 HTTP2 的威力!這邊使用的是 postman 提供的 API

```js
const responses = await Promise.all([
  fetch("https://postman-echo.com/delay/5"),
  fetch("https://postman-echo.com/delay/5"),
  fetch("https://postman-echo.com/delay/5"),
  fetch("https://postman-echo.com/delay/5"),
  fetch("https://postman-echo.com/delay/5"),
  fetch("https://postman-echo.com/delay/5"),
  fetch("https://postman-echo.com/delay/5"),
]);
```

可以看到第 7 個請求就不需要等待第 1 個請求結束才能發

因為這些請求都是共用同一個 TCP Connection

![browerMaxConnection](圖片地址)

今天我們學到了 HTTP 1.1 跟 HTTP 2 的演進

希望能讓各位夥伴對 HTTP 更熟悉一點

## 參考資料
- https://developer.mozilla.org/en-US/docs/Glossary/Head_of_line_blocking