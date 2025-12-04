import httpServer from "../httpServer";

httpServer.on("request", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end("<script>alert(1)</script>");
});
