import { join } from "node:path";
import { createTransport } from "nodemailer";

const transport = createTransport({
  debug: true,
  logger: true,
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "leopoldo.turcotte24@ethereal.email",
    pass: "zjnnnR2Q4wkNVpgnf1",
  },
});

// ASCII text
// transport
//   .sendMail({
//     from: '"Leopoldo Turcotte" leopoldo.turcotte24@ethereal.email',
//     to: "test.account1@ethereal.email",
//     subject: "Test subject",
//     text: "Test content",
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// 8-bit text
// transport
//   .sendMail({
//     from: '"Leopoldo Turcotte" leopoldo.turcotte24@ethereal.email',
//     to: "test.account1@ethereal.email",
//     subject: "Test subject",
//     text: "ÿÿÿ"
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// 8-bit subject
// transport
//   .sendMail({
//     from: '"Leopoldo Turcotte" leopoldo.turcotte24@ethereal.email',
//     to: "test.account1@ethereal.email",
//     subject: "ÿÿÿ",
//     text: "Test content",
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// utf-8 SMTP Commands + SMTP Message Headers
// transport
//   .sendMail({
//     from: '"中文名" 哈哈中文@ethereal.email',
//     to: "test.account1@ethereal.email",
//     subject: "您好世界",
//     text: "Test content",
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// ASCII text + cc + bcc
// transport
//   .sendMail({
//     from: '"Leopoldo Turcotte" leopoldo.turcotte24@ethereal.email',
//     to: "test.account1@ethereal.email",
//     subject: "Test subject",
//     text: "Test content",
//     cc: ["test.account2@ethereal.email", "test.account3@ethereal.email"],
//     bcc: ["test.account4@ethereal.email", "test.account5@ethereal.email"]
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// ASCII text + html
// transport
//   .sendMail({
//     from: '"Leopoldo Turcotte" leopoldo.turcotte24@ethereal.email',
//     to: "test.account1@ethereal.email",
//     subject: "Test subject",
//     text: "Test content",
//     html: "<h1>HTML content</h1>"
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// ASCII text + utf-8 html
// transport
//   .sendMail({
//     from: '"Leopoldo Turcotte" leopoldo.turcotte24@ethereal.email',
//     to: "test.account1@ethereal.email",
//     subject: "Test subject",
//     text: "Test content",
//     html: "<h1>您好世界</h1>"
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// ASCII text + html + attachments
// transport
//   .sendMail({
//     from: '"Leopoldo Turcotte" leopoldo.turcotte24@ethereal.email',
//     to: "test.account1@ethereal.email",
//     subject: "Test subject",
//     text: "Test content",
//     html: "<h1>HTML content</h1>",
//     attachments: [{ path: join(__dirname, "small.png"), filename: "small.png" }]
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// 大滿漢
transport
  .sendMail({
    from: '"中文" 中文1@ethereal.email',
    to: ["中文2@ethereal.email", "中文3@ethereal.email"],
    subject: "中文 subject",
    text: "中文 content",
    html: "<h1>中文中文中文</h1>",
    cc: ["中文4@ethereal.email", "中文5@ethereal.email"],
    bcc: ["中文6@ethereal.email", "中文7@ethereal.email"],
    sender: "中文8@ethereal.email",
    replyTo: ["中文9@ethereal.email", "中文10@ethereal.email"],
    list: {
      Help: {
        url: "https://example.com/Help",
        comment: "Help",
      },
      Unsubscribe: {
        url: "https://example.com/Unsubscribe",
        comment: "Unsubscribe",
      },
      Subscribe: {
        url: "https://example.com/Subscribe",
        comment: "Subscribe",
      },
      Post: {
        url: "https://example.com/Post",
        comment: "Post",
      },
      Owner: {
        url: "https://example.com/Owner",
        comment: "Owner",
      },
      Archive: {
        url: "https://example.com/Archive",
        comment: "Archive",
      },
    },
    attachments: [
      { path: join(__dirname, "small.png"), filename: "small.png" },
    ],
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
