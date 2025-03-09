import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day12Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day12');
} 