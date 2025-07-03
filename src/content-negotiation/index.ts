import Negotiator from "negotiator";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.on("request", function requestListener(req, res) {
  const negotiator = new Negotiator({ headers: req.headers });
  console.log("charsets", negotiator.charsets());
  console.log("encodings", negotiator.encodings());
  console.log("languages", negotiator.languages());
  console.log("mediaTypes", negotiator.mediaTypes());

  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/") {
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        charsets: negotiator.charsets(),
        encodings: negotiator.encodings(),
        languages: negotiator.languages(),
        mediaTypes: negotiator.mediaTypes(),
      }),
    );
    return;
  }
  return notFoundListener(req, res);
});
