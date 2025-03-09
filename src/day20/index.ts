import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day20Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day20');
} 