import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day14Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day14');
} 