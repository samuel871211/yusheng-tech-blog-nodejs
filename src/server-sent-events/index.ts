import { readFileSync } from "fs";
import { join } from "path";
import httpServer from "../httpServer";
import { notFoundListener } from "../listeners/notFoundlistener";

const indexHTML = readFileSync(join(__dirname, "index.html"));
const ENDINDEX = 1000;

function generateEventStream(params: {
  eventName?: string;
  data: string;
  id?: string;
  retry?: number;
}) {
  const { eventName, data, id, retry } = params;
  let eventStream = "";
  if (eventName) eventStream += `event: ${eventName}\n`;
  eventStream += `data: ${data}\n`;
  if (id) eventStream += `id: ${id}\n`;
  if (typeof retry === "number" && Number.isInteger(retry) && retry > 0)
    eventStream += `retry: ${retry}\n`;
  eventStream += "\n";
  return eventStream;
}

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(indexHTML);
    return;
  }

  if (req.url === "/sse") {
    let index = 1;
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    // SSE 的目的是 Server > Client 的即時通訊，快取在此情境是多餘的，可能會造成 BUG，故關閉
    res.setHeader("Cache-Control", "no-cache");
    const timeoutId = setInterval(() => {
      const eventStream = generateEventStream({
        data: String(index),
        eventName: "message",
      });
      if (index === ENDINDEX) {
        res.end(eventStream, () => clearTimeout(timeoutId));
        return;
      }
      res.write(eventStream);
      index += 1;
    }, 1);
    return;
  }

  if (req.url === "/customSSE") {
    let index = 1;
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    // SSE 的目的是 Server > Client 的即時通訊，快取在此情境是多餘的，可能會造成 BUG，故關閉
    res.setHeader("Cache-Control", "no-cache");
    const timeoutId = setInterval(() => {
      const eventStream = generateEventStream({
        data: String(index),
        eventName: `customEvent${(index % 2) + 1}`,
      });
      if (index === ENDINDEX) {
        res.end(eventStream, () => clearTimeout(timeoutId));
        return;
      }
      res.write(eventStream);
      index += 1;
    }, 1);
    return;
  }

  if (req.url === "/customSSEWithId") {
    let index = 1;
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    // SSE 的目的是 Server > Client 的即時通訊，快取在此情境是多餘的，可能會造成 BUG，故關閉
    res.setHeader("Cache-Control", "no-cache");
    const timeoutId = setInterval(() => {
      const eventStream = generateEventStream({
        data: String(index),
        eventName: `customEvent${(index % 2) + 1}`,
        id: crypto.randomUUID(),
      });
      if (index === ENDINDEX) {
        res.end(eventStream, () => clearTimeout(timeoutId));
        return;
      }
      res.write(eventStream);
      index += 1;
    }, 1);
    return;
  }

  if (req.url === "/multiLineDataSSE") {
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    // SSE 的目的是 Server > Client 的即時通訊，快取在此情境是多餘的，可能會造成 BUG，故關閉
    res.setHeader("Cache-Control", "no-cache");
    res.end(`data: This is first line.\ndata: This is second line.\n\n`);
    return;
  }

  return notFoundListener(req, res);
});
