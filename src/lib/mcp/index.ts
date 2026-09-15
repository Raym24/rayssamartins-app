import { defineMcp } from "@lovable.dev/mcp-js";
import getContactTool from "./tools/get-contact";
import getProfileTool from "./tools/get-profile";
import getProjectTool from "./tools/get-project";
import listProjectsTool from "./tools/list-projects";

export default defineMcp({
  name: "meu-portfolio",
  title: "MEU PORTFOLIO",
  version: "0.1.0",
  instructions:
    "Ferramentas públicas para conhecer o perfil, as competências, os projetos e os contatos profissionais de Rayssa Martins. Use list_projects antes de get_project quando não souber o identificador do projeto.",
  tools: [getProfileTool, listProjectsTool, getProjectTool, getContactTool],
});