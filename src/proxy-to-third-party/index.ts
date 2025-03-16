import httpServer from "../httpServer";
import { createServer, request } from "http";

const API_KEY = "API_KEY_STORED_IN_ENV_FILE";
const SOME_THIRD_PARTY_URL = "http://localhost:5001/third-party";
httpServer.on('request', function requestListener(req, res) {
  if (req.url === "/proxy") {
    const proxyRequest = request(SOME_THIRD_PARTY_URL, {
      method: "POST",
      headers: {
        authorization: `Basic ${API_KEY}`
      }
    });
    // 將第三方 API 的回應流 pipe 到我們的 response
    proxyRequest.on('response', (proxyResponse) => {
      proxyResponse.pipe(res);
    });
    // 將客戶端請求的內容 pipe 到 proxy request
    req.pipe(proxyRequest);
    return;
  }
  res.setHeader("Content-Type", "text/html");
  res.end("Welcome to proxy-to-third-party lesson");
});




















const thirdPartyHttpServer = createServer().listen(5001);
thirdPartyHttpServer.on('request', function thirdPartyHttpServerRequestListener(req, res) {
  // 模擬 third_party response
  if (req.url === "/third-party") {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      statusCode: 400,
      message: "Invalid API Key",
      someSensitiveInformation: "exposed!!!"
    }));
    return;
  }
  res.setHeader("Content-Type", "text/html");
  res.end("Welcome to third-party service");
})