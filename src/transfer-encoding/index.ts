import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.removeAllListeners('request');

const firstline = "firstline~~~";
const secondline = "secondline~~~";
const thirdline = "thirdline~~~";

httpServer.on('request', function requestListener(req, res) {
    if (req.url === "/favicon.ico") return faviconListener(req, res);
    // chunked with text/plain
    if (req.url === "/case1") {
        res.setHeader("Content-Type", "text/plain");
        // res.write 會自動幫忙處理 transfer-encoding：chunked 的格式
        res.write(firstline);
        res.write(secondline);
        res.end(thirdline);
        return;
    }
    // chunked with socket.write
    if (req.url === "/case2") {
        // 先送 header 出去
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("transfer-encoding", "chunked");
        res.flushHeaders();

        // 使用 socket.write 自行處理 transfer-encoding: chunked 的格式
        res.socket?.write(`${Buffer.byteLength(firstline).toString(16)}\r\n${firstline}\r\n`);
        res.socket?.write(`${Buffer.byteLength(secondline).toString(16)}\r\n${secondline}\r\n`);
        res.socket?.write(`${Buffer.byteLength(thirdline).toString(16)}\r\n${thirdline}\r\n`);
        res.socket?.end("0\r\n\r\n");
        return;
    }
    // chunked with content-length
    if (req.url === "/case3") {
        const contentLength = Buffer.byteLength(firstline) + Buffer.byteLength(secondline) + Buffer.byteLength(thirdline);
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Content-Length", contentLength);
        res.setHeader("Transfer-Encoding", "chunked");
        res.write(firstline);
        res.write(secondline);
        res.end(thirdline);
        return;
    }
    // chunked with application/json
    if (req.url === "/case4") {
        const chunkSplitIndex = 20;
        const jsonString = JSON.stringify({
            id: 123,
            name: "456",
            age: 18,
            email: "example@gmail.com"
        });
        res.setHeader("Content-Type", "application/json");
        // res.write 會自動幫忙處理 transfer-encoding：chunked 的格式
        res.write(jsonString.slice(0, chunkSplitIndex));
        res.end(jsonString.slice(chunkSplitIndex));
        return;
    }
    // chunked with slow data transfer
    if (req.url === "/case5") {
        let index = 0;
        const maxIndex = 5;
        const interval = setInterval(() => {
            res.write(index.toString());
            index += 1;
            if (index === maxIndex) {
                clearInterval(interval);
                res.end();
            }
        }, 1000);
        return;
    }

    return notFoundListener(req, res);
});