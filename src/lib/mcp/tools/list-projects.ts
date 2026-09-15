import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { portfolioProjects } from "../portfolio-projects";

export default defineTool({
  name: "list_projects",
  title: "Listar projetos do portfólio",
  description: "Lista os projetos públicos de Rayssa Martins e permite filtrar por título, função ou ferramenta.",
  inputSchema: {
    search: z.string().trim().optional().describe("Termo opcional para filtrar projetos por título, função ou ferramenta."),
  },
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: ({ search }) => {
    const normalizedSearch = search?.toLocaleLowerCase("pt-BR");
    const matches = portfolioProjects
      .filter((project) => {
        if (!normalizedSearch) return true;
        return [project.title, project.role, ...project.tools]
          .join(" ")
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch);
      })
      .map(({ id, title, shortDescription, role, tools, behanceUrl }) => ({
        id,
        title,
        shortDescription,
        role,
        tools,
        portfolioUrl: `https://rayssamartins.app/projeto/${id}`,
        behanceUrl,
      }));

    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
      structuredContent: { projects: matches, total: matches.length },
    };
  },
});