// txt 文件下載
// import httpServer from "../httpServer";
// httpServer.on('request', function requestListener (req, res) {
//   res.setHeader("Content-Disposition", "attachment; filename=hello world.txt");
//   res.end("hello world");
// });

// 圖片下載
import httpServer from "../httpServer";
import { readFileSync } from "fs";
import { join } from "path";
const image = readFileSync(join(__dirname, 'image.jpg'));
httpServer.on('request', function requestListener (req, res) {
  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Content-Disposition", "attachment; filename=image.jpg");
  res.end(image);
});
