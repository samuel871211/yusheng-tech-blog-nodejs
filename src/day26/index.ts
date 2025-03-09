import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day26Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day26');
} 