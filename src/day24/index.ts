import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day24Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day24');
} 