import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day9Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day9');
} 