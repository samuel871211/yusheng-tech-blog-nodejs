import {
  RequestListener,
  IncomingMessage,
  ServerResponse,
  STATUS_CODES,
} from "http";

export const notFoundListener: RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
> = (req, res) => {
  res.statusCode = 404;
  res.end(STATUS_CODES[404]);
};
