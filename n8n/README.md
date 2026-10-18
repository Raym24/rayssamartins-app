# Workflows n8n de prospecção comercial

## Arquivos

- `workflows/prospeccao-comercial-gmail.json`: consulta novas solicitações em `public.solicitacoes_orcamento`, avalia relevância, personaliza mensagens, envia pelo Gmail quando `consentimento_marketing` é verdadeiro e cria rascunhos para revisão quando o envio não está autorizado.
- `workflows/monitoramento-respostas-gmail.json`: monitora respostas recentes no Gmail, identifica sinais de negociação e envia um alerta para o endereço configurado.

## Configuração

1. Importe cada arquivo JSON no n8n.
2. Crie ou selecione uma credencial OAuth2 do Gmail com permissão para ler mensagens, criar rascunhos e enviar e-mails.
3. Substitua a credencial `GMAIL_CREDENTIAL_ID` pela credencial Gmail selecionada no n8n.
4. Configure estas variáveis de ambiente no n8n:
   - `SUPABASE_URL`: URL do projeto Supabase.
   - `SUPABASE_SERVICE_ROLE_KEY`: chave de serviço mantida exclusivamente no n8n, nunca no frontend.
   - `ALERT_EMAIL`: endereço que receberá alertas de negociação.
5. Execute cada workflow manualmente com dados de teste antes de ativar os gatilhos.
6. Ative o workflow de prospecção somente depois de revisar os textos e confirmar a política de consentimento da operação.

## Regras de segurança e consentimento

O workflow consulta exclusivamente as colunas existentes em `solicitacoes_orcamento`: `id`, `nome`, `email`, `telefone`, `empresa`, `origem`, `descricao`, `status`, `observacoes`, `consentimento_marketing`, `criado_em` e `atualizado_em`.

Mensagens automáticas só são enviadas quando `consentimento_marketing` é exatamente `true`. Nos demais casos, o Gmail recebe apenas um rascunho para revisão manual. A chave `SUPABASE_SERVICE_ROLE_KEY` deve permanecer apenas nas credenciais ou variáveis protegidas do n8n.

Os valores de status usados pelo workflow são `contatado` e `rascunho_para_revisao`. Antes da ativação em produção, confirme se esses valores são compatíveis com o processo comercial adotado.
