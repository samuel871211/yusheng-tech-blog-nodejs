import { createSocket, readSocketData } from "../utils";

async function pipeline() {
  const url = new URL("http://localhost:5000");
  const socket = await createSocket(url);
  socket.write(
    `GET / HTTP/1.1
Host: localhost

GET /?sleepMs=1000 HTTP/1.1
Host: localhost

GET /?sleepMs=2000 HTTP/1.1
Host: localhost

`.replaceAll("\n", "\r\n"),
  );
  const responseBuffer = await readSocketData(socket);
  const response = responseBuffer.toString("utf8");
  console.log(response);
}

pipeline();
