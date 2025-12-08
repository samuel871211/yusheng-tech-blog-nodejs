import { readFileSync } from "fs";
import httpServer, { http5001Server } from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { join } from "path";

httpServer.on("request", (req, res) => {
  const url = new URL(req.url || "", "http://localhost:5000");
  if (url.pathname === "/page2.js") {
    res.setHeader("content-type", "text/javascript");
    res.setHeader("Cache-Control", "public, max-age=60");
    res.end("console.log('hello world')");
    return;
  }
  if (url.pathname === "/") {
    res.setHeader("content-type", "text/html");
    res.end(readFileSync(join(__dirname, "index.html")));
    return;
  }
  if (url.pathname === "/page2") {
    res.setHeader("content-type", "text/html");
    res.end(readFileSync(join(__dirname, "page2.html")));
    return;
  }
  if (url.pathname === "/preload") {
    res.setHeader(
      "link",
      `<http://localhost:5001/preload.js>; rel="preload"; as="script"`,
    );
    res.setHeader("content-type", "text/html");
    res.end(readFileSync(join(__dirname, "preload.html")));
    return;
  }
  if (url.pathname === "/js-with-link-preload") {
    res.setHeader(
      "link",
      `<http://localhost:5001/preload.js>; rel="preload"; as="script"`,
    );
    res.setHeader("content-type", "text/javascript");
    res.end(`const hello = "world";`);
  }
  if (url.pathname === "/preconnect") {
    res.setHeader("link", `<http://localhost:5001>; rel="preconnect"`);
    res.setHeader("content-type", "text/html");
    res.end(readFileSync(join(__dirname, "preconnect.html")));
    return;
  }
  if (url.pathname === "/favicon.ico") return faviconListener(req, res);
  return notFoundListener(req, res);
});

http5001Server.on("request", (req, res) => {
  const url = new URL(req.url || "", "http://localhost:5001");
  if (url.pathname === "/preload.js") {
    console.log(url.searchParams);
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("content-type", "text/javascript");
    res.end(`const preload = true;`);
    return;
  }
  if (url.pathname === "/script.js") {
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("content-type", "text/javascript");
    res.end("a"); // 刻意觸發 Uncaught ReferenceError: a is not defined
    return;
  }
  // if (url.pathname === "/connection-closed") {
  //   res.
  // }
});

http5001Server.on("connection", (socket) => {
  console.log("connection", new Date().toISOString());
});

http5001Server.timeout = 5000;
// http5001Server.requestTimeout = 3000;
http5001Server.on("connection", (socket) => {
  console.log("connection");
  console.time("connection");
  socket.on("error", console.log);
  socket.on("close", (hadError) => {
    console.timeEnd("connection");
    console.log({ event: "close", hadError });
  });
});
