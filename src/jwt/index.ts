import { decode, sign, verify } from "jsonwebtoken";

const secretOrPrivateKey = "secretOrPrivateKey";
const payload = "payload";
const jsonPayload = { data: "string" };
const subject = "userID";
const keyid = "path/to/key";
const jwtid = crypto.randomUUID();
const noTimestamp = true;
const issuer = "https://yusheng-tech-blog.web.app/";
const expiresIn = "2 days";
const audience = "yusheng-tech-blog.web.app";

// const token = sign(payload, secretOrPrivateKey)
// console.log(token)
// // eyJhbGciOiJIUzI1NiJ9.cGF5bG9hZA.Gf0NlYDUuvekZ9FBIeSuCzOxxvTx1-qAnuPrIn8DsZI
// console.log(decode(token, { complete: true }))
// // {
// //   header: { alg: 'HS256' },
// //   payload: 'payload',
// //   signature: 'Gf0NlYDUuvekZ9FBIeSuCzOxxvTx1-qAnuPrIn8DsZI'
// // }
// console.log(decode(token))
// // payload

// const token2 = sign(payload, secretOrPrivateKey, { subject })
// // Error: invalid subject option for string payload
// console.log(token2)

// const token3 = sign(jsonPayload, secretOrPrivateKey, { subject })
// console.log(token3)
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoic3RyaW5nIiwiaWF0IjoxNzYxNDQxMDU3LCJzdWIiOiJ1c2VySUQifQ.ORWZrTY8yERNox4-qQ4jiwHiGF1zGg-x4wRDx4ePdjI
// console.log(decode(token3, { complete: true }))
// // {
// //   header: { alg: 'HS256', typ: 'JWT' },
// //   payload: { data: 'string', iat: 1761441057, sub: 'userID' },
// //   signature: 'ORWZrTY8yERNox4-qQ4jiwHiGF1zGg-x4wRDx4ePdjI'
// // }
// console.log(decode(token3))
// // { data: 'string', iat: 1761441057, sub: 'userID' }

// const token4 = sign(jsonPayload, secretOrPrivateKey, { subject, keyid })
// console.log(token4)
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBhdGgvdG8va2V5In0.eyJkYXRhIjoic3RyaW5nIiwiaWF0IjoxNzYxNDQxNTQxLCJzdWIiOiJ1c2VySUQifQ.Uso-pT_KzGAXFY1c6t_GMi-7vkDEFoj3l1xYFC_Lzl8
// console.log(decode(token4, { complete: true }))
// // {
// //   header: { alg: 'HS256', typ: 'JWT', kid: 'path/to/key' },
// //   payload: { data: 'string', iat: 1761441541, sub: 'userID' },
// //   signature: 'Uso-pT_KzGAXFY1c6t_GMi-7vkDEFoj3l1xYFC_Lzl8'
// // }
// console.log(decode(token4))
// // { data: 'string', iat: 1761441541, sub: 'userID' }

// const token5 = sign(jsonPayload, secretOrPrivateKey, { subject, keyid, jwtid })
// console.log(token5)
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBhdGgvdG8va2V5In0.eyJkYXRhIjoic3RyaW5nIiwiaWF0IjoxNzYxNDQxNzkzLCJzdWIiOiJ1c2VySUQiLCJqdGkiOiJmNDdlYTVkMi1mYjRhLTQ2N2QtODU0ZS00ZTk2MzMwNDQ4YWIifQ._ecVoKU-cT1k7DOJsDcZmK4zvdv2DVq2cvLC_mKjZQw
// console.log(decode(token5, { complete: true }))
// // {
// //   header: { alg: 'HS256', typ: 'JWT', kid: 'path/to/key' },
// //   payload: {
// //     data: 'string',
// //     iat: 1761441793,
// //     sub: 'userID',
// //     jti: 'f47ea5d2-fb4a-467d-854e-4e96330448ab'
// //   },
// //   signature: '_ecVoKU-cT1k7DOJsDcZmK4zvdv2DVq2cvLC_mKjZQw'
// // }
// console.log(decode(token5))
// // {
// //   data: 'string',
// //   iat: 1761441793,
// //   sub: 'userID',
// //   jti: 'f47ea5d2-fb4a-467d-854e-4e96330448ab'
// // }

// const token6 = sign(jsonPayload, secretOrPrivateKey, { subject, keyid, jwtid, noTimestamp })
// console.log(token6)
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBhdGgvdG8va2V5In0.eyJkYXRhIjoic3RyaW5nIiwic3ViIjoidXNlcklEIiwianRpIjoiMmJlZjliMDYtZWZhYS00MGJiLTg3NGItMjExZGI0MGUzNzY4In0.-TX4oc28wc1ApF_oWTPxMbJqCD9FHWLEcWwOuVonUEk
// console.log(decode(token6, { complete: true }))
// // {
// //   header: { alg: 'HS256', typ: 'JWT', kid: 'path/to/key' },
// //   payload: {
// //     data: 'string',
// //     sub: 'userID',
// //     jti: '2bef9b06-efaa-40bb-874b-211db40e3768'
// //   },
// //   signature: '-TX4oc28wc1ApF_oWTPxMbJqCD9FHWLEcWwOuVonUEk'
// // }
// console.log(decode(token6))
// // {
// //   data: 'string',
// //   sub: 'userID',
// //   jti: '2bef9b06-efaa-40bb-874b-211db40e3768'
// // }

