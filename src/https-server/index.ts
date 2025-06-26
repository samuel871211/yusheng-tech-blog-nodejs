import httpsServer from "./httpsServer";

httpsServer.on("request", function requestListener(req, res) {
  res.end("HTTPS Server Successfully Started!!!");
});
