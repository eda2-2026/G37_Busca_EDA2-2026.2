# Algoritmos de busca no projeto Filhos do Destino

Este relatório usa o código-fonte do quiz "Filhos do Destino" (React + Vite) como
estudo de caso para os cinco tópicos de busca da disciplina: sequencial, binária,
interpolação, árvores e hashing. Para cada um, respondo três perguntas: onde já é
usado hoje (explícita ou implicitamente), onde poderia fazer sentido mesmo sem
uso atual, e se realmente vale a pena implementar aqui. Feito por leitura direta
do código em `src/` — não alterei nenhum arquivo do projeto para escrever isto.

Aviso sobre o método: quando cito "onde já é usado", estou falando do código
JavaScript/React do projeto. Não conto o algoritmo de renderização do React nem
a árvore DOM como "árvore de busca" — são árvores, mas não estruturas de busca
no sentido do assunto 4. Sigo essa mesma disciplina em todo o documento: só
conto um uso como exemplo do algoritmo se ele realmente exerce o papel
correspondente (buscar um elemento, não só organizar dados em forma de árvore).

---

## 1. Busca sequencial

### Onde já é usado

O projeto usa exatamente **uma** chamada explícita de busca sequencial via método
nativo, em [`src/components/landing/LocationsSection.jsx:9`](../src/components/landing/LocationsSection.jsx):

```js
const FEATURED_LOCATIONS = FEATURED_IDS.map((id) => MAP_LOCATIONS.find((loc) => loc.id === id)).filter(Boolean);
```

`Array.prototype.find()` é busca sequencial em estado puro: percorre
`MAP_LOCATIONS` (13 locais) do início até achar `loc.id === id`, sem nenhuma
estrutura auxiliar de índice. É chamada 3 vezes (uma por item de
`FEATURED_IDS`), sempre no corpo do componente — ou seja, uma vez por
renderização da landing page, não dentro de um loop quente.

O segundo caso, mais interessante, é uma busca sequencial escrita à mão (não via
método de array) em [`src/lib/quizEngine.js:97-101`](../src/lib/quizEngine.js),
dentro de `weightedPick()`:

```js
let roll = Math.random() * totalWeight;
for (let i = 0; i < pool.length; i++) {
  roll -= weights[i];
  if (roll <= 0) return pool[i].entity;
}
```

Isso é o algoritmo clássico de "roleta ponderada" (weighted random selection):
percorre a lista de candidatos subtraindo pesos até o acumulador cruzar zero, e
retorna assim que a condição é satisfeita — busca sequencial com parada
antecipada, didaticamente tão válida quanto qualquer `.find()`, só que
implementada manualmente porque a lógica de parada não é uma simples igualdade.

Vale mencionar também `rankResults()` (`quizEngine.js:79-86`), que faz
`entities.map(...)` sobre toda a coleção (deuses ou organizações) para calcular
a similaridade de cosseno de cada uma com o vetor do usuário. Tecnicamente isso
**não é busca** — é uma varredura completa e obrigatória, porque calcular "qual
é a mais parecida" exige avaliar todas as candidatas, não é possível parar
cedo. Mas compartilha o mesmo princípio O(n) sem estrutura auxiliar, e é o
motivo pelo qual cito essa função também: mostra o caso em que "percorrer tudo
sequencialmente" não é uma limitação, é a única abordagem correta, porque não
existe uma chave de busca fixa — a "resposta certa" depende do vetor do
usuário, que muda a cada sessão.

### Onde poderia fazer sentido, mesmo sem uso hoje

- Buscar uma pergunta específica em `QUESTIONS_GODS`/`QUESTIONS_ORGS` pelo campo
  `id` (hoje o acesso é sempre posicional, `questions[step]`, dentro de
  `QuizFlow.jsx`, nunca por busca).
