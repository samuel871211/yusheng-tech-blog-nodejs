import { readFileSync } from "fs";
import httpServer from "../httpServer";
import { join } from "path";

httpServer.on("request", function requestListener(req, res) {
  console.log({ url: req.url, method: req.method });

  // 30x redirect
  // res.statusCode = 301;
  // res.setHeader("Location", "http://172.31.0.1:5000");
  // res.end();
  // return;

  // index.html
  res.end(readFileSync(join(__dirname, "index.html")));
});
