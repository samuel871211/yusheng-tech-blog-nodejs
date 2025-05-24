import "dotenv/config";
import { Sandbox } from "@e2b/code-interpreter";
Sandbox.create().then((sandbox) => {
  const host = sandbox.getHost(3000);
  console.log(`https://${host}`);
});
