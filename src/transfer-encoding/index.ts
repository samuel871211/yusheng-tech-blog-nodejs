import httpServer from "../httpServer";
import { gunzipSync, gzipSync, brotliCompressSync, deflateSync } from 'node:zlib';
const gzippedBuffer = gzipSync("123456789");

// todo-yusheng 還沒研究完
httpServer.removeAllListeners('request');
httpServer.on('request', function requestListener(req, res) {
    res.useChunkedEncodingByDefault
    res.setHeader('Transfer-Encoding', 'gzip, chunked');
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'inline');
    res.write(gzippedBuffer, () => setTimeout(() => res.end(), 2000));
});