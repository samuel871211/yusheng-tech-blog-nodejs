import httpServer from "../httpServer";

// todo-yusheng 研究要怎麼防範資安漏洞
httpServer.on("request", function requestListener(req, res) {
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(req.headers));
});
