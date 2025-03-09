import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day22Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day22');
} 