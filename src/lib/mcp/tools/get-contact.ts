import { defineTool } from "@lovable.dev/mcp-js";

const contact = {
  email: "rayssamartins33@gmail.com",
  whatsapp: "https://wa.me/5585991706850",
  behance: "https://www.behance.net/rayssamartins3",
  website: "https://rayssamartins.app",
};

export default defineTool({
  name: "get_contact",
  title: "Consultar contatos profissionais",
  description: "Retorna os canais públicos para entrar em contato com Rayssa Martins e consultar seu trabalho.",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
    structuredContent: contact,
  }),
});