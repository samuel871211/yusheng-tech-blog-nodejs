import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day13Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day13');
} 