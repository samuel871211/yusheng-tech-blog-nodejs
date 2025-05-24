import httpServer from "../httpServer";

// 測試 referer
httpServer.on("request", (req, res) => {
  console.log(req.headers.referer);
  res.setHeader("Content-Type", "text/html");
  res.end(`<!DOCTYPE html>
<html>
  <head>
      <meta name="referrer" content="origin" />
  </head>
  <body>
      <a href="http://localhost:5000/" target="_blank" referrerpolicy="unsafe-url">google</a>
      <a href="http://localhost:5000/" target="_blank" rel="noreferrer">google</a>
      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" referrerpolicy="no-referrer" />
      <script src="https://unpkg.com/react@18/umd/react.development.js" referrerpolicy="no-referrer"></script>
  </body>
</html>`);
});
