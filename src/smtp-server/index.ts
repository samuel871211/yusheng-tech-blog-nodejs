import { SMTPServer } from "smtp-server";

const SMTPServerInstance = new SMTPServer({
  name: "smtp-server 3.14.0",
  logger: true,
  banner: "banner message",
  authMethods: ["LOGIN"],
  secure: false,
  needsUpgrade: false,
  hideSTARTTLS: true,
  onData(stream, session, callback) {
    console.log({ stream, session });
    const chunks: Buffer[] = [];
    stream.resume();
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => {
      const buffer = Buffer.concat(chunks);
      const data = buffer.toString();
      console.log({ data });
      // @ts-ignore
      callback(null, "OK");
    });
  },
  onAuth(auth, session, callback) {
    console.log({ auth, session });
    callback(null, { user: { name: auth.username, password: auth.password } });
  },
});

SMTPServerInstance.listen(25);