- Buscar um herói específico em `CAMPAIGN_HEROES` por nome, se algum dia
  existir uma barra de busca na landing (hoje `CampaignHeroesSection.jsx`
  simplesmente itera e renderiza todos, nunca busca um específico).
- Qualquer filtro de UI que ainda não existe (ex: "mostrar só organizações com
  `ordem` positivo") seria naturalmente um `.filter()`, ou seja, busca
  sequencial com critério composto.

### Vale a pena implementar aqui?

Sim, e já está do jeito certo. `MAP_LOCATIONS` tem 13 itens, `GODS` tem 16,
`ORGANIZATIONS` tem 5 — em qualquer um desses tamanhos, uma varredura linear
custa microssegundos, é executada no máximo uma vez por render (não dentro de
loop de interação do usuário, tipo scroll ou drag), e o overhead de manter uma
estrutura mais sofisticada (ordenar, indexar) superaria de longe o ganho.
Escrever uma "buscaSequencial(array, criterio)" própria em vez de usar
`.find()` seria reinventar a roda sem motivo: o método nativo já é O(n), já é
legível, e o motor JS já o otimiza tão bem quanto qualquer loop manual
equivalente escreveria.

---

## 2. Busca binária

### Onde já é usado

Em lugar nenhum. Não há, hoje, nenhuma coleção do projeto mantida ordenada por
uma chave de busca com o propósito de permitir busca binária sobre ela.

Vale destacar um caso que *parece* relevante mas não é: `rankResults()`
(`quizEngine.js:86`) termina com `.sort((a, b) => b.score - a.score)`, então o
array retornado **está** ordenado por score. Mas o único consumo desse array é
`weightedPick()` fazendo `rankedResults.slice(0, topN)` — pegar os primeiros N
elementos de um array já ordenado é O(N) trivial, não precisa de busca alguma
(muito menos busca binária, que serve para *localizar* um elemento dentro da
coleção ordenada, não para pegar o topo dela).

### Onde poderia fazer sentido, mesmo sem uso hoje

- Dentro do próprio array ordenado que `rankResults()` já produz de graça: se
  em algum momento quiséssemos "qual entidade tem o score mais próximo de
  0.75?" em vez de "quais são as 3 melhores", busca binária (ou sua variante de
  vizinho mais próximo) seria a ferramenta certa — e a pré-condição (array
  ordenado) já existiria sem custo extra, já que o `.sort()` já roda de
  qualquer forma.
- Se os 16 deuses ou as organizações fossem exibidos em algum componente de
  navegação ordenado alfabeticamente (não existe hoje — o resultado do quiz é
  sempre 1 entidade sorteada, nunca uma lista para o usuário navegar), e
  houvesse uma função tipo "pular direto para a letra P".

### Vale a pena implementar aqui?

Não, e a resposta é fácil de justificar com números: a maior coleção do
projeto (`GODS`) tem 16 itens. Busca binária reduziria o pior caso de 16
comparações sequenciais para até 4 (log₂16 = 4). Essa economia de 12
comparações não é mensurável em tempo de execução real — estamos falando de
uma fração de microssegundo tanto num caso quanto no outro, numa operação que
roda no máximo algumas vezes por sessão do usuário, nunca em loop. Implementar
busca binária aqui teria custo real (manter a coleção ordenada, escrever e
testar a lógica de partição, risco de bug de off-by-one) para economizar um
tempo que nenhum usuário jamais perceberia. É o exemplo mais claro de
over-engineering que este assunto pode gerar: tecnicamente correto, ganho
prático zero.

---

## 3. Busca por interpolação

### Onde já é usado

Em lugar nenhum — e aqui vou além de "não é usado" para dizer que **nem o
pré-requisito existe**. Busca por interpolação depende de uma coleção ordenada
por uma chave numérica com distribuição aproximadamente uniforme, para estimar
a posição do alvo em vez de sempre dividir ao meio. Nenhuma estrutura do
projeto tem esse formato: os IDs são strings (`'zeus'`, `'Lua-nova'`,
`'sophia'`), não números; e onde há números (os `traits`, de -1 a 1, ou o
`score` calculado por cosseno), eles não são usados como chave de busca — são
usados como valores para *calcular* similaridade, não para localizar um
registro.

