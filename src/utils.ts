import net, { Socket } from "net";
import tls, { TLSSocket } from "tls";

function createSocket(url: URL) {
  return new Promise<net.Socket>((resolve) => {
    const socket = net.connect(parseInt(url.port), url.hostname);
    socket.on("connect", () => resolve(socket));
  });
}

function createTLSSocket(url: URL) {
  return new Promise<tls.TLSSocket>((resolve) => {
    const socket = net.connect(443, url.hostname);
    socket.on("connect", () => {
      const tlsSocket = tls.connect({ socket, servername: url.host });
      tlsSocket.on("secureConnect", () => resolve(tlsSocket));
    });
  });
}
function readSocketData(socket: Socket | TLSSocket) {
  return new Promise<Buffer<ArrayBuffer>>((resolve) => {
    const chunks: Buffer[] = [];
    socket.on("data", (chunk) => chunks.push(chunk));
    socket.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

function writeAsync(socket: Socket | TLSSocket, buffer: string) {
  return new Promise<true>((resolve) =>
    socket.write(buffer, () => resolve(true)),
  );
}
export { createSocket, createTLSSocket, readSocketData, writeAsync };
