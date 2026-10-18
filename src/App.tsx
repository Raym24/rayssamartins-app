import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import EditorialLanding from "./pages/EditorialLanding.tsx";
import NotFound from "./pages/NotFound.tsx";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

const EditorialSeo = () => {
  const { pathname } = useLocation();

  if (pathname !== "/diagramacao-de-livros") {
    return null;
  }

  const title = "Diagramação de Livros e Design Editorial | Rayssa Martins";
  const description =
    "Serviço profissional de diagramação de livros e design editorial por Rayssa Martins, com foco em hierarquia visual, legibilidade e composição de páginas.";
  const canonical = "https://rayssamartins.app/diagramacao-de-livros";

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    name: title,
    headline: title,
    description,
    url: canonical,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: "Rayssa Martins",
      url: "https://rayssamartins.app/",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Diagramação de livros e design editorial",
    description,
    url: canonical,
    serviceType: "Diagramação de livros e design editorial",
    provider: {
      "@type": "Person",
      name: "Rayssa Martins",
      url: "https://rayssamartins.app/",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: "https://rayssamartins.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Diagramação de livros",
        item: canonical,
      },
    ],
  };

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rayssa Martins" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="pt_BR" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonical} />
      <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <EditorialSeo />
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/en" element={<Index />} />
            <Route path="/projeto/:id" element={<ProjectDetail />} />
            <Route path="/en/projeto/:id" element={<ProjectDetail />} />
            <Route path="/diagramacao-de-livros" element={<EditorialLanding />} />
            <Route
              path="*"
              element={
                <>
                  <Helmet>
                    <meta name="robots" content="noindex, nofollow" />
                  </Helmet>
                  <NotFound />
                </>
              }
            />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
