import httpServer from "../httpServer";
import send from "send";
import { notFoundListener } from "../listeners/notFoundlistener";
import { faviconListener } from "../listeners/faviconListener";
import { createReadStream, readFileSync } from "fs";
import { join } from "path";
import {
  IncomingMessage,
  RequestListener,
  ServerResponse,
  STATUS_CODES,
} from "http";

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/article.txt") {
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    return send(req, String(req.url), { root: __dirname }).pipe(res);
  }
  if (req.url === "/ElephantsDream.mp4") return rangeListener(req, res);
  return notFoundListener(req, res);
});

const mp4file = readFileSync(join(__dirname, "ElephantsDream.mp4"));
const rangeListener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  const range = req.headers.range;

  res.setHeader("Content-Type", "video/mp4");
  // invalid range
  if (!range || !range.startsWith("bytes=")) return res.end(mp4file);

  const [startStr, endStr] = range.split("bytes=")[1].split("-");
  const start = parseInt(startStr);
  const end = endStr === "" ? mp4file.byteLength - 1 : parseInt(endStr);

  // 416
  if (start > end || start > mp4file.byteLength) {
    res.statusCode = 416;
    res.setHeader("Content-Range", `bytes */${mp4file.byteLength}`);
    res.end(STATUS_CODES[416]);
    return;
  }

  const options = { start, end };
  const readStream = createReadStream(
    join(__dirname, "ElephantsDream.mp4"),
    options,
  );
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Content-Range", `bytes ${start}-${end}/${mp4file.byteLength}`);
  res.setHeader("Content-Length", end - start + 1);
  res.statusCode = 206;
  readStream.pipe(res);
};
