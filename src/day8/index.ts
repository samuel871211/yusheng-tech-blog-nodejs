import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day8Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day8');
} 