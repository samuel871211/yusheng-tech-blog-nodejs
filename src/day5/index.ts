import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day5Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day5');
} 