

## Redesign Interativo -- Portfolio com Animações e GIFs em Movimento

A referência do Behance (Le Minh) usa um estilo muito específico: fundo bege/creme quente, tipografia hand-drawn, adesivos ilustrados animados, e principalmente **GIFs animados em tela cheia** entre as seções, criando uma experiência de scroll contínuo com muito movimento.

### Mudanças principais

**1. Nova paleta de cores -- tom quente/retrô**
- Background principal: bege creme `#F5E6D3` (como na referência)
- Grid sutil de fundo (linhas finas como caderno/papel milimetrado)
- Acentos em azul royal, rosa, amarelo mostarda, coral

**2. Hero Section completamente nova**
- Fundo com grid pattern (papel milimetrado)
- Texto grande estilo hand-drawn/bold com animação de entrada
- Stickers animados flutuando (CSS keyframes: float, spin-slow, bounce)
- Elementos decorativos: estrelas, corações, setas desenhadas à mão
- Mouse parallax leve nos elementos decorativos

**3. Animated GIF sections entre seções**
- Faixas horizontais com GIFs decorativos animados (sparkles, estrelas girando, elementos hand-drawn)
- Usar GIFs públicos de elementos decorativos ou criar animações CSS equivalentes (rotating stars, bouncing shapes, pulsing elements)
- Marquee/ticker infinito com skills rolando horizontalmente

**4. Scroll animations em todas as seções**
- Hook `useScrollReveal` com IntersectionObserver
- Fade-up staggered nos cards de projeto
- Pop-in sequencial nos tags de skills
- Slide-in lateral no About

**5. Project cards interativos**
- Hover com scale + rotate sutil (tilt effect)
- Overlay com glassmorphism no hover
- Imagem com zoom suave

**6. Elementos decorativos animados globais**
- Floating shapes (círculos, estrelas, squiggles) com animação infinita
- Posicionados com `position: absolute` em várias seções
- Animated emojis nos stickers

**7. Navbar com animações**
- Underline animada no link ativo
- Mobile menu com slide-in suave

**8. Footer com mais personalidade**
- Marquee com texto rolando
- Elementos decorativos animados

---

### Arquivos a criar

| Arquivo | Descrição |
|---|---|
| `src/hooks/useScrollReveal.ts` | Hook IntersectionObserver para animações de scroll |
| `src/components/FloatingElements.tsx` | Elementos decorativos animados (estrelas, shapes) |
| `src/components/Marquee.tsx` | Ticker/marquee infinito horizontal |
| `src/components/AnimatedDivider.tsx` | Faixa animada entre seções (GIFs/CSS animations) |

### Arquivos a modificar

| Arquivo | Mudanças |
|---|---|
| `src/index.css` | Nova paleta bege, grid pattern background, ~15 keyframes (float, spin-slow, bounce-soft, marquee, pop-in, fade-up, slide-in, glow-pulse, wiggle, tilt) |
| `tailwind.config.ts` | Novas animações e cores customizadas |
| `src/components/HeroSection.tsx` | Reescrever com floating stickers, parallax mouse, texto animado |
| `src/components/AboutSection.tsx` | Scroll reveal, elementos decorativos |
| `src/components/SkillsSection.tsx` | Pop-in staggered, marquee de skills |
| `src/components/ProjectsSection.tsx` | Cards com tilt hover, staggered fade-up |
| `src/components/ContactSection.tsx` | Background animado, pulse buttons |
| `src/components/Navbar.tsx` | Animated underline, smooth mobile menu |
| `src/components/Footer.tsx` | Marquee, elementos animados |
| `src/pages/Index.tsx` | Adicionar FloatingElements e AnimatedDividers entre seções |

### Detalhes técnicos
- Zero dependências novas -- tudo em CSS puro + IntersectionObserver nativo
- Animações GPU-accelerated com `transform` e `opacity` apenas
- `will-change` para performance
- GIFs decorativos via CSS animations (rotating stars, pulsing circles, floating shapes) para evitar peso de arquivos externos
- Parallax via `onMouseMove` no Hero (sem biblioteca)

