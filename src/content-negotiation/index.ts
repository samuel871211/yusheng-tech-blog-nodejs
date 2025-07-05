import Negotiator from "negotiator";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { readFileSync } from "fs";
import { join } from "path";

const png = readFileSync(join(__dirname, "android-chrome-512x512.png"));
const acceptAsResponseHeaderTestHTML = readFileSync(
  join(__dirname, "accept-as-response-header-test.html"),
);
const availableMediaTypes = ["application/json", "text/html"];
const availableLanguages = ["zh-TW", "en-US"];
const messages: { [key: string]: { [key: string]: string | NonSharedBuffer } } =
  {
    "zh-TW": {
      "application/json": JSON.stringify({ message: "您好世界" }),
      "text/html": readFileSync(join(__dirname, "zh-TW.html")),
    },
    "en-US": {
      "application/json": JSON.stringify({ message: "hello world" }),
      "text/html": readFileSync(join(__dirname, "en-US.html")),
    },
  };

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  // content-negotiation
  if (req.url === "/") {
    const negotiator = new Negotiator({ headers: req.headers });

    const language = String(negotiator.language(availableLanguages));
    const mediaType = String(negotiator.mediaType(availableMediaTypes));
    const message = messages[language]?.[mediaType];
    if (message) {
      res.setHeader("Content-Language", language);
      res.setHeader("Content-Type", mediaType);
      res.end(message);
      return;
    }
    // fallback case
    // we could return 406, but return 200 with default resource would be preferable
    res.setHeader("Content-Language", availableLanguages[0]);
    res.setHeader("Content-Type", availableMediaTypes[0]);
    res.end(messages[availableLanguages[0]][availableMediaTypes[0]]);
    return;
  }
  // Accept as Response Header Test
  if (req.url === "/accept-as-response-header-test.html") {
    res.setHeader("Content-Type", "text/html");
    res.end(acceptAsResponseHeaderTestHTML);
    return;
  }
  if (req.url === "/image1.png") {
    console.log("image1.png", req.headers.accept);
    res.setHeader("Accept", "image/png");
    res.end(png);
    return;
  }
  if (req.url === "/image2.png") {
    console.log("image2.png", req.headers.accept);
    res.setHeader("Accept", "image/png");
    res.end(png);
    return;
  }
  return notFoundListener(req, res);
});
