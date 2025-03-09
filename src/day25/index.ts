import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day25Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day25');
} 