import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day16Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day16');
} 