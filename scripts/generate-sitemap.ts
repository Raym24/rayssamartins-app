import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const baseUrl = "https://rayssamartins.app";
const paths = [
  "/",
  "/projeto/x1-de-rua",
  "/projeto/souting-marketing",
  "/projeto/blive-ensino",
  "/projeto/portfolio-fotografias",
  "/projeto/warrior-woman",
  "/projeto/lancamento-web-design",
  "/projeto/ellev-saude",
  "/projeto/newdawn-chatngift",
  "/projeto/diagramacao-adobe-indesign",
  "/projeto/design-social-media-medgestpro",
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...paths.map((path) => `  <url>\n    <loc>${baseUrl}${path}</loc>\n  </url>`),
  "</urlset>",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), sitemap);
console.log(`sitemap.xml criado com ${paths.length} páginas`);