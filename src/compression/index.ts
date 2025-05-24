import { readFileSync } from "node:fs";
import httpServer from "../httpServer";
import {
  gunzipSync,
  gzipSync,
  brotliCompressSync,
  deflateSync,
} from "node:zlib";
import { join } from "node:path";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

/**
 * 使用 [react 18.3.1](https://unpkg.com/react@18.3.1/umd/react.development.js) 當作要 serve 的靜態資源，並且預先壓縮
 */
const selfHostReactJs = readFileSync(join(__dirname, "./react.development.js"));
const gzipSelfHostReactJs = gzipSync(selfHostReactJs);
const brotliSelfHostReactJs = brotliCompressSync(selfHostReactJs);
const deflateSelfHostReactJs = deflateSync(selfHostReactJs);
const encodedSelfHostReactJsMap = {
  gzip: gzipSelfHostReactJs,
  deflate: deflateSelfHostReactJs,
  br: brotliSelfHostReactJs,
};
type ServerAcceptedEncoding = keyof typeof encodedSelfHostReactJsMap;
type EncodingPreference = { encoding: string; q: number };

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  else if (req.url === "/") {
    const acceptEncoding = req.headers["accept-encoding"];
    const encodingPreferenceList: EncodingPreference[] = String(acceptEncoding)
      .split(",")
      .map((part) => {
        const [encoding, qPart] = part.trim().split(";");
        const q = qPart ? parseFloat(qPart.split("=")[1]) : 1.0;
        return { encoding: encoding.trim(), q };
      })
      // 依照 q-value 排序，從高到低
      .sort((a, b) => b.q - a.q);

    // 暫不處理 identity 或是 * 或是 q=0 這些特殊情境
    for (const { encoding } of encodingPreferenceList) {
      const encodedSelfHostReactJs =
        encodedSelfHostReactJsMap[encoding as ServerAcceptedEncoding];
      if (encodedSelfHostReactJs) {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Content-Encoding", encoding);
        res.end(encodedSelfHostReactJs);
        return;
      }
    }
    // 開啟這行，
    // res.setHeader('Content-Encoding', 'gzip');
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.end(selfHostReactJs);
  } else if (
    req.url === "/postGzipped" &&
    req.method?.toLowerCase() === "post"
  ) {
    // 檢查 contentEncoding 是否為 Server 可處理的類型
    const contentEncoding = req.headers["content-encoding"];
    if (contentEncoding !== "gzip") {
      res.statusCode = 415;
      res.setHeader("Accept-Encoding", "gzip");
      res.end();
      return;
    }
    // 檢查 contentType 是否有值
    const contentType = req.headers["content-type"];
    if (!contentType) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/plain");
      res.end("Invalid Content Type");
      return;
    }

    // 開始讀取 req.body
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const decompressedBuffer = gunzipSync(Buffer.concat(chunks));
      const decompressedString = decompressedBuffer.toString("utf-8");
      // 非最佳實踐，需先確認為合法的 contentType
      res.setHeader("Content-Type", contentType);
      res.end(decompressedString);
    });
  } else return notFoundListener(req, res);
});
