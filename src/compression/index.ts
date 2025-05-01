
import httpServer from "../httpServer";
import zlib from 'node:zlib';

httpServer.on('request', function requestListener (req, res) {
  res.end('hello')
});
