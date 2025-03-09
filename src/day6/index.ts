import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day6Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day6');
} 