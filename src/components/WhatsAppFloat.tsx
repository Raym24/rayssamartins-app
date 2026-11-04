import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = "5585991706850";

/** Botão flutuante de WhatsApp para todas as páginas, exceto a landing editorial (que tem o próprio). */
const WhatsAppFloat = () => {
  const { pathname } = useLocation();
  const { isEnglish } = useLanguage();

  // A landing /diagramacao-de-livros já possui botão flutuante próprio — não duplicar.
  if (pathname.startsWith("/diagramacao-de-livros")) return null;

  const message = isEnglish
    ? "Hi Rayssa! I came from your website and would like to request a quote for a project. Can we talk?"
    : "Olá, Rayssa! Vim pelo seu site e gostaria de solicitar um orçamento para um projeto. Podemos conversar?";
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        isEnglish
          ? "Chat on WhatsApp (opens in a new tab)"
          : "Conversar no WhatsApp (abre em nova aba)"
      }
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:bottom-6 sm:right-6"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M16.002 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.464 1.71 6.405L3.2 28.8l6.566-1.722a12.74 12.74 0 0 0 6.236 1.622h.005c7.059 0 12.799-5.74 12.799-12.8 0-3.42-1.332-6.636-3.75-9.052a12.71 12.71 0 0 0-9.054-3.648Zm0 23.032h-.005a10.64 10.64 0 0 1-5.422-1.484l-.389-.231-3.895 1.021 1.04-3.796-.253-.404a10.61 10.61 0 0 1-1.627-5.658c0-5.865 4.774-10.637 10.656-10.637 2.844 0 5.517 1.108 7.526 3.121a10.58 10.58 0 0 1 3.118 7.522c-.002 5.866-4.776 10.646-10.749 10.646Zm5.837-7.973c-.319-.16-1.888-.931-2.18-1.038-.292-.107-.504-.16-.716.16-.212.319-.822 1.038-1.008 1.25-.186.212-.371.239-.69.08-.319-.16-1.347-.496-2.566-1.582-.948-.846-1.588-1.891-1.774-2.21-.186-.319-.02-.492.14-.651.143-.143.319-.372.478-.558.159-.186.212-.319.319-.531.106-.213.053-.399-.027-.558-.08-.16-.716-1.725-.981-2.362-.258-.62-.52-.536-.716-.546l-.61-.01c-.212 0-.557.08-.849.399-.292.319-1.114 1.09-1.114 2.657 0 1.566 1.14 3.08 1.3 3.292.159.212 2.245 3.427 5.44 4.807.76.328 1.353.523 1.816.67.763.242 1.457.208 2.006.126.612-.091 1.888-.772 2.154-1.516.266-.745.266-1.383.186-1.516-.08-.133-.292-.213-.61-.372Z" />
      </svg>
    </a>
  );
};

export default WhatsAppFloat;
