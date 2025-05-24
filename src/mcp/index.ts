import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Where do I see the name?",
  version: "Where do I see the version?",
});

server.tool("getSalepageById", { salepageId: z.number() }, ({ salepageId }) => {
  // do some API CALL
  return {
    content: [
      {
        type: "resource",
        resource: {
          id: salepageId,
          title: "護唇膏",
          price: 100,
          text: "what is text",
          uri: "what is uri",
        },
      },
    ],
  };
});

server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}));

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        text: `Hello, ${name}!`,
      },
    ],
  }),
);

server.prompt("generate commit message", function () {
  return {
    description: "???",
    messages: [
      {
        role: "assistant",
        content: {
          type: "text",
          text: "you are very good at git",
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: "use git diff --staged | cat to generate git commit message",
        },
      },
    ],
    _meta: {
      additional: "metadata",
    },
  };
});

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport);
