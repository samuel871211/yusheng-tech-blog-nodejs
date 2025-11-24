import { createServer } from "http";
const httpServer = createServer().listen(5000);
const http5001Server = createServer().listen(5001);
export default httpServer;
export { http5001Server };
