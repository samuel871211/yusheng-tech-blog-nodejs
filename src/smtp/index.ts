import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "leopoldo.turcotte24@ethereal.email",
    pass: "zjnnnR2Q4wkNVpgnf1",
  },
});

transport
  .sendMail({
    from: '"Leopoldo Turcotte" leopoldo.turcotte24@ethereal.email',
    to: "haha@email\r\n",
    subject: "3",
    // text: 'text',
    html: "<div>hello world</div>",
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