### Onde poderia fazer sentido, mesmo sem uso hoje

Honestamente, não encontrei um encaixe convincente dentro do formato atual do
projeto, nem hipotético. O caso de uso clássico de interpolação — grande volume
de registros, chave numérica, distribuição uniforme conhecida (catálogos por
faixa de preço, IDs sequenciais, timestamps) — não aparece em nenhuma tela.
O cenário mais próximo que consigo imaginar é hipotético o suficiente que
prefiro desenvolvê-lo só na seção final ("Se este projeto crescesse..."), em
vez de forçar um exemplo artificial aqui.

### Vale a pena implementar aqui?

Não, e nem vale a pena filosofar muito sobre isso: não há dado numérico
ordenado e uniformemente distribuído no projeto hoje para justificar sequer a
discussão de custo/benefício. Diferente da busca binária (onde pelo menos
existe uma coleção ordenada, só não vale a pena usar), aqui falta a matéria-
prima. Forçar uma implementação só para "cobrir o tópico" seria o oposto do
que este relatório se propõe a fazer.

---

## 4. Busca em árvores (BST, AVL etc.)

### Onde já é usado

Em lugar nenhum. Verifiquei especificamente se `ORGANIZATIONS`
(`src/data/orgs.js`) tinha algum campo de hierarquia (sub-organizações,
`parentId`, `children`) — não tem. São 5 objetos num array plano, todos no
mesmo nível, cada um com `id`, `nome`, `foco`, `descricao`, `traits`, `imagem`.
O mesmo vale para `GODS`, `MAP_LOCATIONS` e `CAMPAIGN_HEROES`: todas as
coleções de dados do projeto são arrays achatados por design, sem relação
pai-filho entre os registros.

(Nota à parte, para não deixar implícito: a árvore de componentes React e o DOM
resultante *são* uma árvore, mas não são uma árvore de *busca* — não existe
uma chave ordenadora que permita descartar metade da árvore a cada
comparação, como numa BST. Não conto isso como uso do algoritmo do assunto 4.)

### Onde poderia fazer sentido, mesmo sem uso hoje

- **Sub-organizações aninhadas**, exatamente como o enunciado sugere: hoje
  `ORGANIZATIONS` é plano, mas o lore do projeto já sugere hierarquia em
  potencial — Lua Nova, por exemplo, tem "quatro semideuses representantes"
  segundo o texto de `mapLocations.js` (local "Centro"), o tipo de estrutura
  que naturalmente vira células, facções ou subdivisões dentro de uma
  organização maior.
- **Hierarquia espacial no Mapa Mundi**: `MAP_LOCATIONS` guarda coordenadas
  `x`/`y` soltas; se o mapa ganhasse regiões (bairros contendo pontos de
  interesse), uma árvore espacial (quadtree, não uma BST clássica, mas da
  mesma família de estruturas de busca em árvore) seria a ferramenta certa
  para "quais marcadores estão visíveis nesta área da tela" em vez de testar
  os 13 marcadores um por um a cada frame de pan/zoom.

### Vale a pena implementar aqui?

Não hoje, porque a pré-condição simplesmente não existe: não há dado
hierárquico no projeto para uma árvore de busca operar sobre. Isso é diferente
dos casos de busca binária/interpolação (onde a estrutura de dados poderia
existir, só não compensaria); aqui, implementar uma BST exigiria primeiro
inventar uma hierarquia que o produto não tem, o que tornaria o exemplo
artificial por definição. Vou desenvolver o cenário de sub-organizações com
mais profundidade na seção final, porque é o único dos cinco tópicos em que a
resposta certa hoje é "não há nem o que buscar", não "há, mas não compensa".

