import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day15Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day15');
} 