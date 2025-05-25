import { STATUS_CODES } from "http";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { Agent, RetryAgent } from "undici";

httpServer.removeAllListeners("request");
httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);

  if (req.url === "/200") {
    console.timeLog("Retry-After");
    console.log({ url: req.url, headers: req.headers });
    res.statusCode = 200;
    res.setHeader("Retry-After", 3);
    return res.end(STATUS_CODES[200]);
  }

  if (req.url === "/429") {
    console.timeLog("Retry-After");
    console.log({ url: req.url, headers: req.headers });
    res.statusCode = 429;
    res.setHeader("Retry-After", 3);
    return res.end(STATUS_CODES[429]);
  }

  if (req.url === "/503") {
    res.statusCode = 503;
    res.setHeader("Retry-After", 3);
    return res.end(STATUS_CODES[503]);
  }

  if (req.url === "/200-with-date") {
    res.statusCode = 200;
    res.setHeader("Retry-After", new Date(Date.now() + 3000).toUTCString());
    return res.end(STATUS_CODES[200]);
  }

  if (req.url === "/429-with-date") {
    console.timeLog("Retry-After");
    console.log(req.url, req.headers);
    res.statusCode = 429;
    res.setHeader("Retry-After", new Date(Date.now() + 3000).toUTCString());
    return res.end(STATUS_CODES[429]);
  }

  if (req.url === "/503-with-date") {
    res.statusCode = 503;
    res.setHeader("Retry-After", new Date(Date.now() + 3000).toUTCString());
    return res.end(STATUS_CODES[503]);
  }

  return notFoundListener(req, res);
});

console.time("Retry-After");
const httpClientWithRetry = new RetryAgent(new Agent(), { maxRetries: 2 });
httpClientWithRetry
  .request({
    origin: "http://localhost:5000",
    path: "/200",
    method: "GET",
  })
  .then((response) => response.body.text())
  .then((bodyText) => bodyText)
  .catch((err) => err);
