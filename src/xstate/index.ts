import { createMachine, interpret } from "xstate";
import httpServer from "../httpServer";

const userMachine = createMachine({
  id: "user",
  initial: "receiveHttpRequest",
})

httpServer.on('request', function requestListener (req, res) {

});