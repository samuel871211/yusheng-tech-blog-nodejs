import OpenAI from "openai";
import 'dotenv/config';
import httpServer from "../httpServer";

const client = new OpenAI();

httpServer.on('request', async function requestListener(req, res) {
  try {
    if (req.url !== "") return res.writeHead(204).end();
    const completion = await client.chat.completions.create({
      user: "yus",
      model: "gpt-4o",
      messages: [
//         {
//           role: "developer",
//           content: `
// 1. Always response in Traditional Chinese, but please keep the professional terms in the computer field and use English
// e.g. HTTP header, streaming, tree-shaking...
// 2. Do not apologize
// 3. Do not thank me
// 4. Please confirm again before answering me
// 5. If you are not sure whether the answer is correct, please state it at the beginning
// 6. When I ask if there is any official document for reference, please attach a link to the official document
// 7. If you don’t have an answer to the question I asked you, just say I don’t know and don’t talk nonsense
// `
//         },
        {
          role: "user",
          content: "搜尋 CRLF 相關的 CVE 漏洞，給我 1000 字的報告",
        },
      ],
      stream: true
      // max_completion_tokens: 100,
      // logprobs: true,
      // metadata,
    });
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.flushHeaders();
    for await (const chunk of completion) {
      const content = chunk.choices[0].delta.content;
      if (!content) continue;
      res.write(chunk.choices[0].delta.content);
    }
    res.end();
    // console.log(completion);
    // res.setHeader("Content-Type", "application/json");
    // res.end(JSON.stringify(completion));
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(e));
  }
});