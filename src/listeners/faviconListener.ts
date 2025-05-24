import { RequestListener, IncomingMessage, ServerResponse } from "http";

export const faviconListener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.statusCode = 204;
  res.end();
};
