import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day21Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day21');
} 