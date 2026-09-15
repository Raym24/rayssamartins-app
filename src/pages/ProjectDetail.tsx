import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold">Projeto não encontrado</h1>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${project.title} — Rayssa Martins`}</title>
        <meta name="description" content={project.shortDescription} />
        <link rel="canonical" href={`https://rayssamartins.app/projeto/${project.id}`} />
        <meta property="og:title" content={`${project.title} — Rayssa Martins`} />
        <meta property="og:description" content={project.shortDescription} />
        <meta property="og:url" content={`https://rayssamartins.app/projeto/${project.id}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={`${project.title} — Rayssa Martins`} />
        <meta name="twitter:description" content={project.shortDescription} />
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Voltar aos projetos
          </Link>

          <div className="max-w-4xl">
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="sticker-pink">{project.role}</span>
              {project.tools.map((tool) => (
                <span key={tool} className="sticker-blue">{tool}</span>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden bg-secondary mb-8">
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full object-cover"
                loading="eager"
              />
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={16} /> Ver no Behance
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
