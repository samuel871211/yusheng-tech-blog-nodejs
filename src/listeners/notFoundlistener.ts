import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const notFoundListener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.statusCode = 404;
  res.end();
} 