import 'dotenv/config';
import httpServer from "../httpServer";
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

httpServer.on('request', async function requestListener(req, res) {
  try {
    if (req.url !== "/") return res.writeHead(204).end();

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "assistant",
          content: `
1. Always response in Traditional Chinese, but please keep the professional terms in the computer field and use English
e.g. HTTP header, streaming, tree-shaking...
2. Do not apologize
3. Do not thank me
4. Please confirm again before answering me
5. If you are not sure whether the answer is correct, please state it at the beginning
6. When I ask if there is any official document for reference, please attach a link to the official document
7. If you don’t have an answer to the question I asked you, just say I don’t know and don’t talk nonsense
`
        },
        {
          role: "user",
          content: "搜尋 CRLF 相關的 CVE 漏洞，給我 1000 字的報告"
        }
      ],
    });
    console.log(msg);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(msg));
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(e));
  }
})