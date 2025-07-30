import { createConnection } from "net";

const waitForServer = 500;
const smtpClient = createConnection({ port: 25 });

// test 1, do not send data and resetAndDestroy
// setTimeout(() => smtpClient.write("EHLO 123\r\n"), waitForServer * 1);
// setTimeout(() => smtpClient.write("AUTH LOGIN\r\n"), waitForServer * 2);
// setTimeout(() => smtpClient.write("123\r\n"), waitForServer * 3);
// setTimeout(() => smtpClient.write("456\r\n"), waitForServer * 4);
// setTimeout(() => smtpClient.write("MAIL FROM:<1@1>\r\n"), waitForServer * 5);
// setTimeout(() => smtpClient.write("RCPT TO:<2@2>\r\n"), waitForServer * 6);
// setTimeout(() => smtpClient.write("DATA\r\n"), waitForServer * 7);
// setTimeout(() => smtpClient.resetAndDestroy(), waitForServer * 8);

// test 2, send data ends with \r\n.\r\n
setTimeout(() => smtpClient.write("EHLO 123\r\n"), waitForServer * 1);
setTimeout(() => smtpClient.write("AUTH LOGIN\r\n"), waitForServer * 2);
setTimeout(() => smtpClient.write("123\r\n"), waitForServer * 3);
setTimeout(() => smtpClient.write("456\r\n"), waitForServer * 4);
setTimeout(() => smtpClient.write("MAIL FROM:<1@1>\r\n"), waitForServer * 5);
setTimeout(() => smtpClient.write("RCPT TO:<2@2>\r\n"), waitForServer * 6);
setTimeout(() => smtpClient.write("DATA\r\n"), waitForServer * 7);
setTimeout(() => smtpClient.write("123123\r\n"), waitForServer * 8);
setTimeout(() => smtpClient.write("456456\r\n"), waitForServer * 9);
setTimeout(() => smtpClient.write(".\r\n"), waitForServer * 10);
setTimeout(() => smtpClient.destroy(), waitForServer * 11);

// smtpClient.on("data", (buffer) => console.log(buffer.toString()));
