import x1deruaImg from "@/assets/x1derua.png";
import soutingImg from "@/assets/soutingmarketing.png";
import bliveImg from "@/assets/bliveensino.png";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  role: string;
  tools: string[];
  thumbnailUrl: string;
  behanceUrl: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: "x1-de-rua",
    title: "X1 de Rua - Crateús",
    shortDescription: "Identidade visual e design para evento de jogos de rua em Crateús.",
    description: "Projeto completo de identidade visual para o evento X1 de Rua em Crateús, incluindo criação de logo, materiais gráficos para redes sociais e peças promocionais. O objetivo foi criar uma identidade vibrante e urbana que capturasse a energia competitiva do evento.",
    role: "UI/UX Designer & Graphic Designer",
    tools: ["Photoshop", "Illustrator", "Figma"],
    thumbnailUrl: x1deruaImg,
    behanceUrl: "https://www.behance.net/gallery/245701311/X1-de-Rua-Crateus",
    images: [x1deruaImg],
  },
  {
    id: "souting-marketing",
    title: "Souting Marketing & Estratégia",
    shortDescription: "Branding e estratégia visual para agência de marketing digital.",
    description: "Desenvolvimento da identidade visual completa para a Souting Marketing & Estratégia, incluindo logotipo, paleta de cores, tipografia e aplicações em materiais digitais e impressos. O projeto focou em transmitir profissionalismo e inovação.",
    role: "Web Designer & Brand Designer",
    tools: ["Figma", "Illustrator", "Photoshop"],
    thumbnailUrl: soutingImg,
    behanceUrl: "https://www.behance.net/gallery/224104303/Souting-Marketing-Estratgia",
    images: [soutingImg],
  },
  {
    id: "blive-ensino",
    title: "Blive Ensino Criativo - Revista e Social Media",
    shortDescription: "Design editorial e social media para instituição de ensino criativo.",
    description: "Criação de revista digital e peças para redes sociais da Blive Ensino Criativo. O projeto envolveu design editorial, diagramação e criação de templates para social media, mantendo uma linguagem visual moderna e educativa.",
    role: "Graphic Designer & Social Media Designer",
    tools: ["InDesign", "Photoshop", "Illustrator"],
    thumbnailUrl: "https://mir-s3-cdn-cf.behance.net/projects/max_1200/ca29e9126086165.Y3JvcCw3MjQsNTY2LDY3Miw4Ng.jpg",
    behanceUrl: "https://www.behance.net/gallery/126086165/Blive-Ensino-Criativo-Revista-e-Social-Media",
    images: ["https://mir-s3-cdn-cf.behance.net/projects/max_1200/ca29e9126086165.Y3JvcCw3MjQsNTY2LDY3Miw4Ng.jpg"],
  },
  {
    id: "portfolio-fotografias",
    title: "Portfólio de Fotografias",
    shortDescription: "Curadoria e apresentação de portfólio fotográfico autoral.",
    description: "Seleção e apresentação de trabalhos fotográficos autorais, com foco em composição, iluminação e narrativa visual. O portfólio demonstra versatilidade em diferentes estilos e técnicas fotográficas.",
    role: "Photographer & Visual Designer",
    tools: ["Lightroom", "Photoshop"],
    thumbnailUrl: "https://mir-s3-cdn-cf.behance.net/projects/max_1200/a5d4ea231003603.Y3JvcCwxMzgwLDEwODAsMjgzLDA.png",
    behanceUrl: "https://www.behance.net/gallery/231003603/Portifolio-de-Fotografias",
    images: ["https://mir-s3-cdn-cf.behance.net/projects/max_1200/a5d4ea231003603.Y3JvcCwxMzgwLDEwODAsMjgzLDA.png"],
  },
  {
    id: "warrior-woman",
    title: "Warrior Woman - Image Manipulation",
    shortDescription: "Manipulação digital de imagem com temática de guerreira fantástica.",
    description: "Projeto artístico de manipulação de imagem criando uma composição fantástica de uma guerreira. Técnicas avançadas de composição, iluminação digital e retoque foram utilizadas para criar uma peça visualmente impactante.",
    role: "Digital Artist & Photo Manipulator",
    tools: ["Photoshop"],
    thumbnailUrl: "https://mir-s3-cdn-cf.behance.net/projects/max_1200/7daab7192510821.Y3JvcCwzMTc5LDI0ODcsMjgzLDA.jpg",
    behanceUrl: "https://www.behance.net/gallery/192510821/Warrior-woman-image-manipulation",
    images: ["https://mir-s3-cdn-cf.behance.net/projects/max_1200/7daab7192510821.Y3JvcCwzMTc5LDI0ODcsMjgzLDA.jpg"],
  },
  {
    id: "lancamento-web-design",
    title: "Lançamento - Web Design + Social Media",
    shortDescription: "Landing page e campanha digital para lançamento de produto.",
    description: "Design de landing page e materiais para redes sociais para campanha de lançamento. O projeto integrou web design responsivo com peças de social media coerentes, criando uma experiência de marca unificada.",
    role: "Web Designer & Social Media Designer",
    tools: ["Figma", "Photoshop", "Illustrator"],
    thumbnailUrl: "https://mir-s3-cdn-cf.behance.net/projects/max_1200/268eb7189907699.Y3JvcCwxMDYzLDgzMiw1Nyww.png",
    behanceUrl: "https://www.behance.net/gallery/189907699/Lancamento-Web-Design-Social-media",
    images: ["https://mir-s3-cdn-cf.behance.net/projects/max_1200/268eb7189907699.Y3JvcCwxMDYzLDgzMiw1Nyww.png"],
  },
  {
    id: "ellev-saude",
    title: "Ellev Saúde - Aplicativo UI/UX",
    shortDescription: "Design de interface e experiência do usuário para aplicativo de saúde.",
    description: "Projeto de UI/UX Design para o aplicativo Ellev Saúde, focado em criar uma experiência intuitiva e acessível para usuários que buscam cuidados com a saúde. Incluiu pesquisa de usuário, wireframes, protótipos de alta fidelidade e testes de usabilidade.",
    role: "UI/UX Designer",
    tools: ["Figma", "Adobe XD"],
    thumbnailUrl: "https://mir-s3-cdn-cf.behance.net/projects/max_1200/a574da164903935.Y3JvcCw5NTUsNzQ3LDAsMA.png",
    behanceUrl: "https://www.behance.net/gallery/164903935/Ellev-Saude-Aplicativo-UI-UX-Designer",
    images: ["https://mir-s3-cdn-cf.behance.net/projects/max_1200/a574da164903935.Y3JvcCw5NTUsNzQ3LDAsMA.png"],
  },
  {
    id: "newdawn-chatngift",
    title: "Newdawn - Aplicativo ChatnGift",
    shortDescription: "UI/UX Design para aplicativo de chat e presentes virtuais.",
    description: "Design completo de interface e experiência para o aplicativo Newdawn ChatnGift, uma plataforma social inovadora que combina mensagens com envio de presentes virtuais. O projeto incluiu fluxos de usuário, design system e protótipos interativos.",
    role: "UI/UX Designer",
    tools: ["Figma", "Adobe XD", "Illustrator"],
    thumbnailUrl: "https://mir-s3-cdn-cf.behance.net/projects/max_1200/eeeb72151995505.Y3JvcCwxOTIwLDE1MDEsMCww.png",
    behanceUrl: "https://www.behance.net/gallery/151995505/Newdawn-Aplicativo-ChatnGift-(UiUx-Designer)",
    images: ["https://mir-s3-cdn-cf.behance.net/projects/max_1200/eeeb72151995505.Y3JvcCwxOTIwLDE1MDEsMCww.png"],
  },
];
