import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day18Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day18');
} 