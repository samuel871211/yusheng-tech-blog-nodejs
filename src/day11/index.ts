import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day11Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day11');
} 