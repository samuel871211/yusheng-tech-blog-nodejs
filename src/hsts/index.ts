import httpsServer from "../https-server/httpsServer";
import httpServer from "../httpServer";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.removeAllListeners("request");
httpServer.on("request", function httpRequestListener(req, res) {
  console.log("receive request from https server port 5001");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );
  if (req.url === "/") return res.end();
  return notFoundListener(req, res);
});

httpsServer.removeAllListeners("request");
httpsServer.on("request", function httpsRequestListener(req, res) {
  // res.setHeader(
  //   "Strict-Transport-Security",
  //   "max-age=31536000; includeSubDomains",
  // );

  res.setHeader("Strict-Transport-Security", "max-age=0");
  if (req.url === "/") return res.end();
  return notFoundListener(req, res);
});
