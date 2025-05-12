import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { readFileSync } from "fs";
import { join } from "path";

const image = readFileSync(join(__dirname, 'image.jpg'));
httpServer.on('request', function requestListener (req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);

  // Server 沒有設置 `Content-Type`，瀏覽器的 MIME sniffing 機制認定這是 `text/javascript`
  if (req.url === "/script.png") return res.end('<script>alert("XSS")</script>');
  
  // image.jpg 雖然有設定 `Content-Type: text/plain`，但還是被瀏覽器解析成圖片
  if (req.url === "/image.jpg") {
    res.setHeader("Content-Type", "text/plain");
    // turn on 'nosniff' mode
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.end(image);
    return;
  }

  // 雖然該 Server 有設定 `Content-Type: text/html`，但內容是 JavaScript，故被瀏覽器解析
  if (req.url === "/chatroom.html") {
    res.setHeader("Content-Type", "text/html");
    res.end('<script src="https://learn-http-with-nodejs.web.app/img/mime-sniffing-xss-in-script-src.html"></script>');
    return;
  }
});