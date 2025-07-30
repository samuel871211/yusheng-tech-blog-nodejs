import { SMTPServer } from "smtp-server";

const SMTPServerInstance = new SMTPServer({
  name: "\r\nGET 123",
  logger: true,
  banner: "banner message",
  authMethods: ["LOGIN"],
  enableTrace: true,
  secure: false,
  needsUpgrade: false,
  // @ts-ignore
  hideSize: false,
  hideENHANCEDSTATUSCODES: false,
  hideSTARTTLS: true,
  size: 0,
  onAuth(auth, session, callback) {
    console.log({ auth, session });
    callback(null, { user: { name: auth.username, password: auth.password } });
  },
});

SMTPServerInstance.listen(25);
