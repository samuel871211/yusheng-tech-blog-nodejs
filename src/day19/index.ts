import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const day19Listener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.end('day19');
} 