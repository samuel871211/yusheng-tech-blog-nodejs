const { SMTPServer } = require("smtp-server");

const SMTPServerInstance = new SMTPServer({
  name: "smtp-server 3.14.0",
  logger: true,
  banner: "banner message",
  authMethods: ["LOGIN"],
  secure: false,
  needsUpgrade: false,
  hideSTARTTLS: true,
  onAuth(auth, session, callback) {
    console.log({ auth, session });
    callback(null, { user: { name: auth.username, password: auth.password } });
  },
});

SMTPServerInstance.listen(25);