---

## 5. Hashing

### Onde já é usado

Este é o algoritmo mais usado no projeto, de longe — só que de forma nativa e
implícita, via objetos JavaScript, nunca com uma tabela hash escrita à mão.
Vale abrir em duas categorias, porque os padrões são bem diferentes.

**Mapas de asset (slug → arquivo importado).** Três arquivos seguem o mesmo
padrão: usam `import.meta.glob` para carregar todos os arquivos de uma pasta e
constroem um objeto JS onde a chave é o nome do arquivo sem extensão:

- [`src/lib/assetImages.js:15-23`](../src/lib/assetImages.js) — função
  `buildSlugMap()`, usada para gerar `godImageMap` e `orgImageMap`.
- [`src/lib/campaignImages.js:16-24`](../src/lib/campaignImages.js) — mesma
  função, duplicada, para `campaignImageMap`.
- [`src/lib/mapImage.js`](../src/lib/mapImage.js) — mesma técnica de glob,
  embora aqui só se pegue o primeiro valor (`Object.values(...)[0]`), sem
  busca por chave.

Esses mapas são consultados por acesso de chave — `objeto[chave]`, O(1)
amortizado — em pelo menos 9 pontos diferentes do código:
`Result.jsx:66,79`, `MapResultSidebar.jsx:18`, `ShareCard.jsx:63,67`,
`HeroCard.jsx:35-36`, `ZeusArt.jsx:13`, `HeroSection.jsx:8`,
`LocationsSection.jsx:16,36` e `CampaignHeroesSection.jsx:8`. Cada um desses é
uma busca por chave numa tabela hash, só que ninguém no código chama assim —
é só `godImageMap[id]`, e o motor JS resolve o resto.

Dois casos particulares merecem menção: `LOCATION_IMAGE_OVERRIDES` em
`LocationsSection.jsx:13` e `ACTOR_IMAGE_OVERRIDES` em `HeroCard.jsx:9-14` são
tabelas hash pequenas e explícitas, escritas à mão como objeto literal, para
resolver exceções de nomenclatura de arquivo (`mercado` → `hermes.png`,
`sophia` → `atrizsophia.jpg`). São hash tables de verdade, só que tão pequenas
(1 a 4 entradas) que "implementá-las" já é só declarar o objeto.

**Vetores de traço (trait → valor).** Esse é o uso mais estrutural, dentro do
próprio motor do quiz:

- [`src/data/traits.js:12-21`](../src/data/traits.js) — `TRAIT_LABELS`, hash
  fixo de traço → rótulo em português.
- [`src/lib/quizEngine.js:46`](../src/lib/quizEngine.js) — dentro de
  `zNormalize()`, `const cal = calibration[trait];` busca a média/desvio-padrão
  daquele traço em `TRAIT_CALIBRATION_GODS`, um objeto de 8 entradas usado como
  tabela de consulta O(1), chamado uma vez por traço (8×) para cada entidade
  ranqueada — ou seja, dentro do loop mais quente do projeto inteiro
  (`rankResults()` roda para as 16 deuses ou 5 organizações, a cada resposta
  final do quiz).
- `scoreUser()` (`quizEngine.js:12-23`) e `emptyTraitVector()`
  (`quizEngine.js:3-5` e `traits.js:23-25`) constroem e atualizam vetores de
  traço inteiramente via leitura/escrita por chave (`vector[trait] += ...`).

### Onde poderia fazer sentido, mas não é usado

Nada de relevante ficou de fora. Diferente dos outros quatro tópicos, aqui a
pergunta natural não é "onde poderia ser usado" — é praticamente tudo que
precisava de lookup por chave já usa objeto JS para isso. O único "buraco" que
encontrei é mais semântico que técnico: `godResult`/`orgResult` no
`ResultsContext` (`src/context/ResultsContext.jsx`) são guardados como um
único objeto em `useState`, não como entrada de um mapa maior — mas isso faz
sentido, porque só existe *um* resultado de cada tipo por sessão. Não há
coleção nenhuma ali para indexar.

