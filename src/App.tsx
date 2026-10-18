import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import EditorialLanding from "./pages/EditorialLanding.tsx";
import NotFound from "./pages/NotFound.tsx";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
