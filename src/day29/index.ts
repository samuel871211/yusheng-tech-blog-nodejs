import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day29Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day29');
} 