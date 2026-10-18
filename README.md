# MEU PORTFOLIO

# Prompt Técnico para Lovable (8020.ai): Geração de Portfólio Profissional

## 1. Objetivo do Projeto

Gerar um portfólio digital interativo para **Rayssa Martins**, UI/UX Designer e Web Designer, com base em um estilo visual de referência e conteúdo extraído de seu perfil no Behance. O portfólio deve ser uma representação profissional e criativa de seu trabalho.

## 2. Referência de Design e Estilo

**URL de Referência:** `https://www.behance.net/gallery/244803829/PORTFOLIO-2026-GRAPHIC-DESIGNER-ILLUSTRATIOR`

**Diretrizes de Estilo:**

*   **Estética Geral:** Moderno, minimalista, com uso estratégico de elementos gráficos lúdicos e coloridos para adicionar personalidade (similar a adesivos/ilustrações na referência).

*   **Layout:** Grid-based, com ênfase em whitespace para clareza e foco no conteúdo. Disposição visualmente equilibrada dos elementos.

*   **Tipografia:** Combinação de fontes sans-serif para títulos (`font-family: 'Inter', sans-serif;` ou similar) e corpo de texto (`font-family: 'Roboto', sans-serif;` ou similar), priorizando legibilidade e um visual contemporâneo.

*   **Paleta de Cores:**

    *   **Primárias (Base):** Neutras (e.g., `#FFFFFF` para fundo, `#F5F5F5` para seções secundárias, `#333333` para texto principal).

    *   **Secundárias (Acento):** Vibrantes e pastéis, utilizadas em elementos gráficos, ilustrações e detalhes interativos (e.g., `#FFD700`, `#87CEEB`, `#FF69B4`, `#98FB98` - inspiradas nos tons da referência).

*   **Responsividade:** Design totalmente responsivo, otimizado para desktop, tablet e mobile, garantindo uma experiência de usuário fluida em todas as plataformas.

## 3. Estrutura e Componentes da UI

O portfólio deve ser composto pelas seguintes seções e componentes:

### 3.1. Header (Navegação)

*   **Componente:** `Navbar` fixo no topo.

*   **Elementos:** Logo/Nome "Rayssa Martins", links de navegação (e.g., "Sobre Mim", "Projetos", "Contato").

*   **Estilo:** Minimalista, com transições suaves ao rolar.

### 3.2. Hero Section (Introdução)

*   **Componente:** `HeroBanner` com `CallToAction` implícito.

*   **Elementos:**

    *   `Heading1`: "Portfólio de Rayssa Martins"

    *   `Paragraph`: "UI/UX Designer & Web Designer"

    *   `Image/Illustration`: Uma imagem de destaque ou ilustração personalizada que capture a essência do trabalho da Rayssa, no estilo lúdico da referência.

*   **Estilo:** Impactante, com alinhamento central ou à esquerda, utilizando a paleta de cores de acento em detalhes.

### 3.3. About Me Section (Sobre Mim)

*   **Componente:** `ProfileCard` ou `AboutBlock`.

*   **Elementos:**

    *   `Heading2`: "Sobre Mim"

    *   `Paragraph`: Biografia detalhada da Rayssa Martins (extraída do Behance).

    *   `ContactInfo`: E-mail, links para Behance e LinkedIn.

    *   `LocationTag`: "Brasil"

    *   `AvailabilityTag`: "Freelance & Fulltime"

*   **Estilo:** Layout em duas colunas (texto/info e imagem de perfil) ou blocos bem definidos.

### 3.4. Skills Section (Habilidades)

*   **Componente:** `SkillsGrid` ou `SkillList`.

*   **Elementos:**

    *   `Heading2`: "Habilidades"

    *   `SkillCategory`: "Hard Skills" (e.g., UI/UX Design, Web Design, Figma, Adobe XD, Photoshop, Illustrator).

    *   `SkillCategory`: "Soft Skills" (e.g., Resolução de Problemas, Comunicação, Criatividade, Trabalho em Equipe).

*   **Estilo:** Ícones ou tags visuais para cada habilidade, organizados em um grid ou lista estilizada.

### 3.5. Experience & Education Section (Experiência e Educação)

*   **Componente:** `Timeline` ou `ListBlock`.

*   **Elementos:**

    *   `Heading2`: "Experiência e Educação"

    *   `ExperienceItem`: Cargo, Empresa, Período, Descrição (se disponível).

    *   `EducationItem`: Curso, Instituição, Ano de Conclusão.

*   **Estilo:** Apresentação clara e cronológica.

### 3.6. Projects Section (Projetos)

*   **Componente:** `ProjectGallery` com `ProjectCard` interativos.

