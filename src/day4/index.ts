import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day4Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day4');
} 