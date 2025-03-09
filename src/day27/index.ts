import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day27Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day27');
} 