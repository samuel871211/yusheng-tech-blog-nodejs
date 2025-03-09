import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day7Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day7');
} 