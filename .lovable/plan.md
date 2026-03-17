

## Redesign Interativo -- Portfolio com Animações e GIFs em Movimento

Transformação completa do portfolio para o estilo da referência Behance: fundo bege/creme, grid pattern, floating stickers animados, marquee tickers, scroll reveals, e elementos decorativos em movimento constante. Zero dependências novas -- tudo CSS puro + IntersectionObserver.

---

### Novos arquivos

| Arquivo | O que faz |
|---|---|
| `src/hooks/useScrollReveal.ts` | Hook com IntersectionObserver -- retorna ref + classe `is-visible`. Suporta stagger delay para listas |
| `src/components/FloatingElements.tsx` | Estrelas, círculos, squiggles com `position: absolute` e animações `float`, `spin-slow`, `bounce-soft` infinitas |
| `src/components/Marquee.tsx` | Ticker horizontal infinito (duplica children, anima com `translateX(-50%)`) |
| `src/components/AnimatedDivider.tsx` | Faixa entre seções com emojis/shapes animados (estrelas girando, corações pulsando, sparkles) |

### Arquivos modificados

**`src/index.css`** -- Mudança mais pesada:
- Nova paleta: `--background: #F5E6D3`, cores quentes no `:root` e `.dark`
- Background com grid pattern SVG (linhas finas estilo papel milimetrado)
- ~15 keyframes: `float`, `spin-slow`, `bounce-soft`, `marquee`, `pop-in`, `fade-up`, `slide-in-left`, `slide-in-right`, `glow-pulse`, `wiggle`, `tilt`, `typing`, `scale-bounce`
- Classes utilitárias: `.scroll-reveal` (opacity 0 → 1 on `.is-visible`), `.stagger-1` a `.stagger-8` com delays

**`tailwind.config.ts`** -- Registrar as novas animações e cores no theme.extend

**`src/components/HeroSection.tsx`** -- Reescrita completa:
- Grid pattern background
- Nome com animação de typing/reveal
- 6-8 floating stickers (emojis + shapes) com parallax no `onMouseMove`
- Botões com hover glow + scale
- Elementos decorativos: ⭐ 🎨 ✏️ 💖 com animações `float` e `spin-slow`

**`src/components/AboutSection.tsx`** -- Scroll reveal fade-up, stickers decorativos flutuando

**`src/components/SkillsSection.tsx`** -- Tags com pop-in staggered via scroll reveal + Marquee horizontal de skills entre hard/soft

**`src/components/ProjectsSection.tsx`** -- Cards com:
- Staggered fade-up no scroll
- Hover: `scale(1.03) rotate(1deg)` tilt + glassmorphism overlay
- Imagem zoom suave no hover

**`src/components/ContactSection.tsx`** -- Background com floating shapes, botões com pulse/glow animation

**`src/components/Navbar.tsx`** -- Underline animada no link ativo (scale-x transition), mobile menu slide-in

**`src/components/Footer.tsx`** -- Marquee ticker com nome/skills rolando + stickers animados

**`src/pages/Index.tsx`** -- Inserir `FloatingElements` global + `AnimatedDivider` entre cada seção

### Performance
- Apenas `transform` e `opacity` para animações GPU-accelerated
- `will-change` nos elementos animados
- IntersectionObserver com `threshold: 0.1` e `rootMargin` para trigger antecipado
- Sem GIFs externos -- tudo via CSS animations e emojis Unicode

