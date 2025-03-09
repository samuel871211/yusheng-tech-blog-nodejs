import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day17Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day17');
} 