import { readFileSync } from "fs";
import { createServer } from "https";
import { join } from "path";

const httpsServer = createServer().listen(5001);
httpsServer.setSecureContext({
  key: readFileSync(join(__dirname, "private-key.pem")),
  cert: readFileSync(join(__dirname, "cert.pem")),
});
export default httpsServer;
