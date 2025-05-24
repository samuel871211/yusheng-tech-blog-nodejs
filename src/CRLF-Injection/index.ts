import httpServer from "../httpServer";
import { parse } from "url";

// 案例1：redirect
httpServer.on("request", function requestListener(req, res) {
  // 防呆
  if (!res.socket) return;

  // parse request url
  const parseQueryString = true;
  const urlWithParsedQuery = parse(req.url || "", parseQueryString);
  const { redirect } = urlWithParsedQuery.query;

  // setup 302 redirect
  if (
    typeof redirect === "string" &&
    redirect.startsWith("http://localhost:5000")
  ) {
    res.socket.write("HTTP/1.1 302 Found\r\n");
    res.socket.write("Connection: Close\r\n");
    res.socket.write(`Location: ${redirect}\r\n`);
    res.socket.write("\r\n");
    res.socket.end();
    res.socket.destroy();
    return;
  }

  // 顯示 pathname
  const responseHTML = urlWithParsedQuery.pathname || "";
  res.socket.write("HTTP/1.1 200 OK\r\n");
  res.socket.write("Content-Type: text/html\r\n");
  res.socket.write("Connection: Close\r\n");
  res.socket.write(`Content-Length: ${responseHTML.length}\r\n`);
  res.socket.write("\r\n");
  res.socket.write(responseHTML);
  res.socket.end();
  res.socket.destroy();
});

// 案例2：使用者語系塞入 cookie
// httpServer.on('request', function requestListener(req, res) {
//   // 防呆
//   if (!res.socket) return;

//   // parse request url
//   const parseQueryString = true;
//   const urlWithParsedQuery = parse(req.url || "", parseQueryString);
//   const { lang } = urlWithParsedQuery.query;

//   res.socket.write('HTTP/1.1 200 OK\r\n');
//   res.socket.write('Connection: Close\r\n');
//   res.socket.write(`Set-Cookie: lang=${lang}\r\n`);
//   res.socket.write('\r\n');
//   res.socket.end();
//   res.socket.destroy();
//   return;
// })
