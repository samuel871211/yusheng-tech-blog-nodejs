import net, { Socket } from "net";
import tls, { TLSSocket } from "tls";

function createTLSSocket(url: URL) {
  return new Promise<tls.TLSSocket>((resolve) => {
    const socket = net.connect(443, url.host);
    socket.on("connect", () => {
      const tlsSocket = tls.connect({ socket, servername: url.host });
      tlsSocket.on("secureConnect", () => resolve(tlsSocket));
    });
  });
}
function readSocketData(socket: Socket | TLSSocket) {
  return new Promise<string>((resolve) => {
    const chunks: Buffer[] = [];
    socket.on("data", (chunk) => chunks.push(chunk));
    socket.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}

function writeAsync(socket: Socket | TLSSocket, buffer: string) {
  return new Promise<true>((resolve) =>
    socket.write(buffer, () => resolve(true)),
  );
}
export { createTLSSocket, readSocketData, writeAsync };