### Vale a pena implementar aqui?

A pergunta certa não é "vale a pena implementar hashing" — já está
implementado, em todo lugar onde faz sentido, usando a estrutura nativa da
linguagem. A pergunta é "valeria a pena escrever uma tabela hash manual (função
hash própria, array de buckets, tratamento de colisão por encadeamento ou
endereçamento aberto) no lugar do objeto JS nativo?" E aqui a resposta é não,
com uma ressalva importante: isso teria valor **didático** genuíno — é
literalmente o exercício clássico da disciplina, escrever `hash(chave) % N` e
lidar com colisão na mão ensina o que o objeto nativo esconde. Mas em código de
produção seria uma regressão, não uma melhoria: o objeto/`Map` do V8 (ou
qualquer engine JS moderna) já é implementado em C++ com décadas de otimização
específica para tabelas pequenas e médias (hidden classes, inline caching),
processa essas ~9 buscas por render em frações de microssegundo, e qualquer
implementação manual em JavaScript puro seria mais lenta, mais código para
manter, e resolveria um problema que a linguagem já resolve.

---

## Nota lateral: Supabase

O projeto só escreve no Supabase — `supabaseClient.js:30`,
`supabase.from('quiz_results').insert(...)` — e não faz nenhuma leitura
(`.select()`/`.eq()`) em lugar nenhum do código atual. Não há, portanto, uma
busca real acontecendo contra o banco hoje. Se um painel administrativo fosse
construído para revisar os resultados salvos, aí sim entraria em jogo o que o
Postgres faz por baixo dos panos ao indexar uma coluna (tipicamente B-tree por
padrão, hash index para igualdade pura, GiST/GIN para casos especiais) — mas
isso é infraestrutura do banco, não algoritmo escrito no código deste projeto,
então trato como nota lateral, não como um caso de uso implementado ou
implementável por nós.

---

## Se este projeto crescesse...

### Histórico de rolagens por intervalo de timestamp

A tabela `quiz_results` já existe e já recebe uma escrita a cada resultado
salvo (`resultado_id`, `vetor_usuario`, `tipo_quiz`) — hoje sem nenhuma
consulta de volta. Se o projeto ganhasse um painel "quantas pessoas tiraram
Zeus esse mês" ou "resultados entre 1º e 15 de março", duas coisas mudariam de
figura:

- No banco, seria natural indexar a coluna de timestamp — e aí a estrutura por
  trás do índice do Postgres (B-tree balanceada) é, arquiteturalmente, prima da
  árvore de busca do assunto 4, só que otimizada para disco e paginada em
  blocos, não uma BST didática de nós e ponteiros.
- Se, em vez de consultar o banco a cada requisição, o painel carregasse um
  lote de resultados em memória no cliente (JavaScript) já ordenado por
  timestamp para exibir num gráfico, **essa** seria a situação de livro-texto
  perfeita para busca por interpolação: timestamps são numéricos, tendem a ter
  distribuição aproximadamente uniforme ao longo de um período (ninguém
  concentra 90% das respostas num segundo), e "encontrar o primeiro resultado
  depois de 14h32" se beneficiaria de estimar a posição em vez de sempre
  dividir ao meio. É o cenário mais forte que encontrei para justificar
  interpolação neste produto — só que ele mora no crescimento hipotético do
  histórico, não no código atual.

### Centenas de heróis de campanha, busca por nome/prefixo

