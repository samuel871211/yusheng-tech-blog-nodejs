import { readFileSync } from "node:fs";
import httpServer from "../httpServer";
import { join } from "node:path";

httpServer.on("request", (req, res) => {
  const url = new URL(req.url || "", "http://localhost:5000");
  // res.setHeader("Content-Type", "text/html");
  // res.end(readFileSync(join(__dirname, "index.html")));

  res.statusCode = 302;
  res.setHeader("Location", "https://www.google.com");
  res.end();
});
