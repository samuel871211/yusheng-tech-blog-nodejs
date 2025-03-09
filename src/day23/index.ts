import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day23Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day23');
} 