const { createConnection } = require("net");

const waitForServer = 500;
const smtpClient = createConnection({ port: 25 });

setTimeout(() => smtpClient.write("EHLO 123\r\n"), waitForServer * 1);
setTimeout(() => smtpClient.write("AUTH LOGIN\r\n"), waitForServer * 2);
setTimeout(() => smtpClient.write("123\r\n"), waitForServer * 3);
setTimeout(() => smtpClient.write("456\r\n"), waitForServer * 4);
setTimeout(() => smtpClient.write("MAIL FROM:<1@1>\r\n"), waitForServer * 5);
setTimeout(() => smtpClient.write("RCPT TO:<2@2>\r\n"), waitForServer * 6);
setTimeout(() => smtpClient.write("DATA\r\n"), waitForServer * 7);
setTimeout(() => smtpClient.resetAndDestroy(), waitForServer * 8);

smtpClient.on("data", (buffer) => console.log(buffer.toString()));
