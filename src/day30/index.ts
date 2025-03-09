import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day30Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day30');
} 