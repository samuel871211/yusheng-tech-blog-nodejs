import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day3Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day3');
} 