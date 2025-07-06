import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

// Bad Practice，帳密不應該直接明碼直接寫在程式碼內
const basicAuthA = btoa("a:a");
const basicAuthB = btoa("b:b");

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);

  // test http://username:password@localhost:5000/
  // act as the origin server
  if (req.url === "/") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ headers: req.headers, url: req.url }));
    return;
  }
  // basic auth
  if (req.url === "/closedA") {
    if (req.headers.authorization !== `Basic ${basicAuthA}`) {
      res.statusCode = 401;
      res.setHeader("WWW-Authenticate", `Basic realm="Closed Site A"`);
      res.end();
      return;
    }
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Welcome to Closed Site A</h1>");
    return;
  }
  if (req.url === "/closedB") {
    if (req.headers.authorization !== `Basic ${basicAuthB}`) {
      res.statusCode = 401;
      res.setHeader("WWW-Authenticate", `Basic realm="Closed Site B"`);
      res.end();
      return;
    }
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Welcome to Closed Site B</h1>");
    return;
  }

  return notFoundListener(req, res);
});
