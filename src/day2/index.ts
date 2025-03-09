import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day2Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day2');
} 