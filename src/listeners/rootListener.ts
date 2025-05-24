import { readFileSync } from "fs";
import { RequestListener, IncomingMessage, ServerResponse } from "http";
import { join } from "path";

const indexHTML = readFileSync(join(__dirname, "index.html"));

export const rootListener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(indexHTML);
};
