# Filhos do Destino — Quiz

Quiz interativo ambientado no universo de **Filhos do Destino**, um mundo onde a mitologia grega é real e a humanidade convive abertamente com semideuses. O site aplica dois testes de personalidade que cruzam as respostas do usuário com vetores de traços pré-calibrados para revelar (1) qual **deus grego** seria seu parente divino, entre 16 opções, e (2) qual das 5 **organizações** do território de Pandora ele integraria.

## 1. Objetivos do projeto

**O que é:** uma landing page + quiz de personalidade "estilo Buzzfeed", com identidade visual grega (colunas, louros, ouro sobre fundo escuro) construída para divulgar a campanha/RPG "Filhos do Destino".

**O que faz:**
- Dois fluxos de quiz (`/quiz/deuses` e `/quiz/organizacoes`), cada resposta soma pesos a um vetor de traços do usuário (`coragem`, `sabedoria`, `ordem`, `astucia`, `compaixao`, `ambicao`, `preguica`, `confianca`).
- O motor do quiz (`src/lib/quizEngine.js`) normaliza esse vetor (z-score, com base numa calibração fixa) e calcula a **similaridade de cosseno** contra o vetor de cada deus/organização, rankeando os candidatos e sorteando o resultado por peso entre os melhores colocados — não é sempre o "primeiro lugar cravado", há uma variação controlada.
- Página de resultado (`/resultado`) com detalhes da entidade sorteada e um **card compartilhável** gerado como imagem (via `html-to-image`) para redes sociais.
- **Mapa Mundi** interativo (`/mapa`) do território de Lua Nova, com pan/zoom (mouse, roda e touch/pinça) e marcadores clicáveis por local.
- Persistência opcional dos resultados no Supabase (tabela `quiz_results`), só leitura de tela. Foco do projeto atualmente é poder consultar estes dados de volta, sem prejudicar funcionamento.

**Principais frameworks e bibliotecas:**
- [React 19](https://react.dev/) + [React Router 7](https://reactrouter.com/) — SPA e rotas.
- [Vite 8](https://vite.dev/) — build/dev server, com `@vitejs/plugin-react`.
- [Tailwind CSS 4](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/) — estilização utilitária e tema.
- [Framer Motion](https://www.framer.com/motion/) — animações de entrada/transição.
- [Supabase JS](https://supabase.com/docs/reference/javascript) — client para gravar resultados do quiz.
- [html-to-image](https://github.com/bubkoo/html-to-image) — geração do card de resultado como imagem.
- [react-icons](https://react-icons.github.io/react-icons/) e [react-parallax-tilt](https://www.npmjs.com/package/react-parallax-tilt) — ícones e efeito de tilt em cards.
- [@vercel/analytics](https://vercel.com/docs/analytics) — analytics de deploy na Vercel.
- [Oxlint](https://oxc.rs/) — linter.

## 2. TODOs do projeto (possíveis features futuras)

- [ ] Painel administrativo para consultar os resultados salvos no Supabase (hoje só há `insert`, nenhuma leitura/`select` implementada).
- [ ] Busca binária pelos usuários cadastrados com seus parentes divinos e suas organizações, junto de seu registro de profecias.
- [ ] Regionalizar o Mapa Mundi (bairros/áreas agrupando pontos de interesse) para permitir zoom por região.
- [ ] Testes automatizados (não há suíte de testes configurada no projeto ainda).
- [ ] Compartilhar resultado direto para redes sociais (hoje o card é gerado como imagem para download/compartilhamento manual).

## 3. Como rodar

Pré-requisitos: [Node.js](https://nodejs.org/) 18+ e npm.

```bash
# instalar dependências
npm install

# rodar em modo desenvolvimento (http://localhost:5173)
npm run dev

# gerar build de produção em dist/
npm run build

# servir a build de produção localmente
npm run preview

# rodar o linter (Oxlint)
npm run lint
```

O projeto usa Supabase para salvar os resultados do quiz. As variáveis de ambiente ficam em `.env.local` (já ignorado pelo git):

```
VITE_SUPABASE_URL=<url-do-seu-projeto-supabase>
VITE_SUPABASE_ANON_KEY=<chave-anon-do-seu-projeto-supabase>
```

Sem essas variáveis (ou com um projeto Supabase sem a tabela `quiz_results`), o app funciona normalmente — apenas um aviso é impresso no console e o resultado não é persistido.

## 4. O que foi adicionado com base na disciplina de Estrutura de Dados 2

O objetivo de implementar um gerador de profecias com base nos usuários já era uma vontade prévia da matéria. Os primeiros testes com busca linear fizeram o site cair, pois estava tentando consultar com o uso de cache para nn sobrecarregar em querys.

A resolução em PRODUÇÃO foi otimizar o próprio banco de dados, corrigindo as tabelas com UNIQUE e passando o username como índice único. O supabase otimiza as consultas automaticamente, então o problema inicial foi resolvido.

Caso tenha interesse, o professor pode acessar o repositório de produção aqui:

[Link produção](https://github.com/Faehzin/FDDQuiz)

**Para a disciplina**, focando na aprendizagem e na real entrega do trabalho, optei por fazer uma "alteração" pequena. Como roda local, o website puxa todos os registros em profecias no cliente, permitindo que rode o algoritmo de busca binária implementado. O ato de puxar os registros já ocorre de forma ordenada.

Não utilizo o .find() em nenhum momento, com o objetivo de usar o algoritmo para o trabalho. 

Criei uma nova tabela com 500 dados "fakes" apenas para teste.


## 5. Autores

| Nome | GitHub |
|---|---|
| Gabriel Fae | [@Faehzin](https://github.com/Faehzin) |


## 6. Vídeo demonstrativo

<!-- Anexar aqui o link ou embed do vídeo de demonstração do projeto -->
