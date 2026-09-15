# Corrigir acessibilidade do menu e título principal

## Alterações
- Adicionar ao botão do menu móvel um nome acessível dinâmico em português, indicando “Abrir menu” ou “Fechar menu” conforme o estado.
- Expor o estado e a relação do botão com o painel usando `aria-expanded` e `aria-controls`, com um identificador correspondente no menu.
- Atualizar o H1 para comunicar “Rayssa Martins — UI/UX Designer & Web Designer” aos mecanismos de busca e leitores de tela, preservando a composição visual em duas linhas.

## Validação
- Conferir no preview que o menu continua abrindo e fechando normalmente.
- Verificar no DOM renderizado o nome acessível, o estado do botão e o conteúdo completo do H1.
- Marcar o achado de SEO como corrigido após validar os dois pontos.
