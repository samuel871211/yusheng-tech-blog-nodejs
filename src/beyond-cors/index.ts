import { readFileSync } from "fs";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { http5000Server, http5001Server } from "./httpServers";
import { join } from "path";

const indexHTML = readFileSync(join(__dirname, "index.html"));

http5000Server.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);

  // CORP Test
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(indexHTML);
    return;
  }

  // COEP Test
  if (req.url == "/require-corp") {
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Content-Type", "text/html");
    res.end(indexHTML);
    return;
  }
  if (req.url == "/credentialless") {
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
    res.setHeader("Content-Type", "text/html");
    res.end(indexHTML);
    return;
  }

  return notFoundListener(req, res);
});

http5001Server.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);

  // CORP same-origin Test
  // if (req.url === "/style.css") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  //   res.setHeader("Content-Type", "text/css");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/image.png") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  //   res.setHeader("Content-Type", "image/png");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/script.js") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  //   res.setHeader("Content-Type", "text/javascript");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/video.mp4") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  //   res.setHeader("Content-Type", "video/mp4");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/audio.aac") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  //   res.setHeader("Content-Type", "audio/aac");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/with-corp.html") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  //   res.setHeader("Content-Type", "text/html");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/with-x-frame-options.html") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("X-Frame-Options", "SAMEORIGIN");
  //   res.setHeader("Content-Type", "text/html");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/with-csp-frame-ancestors.html") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
  //   res.setHeader("Content-Type", "text/html");
  //   res.end("123");
  //   return;
  // }

  // CORP same-site Test
  // if (req.url === "/style.css") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  //   res.setHeader("Content-Type", "text/css");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/image.png") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  //   res.setHeader("Content-Type", "image/png");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/script.js") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  //   res.setHeader("Content-Type", "text/javascript");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/video.mp4") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  //   res.setHeader("Content-Type", "video/mp4");
  //   res.end("123");
  //   return;
  // }
  // if (req.url === "/audio.aac") {
  //   console.log(req.url, req.headers.cookie);
  //   res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  //   res.setHeader("Content-Type", "audio/aac");
  //   res.end("123");
  //   return;
  // }

  // CORP not specified Test
  if (req.url === "/style.css") {
    console.log(req.url, req.headers.cookie);
    res.setHeader("Content-Type", "text/css");
    res.end("123");
    return;
  }
  if (req.url === "/image.png") {
    console.log(req.url, req.headers.cookie);
    res.setHeader("Content-Type", "image/png");
    res.end("123");
    return;
  }
  if (req.url === "/script.js") {
    console.log(req.url, req.headers.cookie);
    res.setHeader("Content-Type", "text/javascript");
    res.end("123");
    return;
  }
  if (req.url === "/video.mp4") {
    console.log(req.url, req.headers.cookie);
    res.setHeader("Content-Type", "video/mp4");
    res.end("123");
    return;
  }
  if (req.url === "/audio.aac") {
    console.log(req.url, req.headers.cookie);
    res.setHeader("Content-Type", "audio/aac");
    res.end("123");
    return;
  }

  return notFoundListener(req, res);
});