`CAMPAIGN_HEROES` tem 6 entradas hoje (`src/data/campaignHeroes.js`). Se a
campanha crescesse para centenas de personagens jogáveis e a landing ganhasse
uma busca tipo "digite o nome do seu personagem", eu não recomendaria uma BST
genérica para esse caso — recomendaria uma **trie** (árvore de prefixos), que
é a estrutura padrão-ouro para autocomplete por prefixo: cada nó representa um
caractere, e buscar por prefixo custa O(tamanho do prefixo), não O(log n) nem
O(n). Não estava na lista original de "BST, AVL etc.", mas é a variante de
árvore de busca que realmente resolveria esse problema específico melhor que
as citadas — vale mencionar porque mostra que a escolha certa de estrutura
depende do formato da consulta (igualdade exata vs. prefixo), não só do
volume de dados.

### Sub-organizações aninhadas em `ORGANIZATIONS`

Esse é o cenário mais natural para árvores de busca de verdade, e o lore do
projeto já dá pistas de que isso poderia crescer organicamente: hoje
`ORGANIZATIONS` tem 5 entradas (`Lua Nova`, `Anthros`, `Imítheos`, `Legião 83`,
`Taurinos`), todas de nível único. Mas o texto de `mapLocations.js` já
descreve Lua Nova como algo mais estruturado internamente (quatro
representantes, um prédio central com "salas de reunião, escritórios,
itens-legado"). Se cada organização ganhasse facções ou células internas —
`Lua Nova → Guarda de Maratona, Restaurante Comunitário, Conselho dos Quatro`,
por exemplo — o dado natural seria uma árvore N-ária (cada organização é um
nó, com filhos representando suas subdivisões), navegada por hierarquia (ex:
"mostrar a estrutura completa da organização X"), não por uma chave de
ordenação como numa BST clássica. Para *buscar* uma facção específica por
nome dentro dessa árvore, a resposta pragmática seria indexar todas as folhas
num objeto/`Map` plano por `id` (voltando a usar hashing, seção 5) — a árvore
resolveria a navegação/exibição hierárquica, o hash resolveria a busca pontual.
É um bom exemplo de como, na prática, os dois algoritmos coexistem: a árvore
não substitui o hash, cada um resolve um problema diferente sobre os mesmos
dados.

### Uma tabela hash caseira, e por que a nativa já basta

Se eu fosse implementar uma tabela hash manual para este projeto (puramente
como exercício, já que a nativa já resolve tudo hoje), o desenho seria: um
array fixo de N buckets, uma função hash simples sobre a string da chave (algo
como djb2 — `hash = hash * 33 + charCode`, seguido de `% N`), e tratamento de
colisão por encadeamento separado (cada bucket guarda uma lista de pares
chave-valor, já que strings diferentes podem cair no mesmo índice). Para as
~16 entradas do maior mapa do projeto (`godImageMap`), isso seria overkill
puro — o objeto nativo já faz exatamente isso, só que escrito em C++ dentro do
motor V8, com otimizações (hidden classes, inline caching) que uma
implementação em JavaScript puro não replica. A tabela nativa só deixaria de
bastar em cenários fora do alcance realista deste produto: por exemplo, se
precisássemos de uma função hash com propriedades criptográficas específicas
(não é o caso — aqui é só lookup por slug de arquivo), ou se estivéssemos rodando
fora de um motor JavaScript. Para um catálogo de assets, mesmo que crescesse
para dezenas de milhares de entradas, o objeto/`Map` nativo continuaria sendo a
escolha certa.

---

## Resumo

| Algoritmo | Usado hoje? | Vale implementar? |
|---|---|---|
| Busca sequencial | Sim (`.find()` em `LocationsSection.jsx`; loop manual em `weightedPick()`) | Já está do jeito certo — coleções pequenas, uso esporádico |
| Busca binária | Não | Não — 16 itens no máximo, ganho imperceptível |
| Interpolação | Não (nem o pré-requisito existe) | Não — falta dado numérico ordenado para justificar |
| Árvores de busca | Não (dados são planos) | Não hoje — precisaria inventar uma hierarquia que não existe |
| Hashing | Sim, extensivamente (objetos JS como mapa em ~15 pontos do código) | Já implementado via nativo; versão manual seria só didática |
