# Protótipo - Agendamento de Provas

Este é um protótipo em React (Vite) para a página de agendamento de provas. Ele foi feito para demonstrar a solução de usabilidade proposta pelo grupo.

## Funcionalidades
- Agendar prova (nome, curso, data, observações)
- Listar agendamentos
- Remover agendamentos
- Integração com Supabase (opcional). Caso não configure Supabase, o protótipo usa localStorage como fallback.

## Como usar

1. Instale dependências:
   npm install

2. Se quiser usar Supabase:
   - Crie um projeto no https://supabase.com
   - Crie uma tabela `appointments` com colunas:
     - id (bigint) PRIMARY KEY (auto increment) OR use default generated UUID/text
     - student_name (text)
     - course (text)
     - exam_date (timestamp or text)
     - notes (text)

   - No root crie um arquivo `.env` com:
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-anon-key

3. Rodar em dev:
   npm run dev

Se não configurar Supabase, os dados serão salvos no localStorage do navegador.

