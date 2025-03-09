import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day10Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day10');
} 