// const token7 = sign(jsonPayload, secretOrPrivateKey, { subject, keyid, jwtid, noTimestamp, issuer })
// console.log(token7)
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBhdGgvdG8va2V5In0.eyJkYXRhIjoic3RyaW5nIiwiaXNzIjoiaHR0cHM6Ly95dXNoZW5nLXRlY2gtYmxvZy53ZWIuYXBwLyIsInN1YiI6InVzZXJJRCIsImp0aSI6ImIyNzIyMzRjLWE5MmItNGFiZC1hN2ViLWFiN2E5OTE3MGJmZSJ9.zm2GnTQEvRF8GmRvthQ2rvyh2-fibZw7UHmvjaG_PhY
// console.log(decode(token7, { complete: true }))
// // {
// //   header: { alg: 'HS256', typ: 'JWT', kid: 'path/to/key' },
// //   payload: {
// //     data: 'string',
// //     iss: 'https://yusheng-tech-blog.web.app/',
// //     sub: 'userID',
// //     jti: 'b272234c-a92b-4abd-a7eb-ab7a99170bfe'
// //   },
// //   signature: 'zm2GnTQEvRF8GmRvthQ2rvyh2-fibZw7UHmvjaG_PhY'
// // }
// console.log(decode(token7))
// // {
// //   data: 'string',
// //   iss: 'https://yusheng-tech-blog.web.app/',
// //   sub: 'userID',
// //   jti: 'b272234c-a92b-4abd-a7eb-ab7a99170bfe'
// // }

// const token8 = sign(jsonPayload, secretOrPrivateKey, { subject, keyid, jwtid, noTimestamp, issuer, expiresIn })
// console.log(token8)
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBhdGgvdG8va2V5In0.eyJkYXRhIjoic3RyaW5nIiwiZXhwIjoxNzYxNjE1NDMwLCJpc3MiOiJodHRwczovL3l1c2hlbmctdGVjaC1ibG9nLndlYi5hcHAvIiwic3ViIjoidXNlcklEIiwianRpIjoiZDNlM2JjZTctYTIwZS00MmVkLWFjYTMtMmU4NjQ3MjAyNDA4In0.bNOGJ-AavXn451fkNJ0fS37kviiEVVU_-9S5kHakJV0
// console.log(decode(token8, { complete: true }))
// // {
// //   header: { alg: 'HS256', typ: 'JWT', kid: 'path/to/key' },
// //   payload: {
// //     data: 'string',
// //     exp: 1761615430,
// //     iss: 'https://yusheng-tech-blog.web.app/',
// //     sub: 'userID',
// //     jti: 'd3e3bce7-a20e-42ed-aca3-2e8647202408'
// //   },
// //   signature: 'bNOGJ-AavXn451fkNJ0fS37kviiEVVU_-9S5kHakJV0'
// // }
// console.log(decode(token8))
// // {
// //   data: 'string',
// //   exp: 1761615430,
// //   iss: 'https://yusheng-tech-blog.web.app/',
// //   sub: 'userID',
// //   jti: 'd3e3bce7-a20e-42ed-aca3-2e8647202408'
// // }

// const token9 = sign(jsonPayload, secretOrPrivateKey, { subject, keyid, jwtid, noTimestamp, issuer, expiresIn, audience })
// console.log(token9)
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBhdGgvdG8va2V5In0.eyJkYXRhIjoic3RyaW5nIiwiZXhwIjoxNzYxNjE1NTY4LCJhdWQiOiJ5dXNoZW5nLXRlY2gtYmxvZy53ZWIuYXBwIiwiaXNzIjoiaHR0cHM6Ly95dXNoZW5nLXRlY2gtYmxvZy53ZWIuYXBwLyIsInN1YiI6InVzZXJJRCIsImp0aSI6IjNkNmQwZmI2LTE2MjQtNGMzYi1iMzJjLTIyZjZlODRlMTExOSJ9.g-2r06NyqgRDIyFj-o6OfORAgLVbN2UbKM6Mfly-Tvg
// console.log(decode(token9, { complete: true }))
// // {
// //   header: { alg: 'HS256', typ: 'JWT', kid: 'path/to/key' },
// //   payload: {
// //     data: 'string',
// //     exp: 1761615568,
// //     aud: 'yusheng-tech-blog.web.app',
// //     iss: 'https://yusheng-tech-blog.web.app/',
// //     sub: 'userID',
// //     jti: '3d6d0fb6-1624-4c3b-b32c-22f6e84e1119'
// //   },
// //   signature: 'g-2r06NyqgRDIyFj-o6OfORAgLVbN2UbKM6Mfly-Tvg'
// // }
// console.log(decode(token9))
// // {
// //   data: 'string',
// //   exp: 1761615568,
// //   aud: 'yusheng-tech-blog.web.app',
// //   iss: 'https://yusheng-tech-blog.web.app/',
// //   sub: 'userID',
// //   jti: '3d6d0fb6-1624-4c3b-b32c-22f6e84e1119'
// // }

const token10 = sign(
  { iss: "portswigger", exp: 1761482635, sub: "administrator" },
  "secret1",
  {
    noTimestamp: true,
    keyid: "9c1bd791-418f-46d0-9a5d-e1af3f3da139",
    header: {
      alg: "HS256",
      typ: undefined,
    },
  },
);
console.log(token10);
console.log(decode(token10, { complete: true }));
