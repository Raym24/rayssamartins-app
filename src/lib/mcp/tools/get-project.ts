import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "@/data/projects";

export default defineTool({
  name: "get_project",
  title: "Consultar projeto",
  description: "Retorna a descrição completa, a função, as ferramentas e os links públicos de um projeto do portfólio.",
  inputSchema: {
    projectId: z.string().trim().min(1).describe("Identificador do projeto retornado por list_projects."),
  },
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: ({ projectId }) => {
    const project = projects.find(({ id }) => id === projectId);
    if (!project) throw new ToolError(`Projeto não encontrado: ${projectId}`);

    const result = {
      id: project.id,
      title: project.title,
      shortDescription: project.shortDescription,
      description: project.description,
      role: project.role,
      tools: project.tools,
      portfolioUrl: `https://rayssamartins.app/projeto/${project.id}`,
      behanceUrl: project.behanceUrl,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});