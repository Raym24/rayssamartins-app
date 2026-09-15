import { defineTool } from "@lovable.dev/mcp-js";

const profile = {
  name: "Rayssa Martins",
  title: "Diretora de Arte Sênior e Designer Multidisciplinar",
  location: "Fortaleza, CE (Brasil)",
  availability: "Freelance & Fulltime",
  experience: "Mais de 10 anos",
  summary:
    "Cria identidades, campanhas e experiências digitais para marcas do Brasil, Estados Unidos e Portugal, conectando direção de arte, branding, design digital, UI/UX, fotografia, web, IA generativa e automações.",
  hardSkills: [
    "UI/UX Design",
    "Web Design",
    "Figma",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "InDesign",
    "Lightroom",
    "Especialista em IA",
    "Automações",
    "Apps e Sites com IA",
    "Agentes de IA",
    "Fotografia",
  ],
  softSkills: [
    "Resolução de Problemas",
    "Comunicação",
    "Criatividade",
    "Trabalho em Equipe",
    "Gestão de Tempo",
    "Pensamento Crítico",
  ],
};

export default defineTool({
  name: "get_profile",
  title: "Consultar perfil profissional",
  description: "Retorna o resumo profissional, a localização, a experiência e as competências públicas de Rayssa Martins.",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
    structuredContent: profile,
  }),
});