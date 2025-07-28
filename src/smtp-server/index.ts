import { SMTPServer } from "smtp-server";

const SMTPServerInstance = new SMTPServer({
  name: "yus test localhost SMTP Server",
  logger: true,
  banner: "banner message",
  enableTrace: true,
  secure: false,
  needsUpgrade: false,
  // hideSTARTTLS: true
});

SMTPServerInstance.listen(25);