*   **Elementos:**

    *   `Heading2`: "Projetos"

    *   Para cada projeto:

        *   `ProjectCard`: Miniatura/Capa do projeto, `ProjectTitle`, `ShortDescription`.

        *   `CallToAction`: "Ver Projeto" (link para a página de detalhes do projeto).

*   **Estilo:** Grid responsivo (e.g., 2-3 colunas em desktop, 1 coluna em mobile). Efeitos de hover nos cartões.

### 3.7. Project Detail Page (Página de Detalhes do Projeto)

*   **Componente:** `ProjectDetailPage`.

*   **Elementos:**

    *   `ProjectTitle`

    *   `ImageGallery`: Múltiplas imagens do projeto em alta resolução.

    *   `ProjectDescription`: Descrição detalhada (problema, solução, papel da Rayssa).

    *   `RoleTag`: "UI/UX Designer", "Web Designer", etc.

    *   `ToolsTag`: Ferramentas utilizadas (e.g., Figma, Photoshop).

    *   `ExternalLink`: Link direto para o projeto no Behance.

*   **Estilo:** Layout limpo, com foco nas imagens e texto, navegação fácil para outros projetos.

### 3.8. Contact Section (Contato)

*   **Componente:** `ContactForm` ou `ContactInfoBlock`.

*   **Elementos:**

    *   `Heading2`: "Contato"

    *   Formulário de contato (Nome, Email, Mensagem) ou links diretos para e-mail, LinkedIn, Behance.

*   **Estilo:** Simples e funcional.

## 4. Estrutura de Dados e Sourcing de Conteúdo

Todo o conteúdo textual e visual será extraído do perfil Behance da Rayssa Martins.

**URL do Perfil Behance:** `https://www.behance.net/rayssamartins3`

**Mapeamento de Conteúdo:**

*   **`user.name`**: "Rayssa Martins"

*   **`user.title`**: "UI/UX Designer / Web Designer"

*   **`user.bio`**: Extrair da seção "Sobre Mim" ou inferir dos projetos.

*   **`user.contact.email`**: (A ser fornecido pela Rayssa ou inferido se disponível publicamente).

*   **`user.contact.behance_url`**: `https://www.behance.net/rayssamartins3`

*   **`user.contact.linkedin_url`**: (A ser fornecido pela Rayssa ou inferido se disponível publicamente).

*   **`user.location`**: "Brasil"

*   **`user.availability`**: "Freelance & Fulltime"

*   **`user.skills.hard`**: Extrair de descrições de projetos ou inferir (e.g., Figma, Adobe XD, Photoshop, Illustrator).

*   **`user.skills.soft`**: Inferir de descrições ou contexto (e.g., Resolução de Problemas, Comunicação, Criatividade).

**`projects` (Array de Objetos):**

Para cada projeto listado abaixo, extrair:

*   **`project.title`**: Título do projeto.

*   **`project.thumbnail_image_url`**: Imagem de capa do projeto no Behance.

*   **`project.detail_images_urls`**: Todas as imagens do projeto na página de detalhes do Behance.

*   **`project.description`**: Descrição completa do projeto (problema, solução, papel).

*   **`project.behance_url`**: Link direto para o projeto no Behance.

**Projetos a Incluir:**

1.  "X1 de Rua - Crateús"

2.  "Souting Marketing & Estratégia"

3.  "Blive Ensino Criativo - Revista e Social Media"

4.  "Portifólio de Fotografias"

5.  "Warrior woman - image manipulation"

6.  "Lançamento - Web Design + Social media"

7.  "Ellev Saúde - Aplicativo. UI / UX Designer."

8.  "Newdawn - Aplicativo ChatnGift. (Ui/Ux Designer)."

## 5. Requisitos Técnicos Adicionais

*   **Otimização de Imagens:** Todas as imagens devem ser otimizadas para web (compressão, lazy loading).

*   **Performance:** O portfólio deve carregar rapidamente e ter boa pontuação em ferramentas de performance (e.g., Lighthouse).

*   **Acessibilidade:** Conformidade com padrões básicos de acessibilidade (WCAG).

*   **SEO:** Meta tags e estrutura semântica para otimização de busca.

Este prompt fornece as informações necessárias para o Lovable gerar um portfólio que atenda às expectativas de design e conteúdo, utilizando a referência visual e o perfil profissional da Rayssa Martins. O Lovable deve priorizar a extração de informações diretamente do Behance e, onde necessário, inferir ou gerar conteúdo de forma consistente com o estilo e a persona da Rayssa. O Lovable deve priorizar a extração de informações diretamente do Behance e, onde necessário, inferir ou gerar conteúdo de forma consistente com o estilo e a persona da Rayssa Martins. Em caso de ambiguidade, o Lovable deve optar por um design limpo e profissional, com toques de criatividade conforme a referência.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://rayssamartins-app.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b3b70294-fc86-45ef-900a-84cc5031300b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
