/* Motor partilhado pelos dois sites. Cada um traz o seu APP, NIVEIS e GUIAS.
   O progresso vive numa chave comum, porque os ids de trilha não colidem entre
   eixos, e o tema é partilhado de propósito: quem escolhe escuro num site
   espera encontrar escuro no outro. */
const STORAGE_KEY = "100to:progress";
const OVERVIEW_ID = "__overview__";

const GUIAS_TODOS = GUIAS;
const TRILHAS = NIVEIS.flatMap((n) => n.trilhas);

const ICON_GRID =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>';

const ICON_BOOK =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>';

const ICON_SUN =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';

const ICON_MOON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';

const ICON_LOCK =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>';

const ICON_CHECKLIST =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 7 2 2 4-4"/><path d="m3 17 2 2 4-4"/><path d="M13 7h8"/><path d="M13 17h8"/></svg>';

const ICON_HINT =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.5.5.8 1 .8 1.7V16h6.4v-.8c0-.7.3-1.2.8-1.7A6 6 0 0 0 12 3Z"/></svg>';

const ICON_LIVRO =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M12 3h5.5A2.5 2.5 0 0 1 20 5.5v14a2.5 2.5 0 0 1-2.5 2.5H12"/><path d="M8 8h2M8 12h2"/></svg>';

const ICON_CHAT =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>';

const ICON_CORRIGIR =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>';

const ICON_TRENDING =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>';

const ICON_TROFEU =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3a2 2 0 0 1-2 5h-1M7 5H4a2 2 0 0 0 2 5h1"/></svg>';

const ICON_UTILIZADOR =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>';

const THEME_KEY = "100to:theme";
const ENTRY_KEY = "100to:entrada";
const NOTAS_KEY = "100to:notas";
const PERFIL_KEY = "100to:perfil";
const AVATARES = ["🦫", "🐹", "🦉", "🐙", "🦊", "🐢", "🚀", "⚡", "🌱", "🎯"];

// Piloto: chat de dúvidas e correção com IA, só disponível para estes blocos
// (têm solução de referência escrita em /api/_ref) e só quando o site corre
// num domínio com as serverless functions da Vercel — o GitHub Pages é
// puramente estático e não as tem.
const BLOCOS_COM_CORRECAO_IA = ["b0"];
const API_DISPONIVEL = !/github\.io$/.test(location.hostname);

/* ---------------------------------------------------------------------------
   Realce de código nos enunciados.

   Os enunciados são prosa com identificadores Go pelo meio, e lê-se muito mal
   quando "type Task struct" aparece com o mesmo peso que o resto da frase.
   Os padrões abaixo são deliberadamente conservadores: só marcam o que é
   inequivocamente código. Marcar a menos é aceitável, marcar a mais não é.
   --------------------------------------------------------------------------- */

// Nomes próprios em CamelCase que são produtos, não identificadores de código.
const NAO_E_CODIGO = new Set([
  "GitHub", "GitLab", "PostgreSQL", "MySQL", "NoSQL", "GraphQL", "OpenTelemetry",
  "RabbitMQ", "JavaScript", "TypeScript", "WebSocket", "OAuth", "OpenAPI",
  "DockerHub", "JetBrains", "VSCode", "MacOS", "OpenShift", "CloudFlare",
  "PostgreSQL/", "OpenSSL", "JSON", "YAML",
]);

const CODE_RE = new RegExp(
  [
    // type Nome struct { ... } / interface { ... }
    "\\btype\\s+[A-Z]\\w*\\s+(?:struct|interface)\\s*\\{[^{}]*\\}",
    "\\btype\\s+[A-Z]\\w*\\s+(?:struct|interface)\\b",
    // for i := 0; i < 10; i++
    "\\bfor\\s+\\w+\\s*:=\\s*[^;{]+;[^;{]+;\\s*[\\w+-]+",
    // declarações: var x int = 5, z := 5, t, ok := v.(Task)
    "\\bvar\\s+\\w+(?:\\s+[\\w\\[\\]*.]+)?(?:\\s*=\\s*[\\w.\"'()\\[\\]-]+)?",
    "\\b\\w+(?:,\\s*\\w+)*\\s*:=\\s*[\\w.\"'()\\[\\]{}<>+*/-]+",
    // asserção de tipo: v.(Task), v.(type)
    "\\b\\w+\\.\\((?:type|[A-Z]\\w*)\\)",
    // retornos múltiplos: (Task, error)
    "\\((?:[A-Z]\\w*|int|string|bool|error|float64)(?:,\\s*(?:[A-Z]\\w*|int|string|bool|error|float64))+\\)",
    // if/else mencionado como construção
    "\\bif/else(?:\\s+if)?\\b",
    // verbos de formatação: %T, %v, %w
    "%[TvwsdqxX]\\b",
    // método com receiver: (t Task) Resumo() string
    "\\((?:\\w+\\s+)?\\*?[A-Z]\\w*\\)\\s*[A-Z]\\w*\\([^()]*\\)(?:\\s+(?:\\([^()]*\\)|[\\w\\[\\]*.]+))?",
    // Nome{ campos }
    "\\b[A-Z]\\w*\\{[^{}]*\\}",
    // if com inicialização e corpo curto
    "\\bif\\s+[^{}.]{2,70}\\{[^{}]*\\}",
    // switch x := v.(type) { ... }
    "\\bswitch\\s+[^{}]{2,60}\\{[^{}]*\\}",
    // map[chave]valor
    "\\bmap\\[[^\\]]+\\][\\w\\[\\]*.]+",
    // []Tipo, [][]int, [5]int
    "(?:\\[\\]|\\[\\d+\\])+[A-Za-z_][\\w.]*",
    // comandos de linha: go test -v ./..., gofmt -w .
    "\\bgo\\s+(?:run|build|test|vet|mod|get|install|tool|work|generate)\\b(?:\\s+[\\w./@-]*[./@-][\\w./@-]*)*",
    "\\bgofmt(?:\\s+[\\w./-]*[./-][\\w./-]*)+",
    "\\b(?:docker|kubectl|helm|terraform)\\s+(?:compose\\s+)?[a-z][\\w-]*",
    // pacote.Simbolo(args) e pacote.Simbolo
    "\\b[a-zA-Z_]\\w*\\.[A-Za-z_]\\w*\\([^()]*\\)",
    "\\b[a-zA-Z_]\\w*\\.[A-Za-z_]\\w*",
    // Funcao(args) (retornos)
    "\\b[A-Za-z_]\\w*\\([^()]*\\)(?:\\s*\\([^()]*\\))?",
    // tags de struct: json:"id"
    "\\b\\w+:\"[^\"]*\"",
    // método HTTP + rota
    "\\b(?:GET|POST|PUT|PATCH|DELETE)\\s+/[\\w/{}.-]*",
    // ficheiros e pastas do projeto
    "\\b[\\w.-]+\\.(?:go|yml|yaml|mod|json|proto|tf|md)\\b",
    "\\b(?:models|services|handlers|cmd|internal)/\\w*",
    // campo com tipo: Titulo string, Stock int
    "\\b[A-Z]\\w*\\s+(?:int|int64|string|bool|float64|float32|error|byte|rune)\\b",
    // ponteiro para tipo exportado
    "\\*[A-Z]\\w*\\b",
    // flags conhecidas
    "(?<=\\s)--?(?:race|cover|short|html|strictPort|v|l|w)\\b",
    // rotas soltas: /metrics, /ping
    "(?<=\\s)/[a-z][\\w/{}.-]*",
    // identificadores CamelCase, filtrados adiante contra NAO_E_CODIGO
    "\\b[A-Z][a-z]+(?:[A-Z]\\w*)+\\b",
    // tipos base e palavras-chave da linguagem
    "\\b(?:int8|int16|int32|int64|uint8|uint16|uint32|uint64|uint|float32|float64|int|string|bool|rune|byte|error|any)\\b",
    "\\b(?:const|iota|defer|recover|panic|append|copy|delete|close|make|nil|range|select|struct|chan|switch)\\b",
  ].join("|"),
  "g"
);

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function formatEnunciado(texto) {
  let out = "";
  let last = 0;
  let m;
  CODE_RE.lastIndex = 0;
  while ((m = CODE_RE.exec(texto)) !== null) {
    if (m.index < last) continue;
    if (m[0] === "") { CODE_RE.lastIndex++; continue; }
    if (NAO_E_CODIGO.has(m[0])) continue;
    out += escapeHtml(texto.slice(last, m.index));
    out += "<code>" + escapeHtml(m[0]) + "</code>";
    last = m.index + m[0].length;
  }
  out += escapeHtml(texto.slice(last));
  return out;
}

/* Prosa com blocos de código: a base partilhada por dicas e livros.
   O texto usa ~~~ para marcar um bloco de código no meio da prosa, ao
   estilo Markdown mínimo (evita crases, para os textos poderem ser
   escritos como template literals em JS sem escapar nada). Com
   headings ativo, uma linha que comece por "## " vira um título de
   secção em vez de um parágrafo normal. */
function renderProsaComCodigo(texto, { headings = false, codeClass = "dica-codigo" } = {}) {
  const partes = texto.split(/~~~([\s\S]*?)~~~/);
  return partes
    .map((parte, i) => {
      if (i % 2 === 1) {
        return `<pre class="${codeClass}"><code>${escapeHtml(parte.trim())}</code></pre>`;
      }
      return parte
        .split(/\n{2,}/)
        .filter((p) => p.trim())
        .map((p) => {
          const t = p.trim();
          if (headings && t.startsWith("## ")) {
            return `<h3 class="livro-secao">${formatEnunciado(t.slice(3).trim())}</h3>`;
          }
          return `<p>${formatEnunciado(t)}</p>`;
        })
        .join("");
    })
    .join("");
}

/* Dicas: explicação com exemplo, escrita à mão por exercício, para quem
   quer resolver sem sair da app. Os recursos externos continuam a existir
   ao lado, mas deixam de ser o único caminho. */
function renderDicaHTML(texto) {
  return renderProsaComCodigo(texto);
}

/* Livro: o capítulo de documentação de um bloco inteiro. Mais longo e
   organizado em secções, para quem quer perceber o porquê antes, ou em
   vez, de ir direto aos exercícios. */
function renderLivroHTML(texto) {
  return renderProsaComCodigo(texto, { headings: true, codeClass: "livro-codigo" });
}

function systemPrefersLight() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
}

function effectiveTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return systemPrefersLight() ? "light" : "dark";
}

function renderThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const theme = effectiveTheme();
  btn.innerHTML = theme === "dark" ? ICON_MOON : ICON_SUN;
  const rotulo = theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro";
  btn.title = rotulo;
  btn.setAttribute("aria-label", rotulo);
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = effectiveTheme() === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  document.documentElement.setAttribute("data-theme", next);
  renderThemeToggle();
});

if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
    if (!localStorage.getItem(THEME_KEY)) renderThemeToggle();
  });
}

renderThemeToggle();

let progress = loadProgress();
let entradas = loadEntradas();
let notas = loadNotas();
let perfil = loadPerfil();

// Deep-linking: o estado vive também no hash do URL, para permitir partilhar
// um link direto, recarregar sem perder o sítio, e o botão recuar do browser
// funcionar dentro da app. Duas formas: #/pagina (Dashboard, Explorar,
// Progresso, Conquistas, Perfil) ou #/trilhas/nivel/trilha/bloco (a antiga
// Visão Geral + navegação por blocos, agora dentro da página "Trilhas").
const PAGINAS_SHELL = ["dashboard", "explorar", "progresso", "conquistas", "perfil"];

function hashDoEstado(page, nivelId, trilhaId, blocoId) {
  if (page === "trilhas") return `#/trilhas/${nivelId}/${trilhaId}/${blocoId}`;
  return `#/${page}`;
}

function estadoDoHash() {
  const partes = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (!partes.length) return null;
  const [page, ...resto] = partes;
  if (page === "trilhas") {
    if (resto.length < 3) return null;
    const [nivelId, trilhaId, blocoId] = resto;
    const nivel = findNivel(nivelId);
    if (!nivel) return null;
    const trilha = nivel.trilhas.find((t) => t.id === trilhaId);
    if (!trilha) return null;
    if (blocoId !== OVERVIEW_ID && !findBloco(trilha, blocoId)) return null;
    return { page, nivelId, trilhaId, blocoId };
  }
  if (PAGINAS_SHELL.includes(page)) return { page };
  return null;
}

// Arranca no Dashboard, exceto se o URL já apontar para um sítio específico
// (link partilhado, ou recarregar a página a meio de um bloco).
const estadoInicial = estadoDoHash();
let currentPage = estadoInicial ? estadoInicial.page : "dashboard";
let currentNivel = estadoInicial && estadoInicial.page === "trilhas" ? estadoInicial.nivelId : nivelEntrada();
let currentTrilha = estadoInicial && estadoInicial.page === "trilhas" ? estadoInicial.trilhaId : findNivel(currentNivel).trilhas[0].id;
let currentBloco = estadoInicial && estadoInicial.page === "trilhas" ? estadoInicial.blocoId : OVERVIEW_ID;

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// O nível de entrada é guardado por eixo, na mesma chave: alguém pode ser
// iniciante em Go e já ter bagagem de desenho de sistemas, ou o contrário.
function loadEntradas() {
  let guardado = {};
  try {
    const raw = localStorage.getItem(ENTRY_KEY);
    if (raw && raw.startsWith("{")) guardado = JSON.parse(raw) || {};
  } catch {
    guardado = {};
  }
  const v = guardado[APP.id];
  guardado[APP.id] = NIVEIS.some((n) => n.id === v && !n.emBreve) ? v : NIVEIS[0].id;
  return guardado;
}

function nivelEntrada() {
  return entradas[APP.id];
}

function saveNivelEntrada(id) {
  entradas[APP.id] = id;
  localStorage.setItem(ENTRY_KEY, JSON.stringify(entradas));
}

function nivelIndex(id) {
  return NIVEIS.findIndex((n) => n.id === id);
}

function exKey(trilhaId, blocoId, idx) {
  return `${trilhaId}:${blocoId}:${idx}`;
}

function isDone(trilhaId, blocoId, idx) {
  return !!progress[exKey(trilhaId, blocoId, idx)];
}

function toggleDone(trilhaId, blocoId, idx) {
  const key = exKey(trilhaId, blocoId, idx);
  if (progress[key]) delete progress[key];
  else progress[key] = new Date().toISOString();
  saveProgress();
  renderApp();
}

// Notas do piloto de correção com IA. Mesma chave dos exercícios
// (trilha:bloco:idx), guardadas à parte do progresso porque uma coisa é
// teres marcado o exercício como feito, outra é teres sido corrigido.
function loadNotas() {
  try {
    return JSON.parse(localStorage.getItem(NOTAS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveNotas() {
  localStorage.setItem(NOTAS_KEY, JSON.stringify(notas));
}

// Perfil: apelido e avatar (emoji) só para dar identidade à app, sem conta
// nem servidor. Vive em localStorage, tal como o resto do progresso.
function loadPerfil() {
  let guardado = {};
  try {
    guardado = JSON.parse(localStorage.getItem(PERFIL_KEY)) || {};
  } catch {
    guardado = {};
  }
  return {
    apelido: typeof guardado.apelido === "string" ? guardado.apelido : "",
    avatar: AVATARES.includes(guardado.avatar) ? guardado.avatar : AVATARES[0],
  };
}

function savePerfil() {
  localStorage.setItem(PERFIL_KEY, JSON.stringify(perfil));
}

function getNota(trilhaId, blocoId, idx) {
  return notas[exKey(trilhaId, blocoId, idx)] || null;
}

function setNota(trilhaId, blocoId, idx, registo) {
  notas[exKey(trilhaId, blocoId, idx)] = registo;
  saveNotas();
}

function blocoStats(trilha, bloco) {
  const total = bloco.exercicios.length;
  let done = 0;
  for (let i = 0; i < total; i++) {
    if (isDone(trilha.id, bloco.id, i)) done++;
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

// Nota média de um bloco: só conta os exercícios já corrigidos pela IA, não
// os 15 todos, por isso vem sempre acompanhada de quantos já têm nota.
function blocoNota(trilha, bloco) {
  let soma = 0;
  let corrigidos = 0;
  for (let i = 0; i < bloco.exercicios.length; i++) {
    const nota = getNota(trilha.id, bloco.id, i);
    if (nota) {
      soma += nota.geral;
      corrigidos++;
    }
  }
  return { media: corrigidos ? soma / corrigidos : null, corrigidos, total: bloco.exercicios.length };
}

function nivelNota(nivel) {
  let soma = 0;
  let corrigidos = 0;
  let total = 0;
  for (const trilha of nivel.trilhas) {
    for (const bloco of trilha.blocos) {
      const s = blocoNota(trilha, bloco);
      soma += s.media !== null ? s.media * s.corrigidos : 0;
      corrigidos += s.corrigidos;
      total += s.total;
    }
  }
  return { media: corrigidos ? soma / corrigidos : null, corrigidos, total };
}

function trilhaStats(trilha) {
  let done = 0, total = 0, blocosCompletos = 0;
  for (const bloco of trilha.blocos) {
    const s = blocoStats(trilha, bloco);
    done += s.done;
    total += s.total;
    if (s.total > 0 && s.done === s.total) blocosCompletos++;
  }
  return { done, total, blocosCompletos, pct: total ? Math.round((done / total) * 100) : 0 };
}

function nivelStats(nivel) {
  let done = 0, total = 0;
  for (const trilha of nivel.trilhas) {
    const s = trilhaStats(trilha);
    done += s.done;
    total += s.total;
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

function overallStats() {
  let done = 0, total = 0;
  for (const nivel of NIVEIS) {
    const s = nivelStats(nivel);
    done += s.done;
    total += s.total;
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

function motivationalText(pct) {
  if (pct >= 100) return "Trilha completa. Parabéns, e não fiques por aqui.";
  if (pct >= 75) return "Quase lá. A reta final é a que mais ensina.";
  if (pct >= 50) return "Mais de metade do caminho. Não pares agora.";
  if (pct >= 25) return "O ritmo está a aparecer. Continua.";
  if (pct > 0) return "Só o início. Cada exercício soma.";
  const nivel = findNivel(nivelEntrada());
  const primeiro = nivel && nivel.trilhas.length ? nivel.trilhas[0].blocos[0] : null;
  const nome = primeiro ? primeiro.titulo.split("—")[0].trim() : null;
  return nome ? `Começa pelo ${nome} e dá o primeiro passo.` : "Escolhe um bloco e dá o primeiro passo.";
}

function blocoNumero(bloco) {
  const m = bloco.id.match(/\d+/);
  return m ? m[0] : "";
}

function findNivel(id) {
  return NIVEIS.find((n) => n.id === id) || null;
}

function findTrilha(id) {
  return TRILHAS.find((t) => t.id === id);
}

function findBloco(trilha, id) {
  return trilha.blocos.find((b) => b.id === id);
}

function findBlocoAnywhere(blocoId) {
  for (const nivel of NIVEIS) {
    for (const trilha of nivel.trilhas) {
      const bloco = findBloco(trilha, blocoId);
      if (bloco) return { nivel, trilha, bloco };
    }
  }
  return null;
}

function nivelAnterior(nivel) {
  const idx = NIVEIS.findIndex((n) => n.id === nivel.id);
  return idx > 0 ? NIVEIS[idx - 1] : null;
}

function isNivelUnlocked(nivel) {
  if (nivel.emBreve || !nivel.trilhas.length) return false;
  // Níveis até ao nível de entrada escolhido estão sempre abertos: quem já
  // domina os anteriores entra direto, e continua a poder voltar atrás.
  if (nivelIndex(nivel.id) <= nivelIndex(nivelEntrada())) return true;
  const anterior = nivelAnterior(nivel);
  if (!anterior) return true;
  const s = nivelStats(anterior);
  return s.total > 0 && s.done === s.total;
}

function prerequisiteInfo(trilha, bloco) {
  if (bloco.encaixaDepoisDe) {
    return findBlocoAnywhere(bloco.encaixaDepoisDe);
  }
  const idx = trilha.blocos.findIndex((b) => b.id === bloco.id);
  if (idx > 0) {
    const nivel = NIVEIS.find((n) => n.trilhas.some((t) => t.id === trilha.id));
    return { nivel, trilha, bloco: trilha.blocos[idx - 1] };
  }
  return null;
}

function isBlocoUnlocked(trilha, bloco) {
  const prereq = prerequisiteInfo(trilha, bloco);
  if (!prereq) return true;
  const s = blocoStats(prereq.trilha, prereq.bloco);
  return s.total > 0 && s.done === s.total;
}

// Torna um elemento não-nativamente-interativo (div usada como tab/item de
// lista) acessível por teclado: foco via Tab, ativação com Enter ou espaço.
// Mesma ideia que já existia só nas linhas de exercício.
function tornarClicavel(el, onActivate) {
  el.setAttribute("role", "button");
  el.setAttribute("tabindex", "0");
  el.onclick = onActivate;
  el.onkeydown = (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      onActivate();
    }
  };
}

function navigateTo(nivelId, trilhaId, blocoId) {
  currentPage = "trilhas";
  currentNivel = nivelId;
  currentTrilha = trilhaId;
  currentBloco = blocoId;
  renderApp();
  document.getElementById("app-content").scrollTo({ top: 0 });

  const hash = hashDoEstado("trilhas", nivelId, trilhaId, blocoId);
  if (location.hash !== hash) {
    history.pushState(null, "", hash);
  }
}

// Muda de página na shell (Dashboard, Explorar, Progresso, Conquistas,
// Perfil) — ao contrário de navigateTo, não tem nível/trilha/bloco.
function irParaPagina(page) {
  currentPage = page;
  renderApp();
  document.getElementById("app-content").scrollTo({ top: 0 });

  const hash = hashDoEstado(page);
  if (location.hash !== hash) {
    history.pushState(null, "", hash);
  }
}

function renderCabecalho() {
  const nomeEl = document.getElementById("app-nome");
  if (nomeEl) nomeEl.textContent = APP.nome;
  const logo = document.getElementById("app-logo");
  if (logo) { logo.src = APP.icone; logo.alt = APP.nome; }
  const outro = document.getElementById("link-outro");
  if (outro) { outro.href = APP.outro.href; outro.textContent = APP.outro.nome; }
}

function renderNiveis(el) {
  el.innerHTML = "";
  for (const nivel of NIVEIS) {
    const unlocked = isNivelUnlocked(nivel);
    const stats = nivelStats(nivel);
    const nota = nivelNota(nivel);
    const tab = document.createElement("div");
    tab.className = "nivel-tab" + (nivel.id === currentNivel ? " active" : "") + (unlocked ? "" : " locked");
    tab.innerHTML = `
      <span class="nivel-tab-titulo">${nivel.titulo}${unlocked ? "" : ` <span class="nivel-tab-lock">${ICON_LOCK}</span>`}</span>
      <span class="nivel-tab-sub">${nivel.subtitulo}${stats.total ? ` · ${stats.done}/${stats.total}` : ""}${nota.corrigidos ? ` · média ${Math.round(nota.media)}/100` : ""}</span>
    `;
    tornarClicavel(tab, () => {
      currentNivel = nivel.id;
      currentTrilha = nivel.trilhas.length ? nivel.trilhas[0].id : null;
      currentBloco = OVERVIEW_ID;
      navigateTo(currentNivel, currentTrilha, currentBloco);
    });
    el.appendChild(tab);
  }
}

function renderNivelNota(nota) {
  const primeiro = NIVEIS[0];
  if (nivelEntrada() === primeiro.id) {
    nota.hidden = true;
    nota.innerHTML = "";
    return;
  }
  const nivel = findNivel(nivelEntrada());
  nota.hidden = false;
  nota.innerHTML = `<span>Entraste diretamente no ${nivel.titulo}. Os níveis anteriores continuam abertos para consulta.</span>`;

  const btn = document.createElement("button");
  btn.className = "nivel-nota-btn";
  btn.textContent = "Repor progressão desde o início";
  btn.onclick = () => {
    saveNivelEntrada(primeiro.id);
    navigateTo(primeiro.id, primeiro.trilhas[0].id, OVERVIEW_ID);
  };
  nota.appendChild(btn);
}

function renderTabs(tabsEl) {
  const nivel = findNivel(currentNivel);
  tabsEl.innerHTML = "";
  if (!nivel.trilhas.length) {
    tabsEl.style.display = "none";
    return;
  }
  tabsEl.style.display = "";
  for (const trilha of nivel.trilhas) {
    const tab = document.createElement("div");
    tab.className = "trilha-tab" + (trilha.id === currentTrilha ? " active" : "");
    tab.textContent = trilha.titulo;
    tornarClicavel(tab, () => navigateTo(nivel.id, trilha.id, OVERVIEW_ID));
    tabsEl.appendChild(tab);
  }
}

function renderSidebar(sidebarEl) {
  const nivel = findNivel(currentNivel);
  sidebarEl.innerHTML = "";

  if (!nivel.trilhas.length || !isNivelUnlocked(nivel)) {
    sidebarEl.style.display = "none";
    return;
  }
  sidebarEl.style.display = "";

  const trilha = findTrilha(currentTrilha) || nivel.trilhas[0];

  const overviewItem = document.createElement("div");
  overviewItem.className = "sidebar-item sidebar-item-overview" + (currentBloco === OVERVIEW_ID ? " active" : "");
  overviewItem.innerHTML = `
    <div class="sidebar-item-icon">${ICON_GRID}</div>
    <div class="sidebar-item-title">Visão geral</div>
  `;
  tornarClicavel(overviewItem, () => navigateTo(nivel.id, trilha.id, OVERVIEW_ID));
  sidebarEl.appendChild(overviewItem);

  trilha.blocos.forEach((bloco) => {
    const stats = blocoStats(trilha, bloco);
    const unlocked = isBlocoUnlocked(trilha, bloco);
    const item = document.createElement("div");
    item.className = "sidebar-item" + (bloco.id === currentBloco ? " active" : "") + (unlocked ? "" : " locked");
    item.innerHTML = `
      <div class="mini-ring" style="--pct:${stats.pct}"><span class="mini-ring-num">${unlocked ? blocoNumero(bloco) : ICON_LOCK}</span></div>
      <div class="sidebar-item-title">${bloco.titulo}<span class="sidebar-item-faixa">${unlocked ? `${bloco.faixa} · ${stats.done}/${stats.total}` : "Bloqueado"}</span></div>
    `;
    if (!unlocked) item.title = "Conclui o bloco anterior para desbloquear";
    tornarClicavel(item, () => navigateTo(nivel.id, trilha.id, bloco.id));
    sidebarEl.appendChild(item);
  });
}

function renderNivelBloqueado(nivel) {
  const contentEl = document.getElementById("content");
  const anterior = nivelAnterior(nivel);

  const header = document.createElement("div");
  header.className = "bloco-header";
  header.innerHTML = `
    <h2>${nivel.titulo} — ${nivel.subtitulo}</h2>
    <p class="bloco-desc">${nivel.descricao}</p>
  `;
  contentEl.appendChild(header);

  const panel = document.createElement("div");
  panel.className = "locked-panel";

  if (nivel.emBreve) {
    panel.innerHTML = `
      <div class="locked-panel-icon">${ICON_LOCK}</div>
      <div class="locked-panel-text">
        <strong>Ainda em preparação.</strong>
        Este nível vai cobrir temas de arquitetura distribuída, desempenho e liderança técnica.
      </div>
    `;
    contentEl.appendChild(panel);
    return;
  }

  const s = anterior ? nivelStats(anterior) : { done: 0, total: 0 };
  panel.innerHTML = `
    <div class="locked-panel-icon">${ICON_LOCK}</div>
    <div class="locked-panel-text">
      <strong>Este nível está bloqueado.</strong>
      A progressão normal é concluir primeiro o ${anterior.titulo}, que está em ${s.done} de ${s.total} exercícios.
      Se já dominas esses temas, podes entrar diretamente aqui.
    </div>
  `;

  const acoes = document.createElement("div");
  acoes.className = "locked-panel-actions";

  const btnAnterior = document.createElement("button");
  btnAnterior.className = "locked-panel-btn";
  btnAnterior.textContent = `Ir para o ${anterior.titulo}`;
  btnAnterior.onclick = () => navigateTo(anterior.id, anterior.trilhas[0].id, OVERVIEW_ID);
  acoes.appendChild(btnAnterior);

  const btnEntrar = document.createElement("button");
  btnEntrar.className = "locked-panel-btn secondary";
  btnEntrar.textContent = `Começar já no ${nivel.titulo}`;
  btnEntrar.onclick = () => {
    saveNivelEntrada(nivel.id);
    navigateTo(nivel.id, nivel.trilhas[0].id, OVERVIEW_ID);
  };
  acoes.appendChild(btnEntrar);

  panel.appendChild(acoes);
  contentEl.appendChild(panel);
}

function renderOverviewContent(nivel, trilha) {
  const contentEl = document.getElementById("content");
  const stats = trilhaStats(trilha);

  const header = document.createElement("div");
  header.className = "bloco-header";
  header.innerHTML = `
    <h2>${trilha.titulo}</h2>
    <p class="bloco-desc">${trilha.intro}</p>
  `;
  contentEl.appendChild(header);

  if (nivel.aviso) {
    const aviso = document.createElement("div");
    aviso.className = "nivel-aviso";
    aviso.innerHTML = `<strong>Sobre este nível</strong><p>${nivel.aviso}</p>`;
    contentEl.appendChild(aviso);
  }

  const dash = document.createElement("div");
  dash.className = "dashboard-stats";
  dash.innerHTML = `
    <div class="stat-card">
      <span class="stat-value">${stats.done}<span class="stat-value-sep">/${stats.total}</span></span>
      <span class="stat-label">exercícios concluídos</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${stats.pct}%</span>
      <span class="stat-label">desta trilha</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${stats.blocosCompletos}<span class="stat-value-sep">/${trilha.blocos.length}</span></span>
      <span class="stat-label">blocos completos</span>
    </div>
  `;
  contentEl.appendChild(dash);

  const grid = document.createElement("div");
  grid.className = "bloco-grid";
  trilha.blocos.forEach((bloco) => {
    const bStats = blocoStats(trilha, bloco);
    const complete = bStats.total > 0 && bStats.done === bStats.total;
    const unlocked = isBlocoUnlocked(trilha, bloco);
    const card = document.createElement("div");
    card.className = "bloco-card" + (complete ? " complete" : "") + (unlocked ? "" : " locked");
    card.innerHTML = `
      <div class="bloco-card-top">
        <span class="bloco-card-badge">${unlocked ? blocoNumero(bloco) : ICON_LOCK}</span>
        <span class="bloco-card-faixa">${bloco.faixa}</span>
      </div>
      <div class="bloco-card-title">${bloco.titulo}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${unlocked ? bStats.pct : 0}%"></div></div>
      <div class="bloco-card-count">${unlocked ? `${bStats.done} / ${bStats.total}${complete ? " · completo" : ""}` : "Bloqueado"}</div>
    `;
    card.onclick = () => navigateTo(nivel.id, trilha.id, bloco.id);
    grid.appendChild(card);
  });
  contentEl.appendChild(grid);
}

function renderRelacionados(bloco) {
  const wrap = document.createElement("div");
  wrap.className = "relacionados";

  if (bloco.encaixaDepoisDe) {
    const alvo = findBlocoAnywhere(bloco.encaixaDepoisDe);
    if (alvo) {
      const chip = document.createElement("span");
      chip.className = "relacionado-chip";
      chip.innerHTML = `<span class="tag tag-prereq">Pré-requisito</span> ${alvo.bloco.titulo}`;
      chip.onclick = () => navigateTo(alvo.nivel.id, alvo.trilha.id, alvo.bloco.id);
      wrap.appendChild(chip);
    }
  }
  if (bloco.reaproveitaEm && bloco.reaproveitaEm.length) {
    for (const id of bloco.reaproveitaEm) {
      const alvo = findBlocoAnywhere(id);
      if (!alvo) continue;
      const chip = document.createElement("span");
      chip.className = "relacionado-chip";
      chip.innerHTML = `<span class="tag tag-reuse">Reaproveita</span> ${alvo.bloco.titulo}`;
      chip.onclick = () => navigateTo(alvo.nivel.id, alvo.trilha.id, alvo.bloco.id);
      wrap.appendChild(chip);
    }
  }
  return wrap.children.length ? wrap : null;
}

function renderGuia(bloco) {
  const guia = GUIAS_TODOS[bloco.id];
  if (!guia) return null;

  const el = document.createElement("div");
  el.className = "guia";

  const itens = (guia.precisas || []).map((p) => `<li>${formatEnunciado(p)}</li>`).join("");
  el.innerHTML = `
    <div class="guia-titulo">${ICON_CHECKLIST}<span>Antes de começar</span></div>
    ${itens ? `<ul class="guia-lista">${itens}</ul>` : ""}
    ${guia.nota ? `<p class="guia-nota">${formatEnunciado(guia.nota)}</p>` : ""}
    ${guia.custos ? `<p class="guia-custos"><strong>Pode ter custo:</strong> ${formatEnunciado(guia.custos)}</p>` : ""}
  `;
  return el;
}

// Histórico de chat por exercício. Vive só em memória (não em localStorage):
// perde-se ao recarregar a página, mas as notas em si (que é o que importa
// para o progresso) ficam guardadas em `notas`.
const chatHistoricos = {};

function criarPainelDuvida(trilha, bloco, idx, enunciado) {
  const key = exKey(trilha.id, bloco.id, idx);
  if (!chatHistoricos[key]) chatHistoricos[key] = [];
  const historico = chatHistoricos[key];

  const painel = document.createElement("div");
  painel.className = "exercicio-duvida";
  painel.onclick = (ev) => ev.stopPropagation();

  const mensagensEl = document.createElement("div");
  mensagensEl.className = "duvida-mensagens";

  const inputEl = document.createElement("textarea");
  inputEl.className = "duvida-input";
  inputEl.rows = 2;
  inputEl.placeholder = "Escreve a tua dúvida sobre este exercício...";

  const enviarBtn = document.createElement("button");
  enviarBtn.className = "duvida-enviar";
  enviarBtn.textContent = "Enviar";

  function renderMensagens() {
    mensagensEl.innerHTML = "";
    if (!historico.length) {
      const vazio = document.createElement("p");
      vazio.className = "duvida-vazio";
      vazio.textContent = "Pergunta o que quiseres sobre este exercício. A IA ajuda a pensar, mas não te dá a resposta pronta.";
      mensagensEl.appendChild(vazio);
      return;
    }
    for (const m of historico) {
      const bolha = document.createElement("div");
      bolha.className = "duvida-bolha " + (m.papel === "user" ? "duvida-bolha-user" : "duvida-bolha-ia");
      const autor = document.createElement("span");
      autor.className = "duvida-bolha-autor";
      autor.textContent = m.papel === "user" ? "Tu" : "IA";
      const texto = document.createElement("span");
      texto.className = "duvida-bolha-texto";
      texto.textContent = m.texto;
      bolha.appendChild(autor);
      bolha.appendChild(texto);
      mensagensEl.appendChild(bolha);
    }
    mensagensEl.scrollTop = mensagensEl.scrollHeight;
  }

  async function enviar() {
    const pergunta = inputEl.value.trim();
    if (!pergunta || enviarBtn.disabled) return;
    const historicoAntes = historico.slice();
    inputEl.value = "";
    historico.push({ papel: "user", texto: pergunta });
    renderMensagens();
    enviarBtn.disabled = true;
    enviarBtn.textContent = "A pensar...";

    try {
      const resp = await fetch("/api/duvida", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blocoId: bloco.id,
          exercicioIdx: idx,
          enunciado,
          dica: (bloco.dicas && bloco.dicas[idx]) || "",
          pergunta,
          historico: historicoAntes,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.erro || "Falha ao contactar a IA.");
      historico.push({ papel: "ia", texto: data.resposta });
    } catch (err) {
      historico.push({ papel: "ia", texto: "Não consegui responder agora (" + err.message + "). Confirma a tua ligação à internet e tenta outra vez." });
    }
    renderMensagens();
    enviarBtn.disabled = false;
    enviarBtn.textContent = "Enviar";
  }

  enviarBtn.onclick = enviar;
  inputEl.onkeydown = (ev) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      enviar();
    }
  };

  const formEl = document.createElement("div");
  formEl.className = "duvida-form";
  formEl.appendChild(inputEl);
  formEl.appendChild(enviarBtn);

  painel.appendChild(mensagensEl);
  painel.appendChild(formEl);
  renderMensagens();
  return painel;
}

// Editor de código (CodeMirror 6, via import dinâmico de CDN — mantém o
// projeto sem build step). Se a rede/CDN falhar, cai num textarea simples,
// para o painel de Corrigir nunca ficar inutilizável.
let cmModulosPromise = null;
function carregarCodeMirror() {
  if (!cmModulosPromise) {
    cmModulosPromise = Promise.all([
      import("https://esm.sh/codemirror@6.0.1"),
      import("https://esm.sh/@codemirror/language@6.10.1"),
      import("https://esm.sh/@codemirror/legacy-modes@6.4.0/mode/go"),
      import("https://esm.sh/@codemirror/theme-one-dark@6.1.2"),
    ]).catch((err) => {
      console.error("Não foi possível carregar o editor de código:", err);
      return null;
    });
  }
  return cmModulosPromise;
}

async function criarEditorCodigo(container) {
  const modulos = await carregarCodeMirror();
  if (!modulos) return null;
  const [{ EditorView, basicSetup }, { StreamLanguage }, { go }, { oneDark }] = modulos;
  const escuro = effectiveTheme() === "dark";
  const view = new EditorView({
    doc: "",
    extensions: [basicSetup, StreamLanguage.define(go), ...(escuro ? [oneDark] : [])],
    parent: container,
  });
  return view;
}

function criarPainelCorrigir(trilha, bloco, idx, enunciado, aoAtualizarNota) {
  const painel = document.createElement("div");
  painel.className = "exercicio-corrigir";
  painel.onclick = (ev) => ev.stopPropagation();

  const editorContainer = document.createElement("div");
  editorContainer.className = "corrigir-editor";
  const textareaFallback = document.createElement("textarea");
  textareaFallback.className = "corrigir-input";
  textareaFallback.rows = 5;
  textareaFallback.placeholder = "Cola aqui a tua resposta ou código...";
  editorContainer.appendChild(textareaFallback);

  let editorView = null;
  criarEditorCodigo(editorContainer).then((view) => {
    if (!view) return;
    editorView = view;
    textareaFallback.remove();
  });

  function valorAtual() {
    return (editorView ? editorView.state.doc.toString() : textareaFallback.value).trim();
  }

  const btn = document.createElement("button");
  btn.className = "corrigir-enviar";
  btn.textContent = "Corrigir";

  const resultadoEl = document.createElement("div");
  resultadoEl.className = "corrigir-resultado";
  resultadoEl.hidden = true;

  function listaHTML(itens) {
    return itens && itens.length ? `<ul>${itens.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>` : "";
  }

  function renderResultado(registo) {
    if (!registo) {
      resultadoEl.hidden = true;
      resultadoEl.innerHTML = "";
      return;
    }
    resultadoEl.hidden = false;
    const criterios = [
      { label: "Correção", valor: registo.correcao },
      { label: "Qualidade", valor: registo.qualidade },
      { label: "Eficiência", valor: registo.eficiencia },
      { label: "Boas práticas", valor: registo.boasPraticas },
    ];
    resultadoEl.innerHTML = `
      <div class="corrigir-geral-linha">
        <span class="corrigir-geral${registo.correto ? " corrigir-geral-ok" : ""}">${registo.geral}<small>/100</small></span>
        <div class="corrigir-criterios">
          ${criterios.map((c) => `<span class="corrigir-criterio"><strong>${c.valor}</strong>${escapeHtml(c.label)}</span>`).join("")}
        </div>
      </div>
      ${registo.pontosFortes && registo.pontosFortes.length ? `<div class="corrigir-secao corrigir-fortes"><h4>O que fez bem</h4>${listaHTML(registo.pontosFortes)}</div>` : ""}
      ${registo.pontosMelhorar && registo.pontosMelhorar.length ? `<div class="corrigir-secao corrigir-melhorar"><h4>O que pode melhorar</h4>${listaHTML(registo.pontosMelhorar)}</div>` : ""}
      ${registo.recomendacao ? `<p class="corrigir-recomendacao"><strong>Recomendação da IA:</strong> ${escapeHtml(registo.recomendacao)}</p>` : ""}
    `;
  }
  renderResultado(getNota(trilha.id, bloco.id, idx));

  async function corrigir() {
    const resposta = valorAtual();
    if (!resposta || btn.disabled) return;
    btn.disabled = true;
    btn.textContent = "A corrigir...";
    resultadoEl.hidden = true;

    try {
      const resp = await fetch("/api/corrigir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocoId: bloco.id, exercicioIdx: idx, enunciado, resposta }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.erro || "Falha ao corrigir.");
      const registo = {
        geral: data.geral,
        correcao: data.correcao,
        qualidade: data.qualidade,
        eficiencia: data.eficiencia,
        boasPraticas: data.boasPraticas,
        pontosFortes: data.pontosFortes,
        pontosMelhorar: data.pontosMelhorar,
        recomendacao: data.recomendacao,
        correto: data.correto,
        data: new Date().toISOString(),
      };
      setNota(trilha.id, bloco.id, idx, registo);
      renderResultado(registo);
      if (aoAtualizarNota) aoAtualizarNota();
    } catch (err) {
      resultadoEl.hidden = false;
      resultadoEl.innerHTML = `<p class="corrigir-erro">Não consegui corrigir agora (${escapeHtml(err.message)}). Confirma a tua ligação à internet e tenta outra vez.</p>`;
    }
    btn.disabled = false;
    btn.textContent = "Corrigir";
  }

  btn.onclick = corrigir;

  painel.appendChild(editorContainer);
  painel.appendChild(btn);
  painel.appendChild(resultadoEl);
  return painel;
}

function renderBlocoContent(nivel, trilha, bloco) {
  const contentEl = document.getElementById("content");
  const stats = blocoStats(trilha, bloco);

  const header = document.createElement("div");
  header.className = "bloco-header";
  header.innerHTML = `
    <h2><span class="bloco-header-badge">${blocoNumero(bloco)}</span>${bloco.titulo}</h2>
    <p class="bloco-faixa">${bloco.faixa}</p>
    <p class="bloco-desc">${formatEnunciado(bloco.descricao)}</p>
  `;

  if (bloco.livro) {
    const livroBtn = document.createElement("button");
    livroBtn.className = "livro-toggle-btn";
    livroBtn.title = "Ler o capítulo deste bloco";
    livroBtn.setAttribute("aria-label", "Ler o capítulo deste bloco");
    livroBtn.innerHTML = ICON_LIVRO + "<span>Livro</span>";
    livroBtn.onclick = () => {
      const painel = document.getElementById("livro-painel");
      const aberto = painel.classList.toggle("aberto");
      livroBtn.classList.toggle("ativo", aberto);
    };
    header.appendChild(livroBtn);
  }

  contentEl.appendChild(header);

  if (bloco.livro) {
    const livroPainel = document.createElement("div");
    livroPainel.id = "livro-painel";
    livroPainel.className = "livro-painel";
    livroPainel.innerHTML = `
      <div class="livro-cabecalho">${ICON_LIVRO}<span>Capítulo ${blocoNumero(bloco)}</span></div>
      <div class="livro-corpo">${renderLivroHTML(bloco.livro)}</div>
    `;
    contentEl.appendChild(livroPainel);
  }

  const relacionados = renderRelacionados(bloco);
  if (relacionados) contentEl.appendChild(relacionados);

  if (!isBlocoUnlocked(trilha, bloco)) {
    const prereq = prerequisiteInfo(trilha, bloco);
    const lockedEl = document.createElement("div");
    lockedEl.className = "locked-panel";
    lockedEl.innerHTML = `
      <div class="locked-panel-icon">${ICON_LOCK}</div>
      <div class="locked-panel-text">
        <strong>Este bloco está bloqueado.</strong>
        ${prereq ? `Conclui primeiro ${prereq.bloco.titulo}.` : ""}
      </div>
    `;
    if (prereq) {
      const btn = document.createElement("button");
      btn.className = "locked-panel-btn";
      btn.textContent = `Ir para ${prereq.bloco.titulo}`;
      btn.onclick = () => navigateTo(prereq.nivel.id, prereq.trilha.id, prereq.bloco.id);
      lockedEl.appendChild(btn);
    }
    contentEl.appendChild(lockedEl);
    return;
  }

  const progressRow = document.createElement("div");
  progressRow.className = "bloco-progress";
  progressRow.innerHTML = `
    <div class="progress-bar"><div class="progress-fill" style="width:${stats.pct}%"></div></div>
    <span class="bloco-progress-text">${stats.done} / ${stats.total} concluídos${stats.total > 0 && stats.done === stats.total ? " · bloco completo" : ""}</span>
  `;
  contentEl.appendChild(progressRow);

  const iaDisponivel = API_DISPONIVEL && BLOCOS_COM_CORRECAO_IA.includes(bloco.id);
  const blocoNotaEl = document.createElement("p");
  blocoNotaEl.className = "bloco-nota";
  blocoNotaEl.id = "bloco-nota";
  function atualizarBlocoNotaUI() {
    const n = blocoNota(trilha, bloco);
    blocoNotaEl.hidden = n.corrigidos === 0;
    blocoNotaEl.textContent = n.corrigidos
      ? `Nota do bloco: ${Math.round(n.media)}/100 (${n.corrigidos}/${n.total} corrigidos)`
      : "";
    const nivelTabsEl = document.getElementById("nivel-tabs");
    if (nivelTabsEl) renderNiveis(nivelTabsEl);
  }
  if (iaDisponivel) {
    atualizarBlocoNotaUI();
    contentEl.appendChild(blocoNotaEl);
  } else if (BLOCOS_COM_CORRECAO_IA.includes(bloco.id) && !API_DISPONIVEL) {
    const nota = document.createElement("p");
    nota.className = "bloco-nota";
    // No GitHub Pages o site vive em /100to/..., mas na Vercel vive na raiz do
    // domínio, por isso o prefixo do nome do repositório tem de ser removido.
    const caminhoSemRepo = location.pathname.replace(/^\/100to(\/|$)/, "/");
    nota.innerHTML = `O chat de dúvidas e a correção com IA só estão disponíveis na versão <a href="https://100to-clesio-s-projects.vercel.app${caminhoSemRepo}" target="_blank" rel="noopener noreferrer">Vercel</a> deste site, não no GitHub Pages.`;
    contentEl.appendChild(nota);
  }

  const guia = renderGuia(bloco);
  if (guia) contentEl.appendChild(guia);

  const recursosLinks = (bloco.recursos || []).filter((r) => r.url);

  if (recursosLinks.length) {
    const recursosEl = document.createElement("div");
    recursosEl.className = "recursos";
    for (const r of recursosLinks) {
      const a = document.createElement("a");
      a.href = r.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = ICON_BOOK + `<span>${r.label}</span>`;
      recursosEl.appendChild(a);
    }
    contentEl.appendChild(recursosEl);
  }

  const listEl = document.createElement("div");
  listEl.className = "exercicios";
  bloco.exercicios.forEach((texto, idx) => {
    const done = isDone(trilha.id, bloco.id, idx);
    const item = document.createElement("div");
    item.className = "exercicio" + (done ? " done" : "");

    const row = document.createElement("div");
    row.className = "exercicio-row";
    row.innerHTML = `
      <div class="exercicio-checkbox" aria-hidden="true">✓</div>
      <div class="exercicio-num">${idx + 1}</div>
      <div class="exercicio-text">${formatEnunciado(texto)}</div>
    `;
    row.setAttribute("role", "checkbox");
    row.setAttribute("tabindex", "0");
    row.setAttribute("aria-checked", done ? "true" : "false");
    row.onkeydown = (ev) => {
      if (ev.key === " " || ev.key === "Enter") {
        ev.preventDefault();
        toggleDone(trilha.id, bloco.id, idx);
      }
    };
    row.onclick = () => toggleDone(trilha.id, bloco.id, idx);

    const dicaTexto = bloco.dicas && bloco.dicas[idx];
    const panels = [];

    if (dicaTexto) {
      const hintBtn = document.createElement("button");
      hintBtn.className = "exercicio-hint-btn";
      hintBtn.title = "Ver explicação com exemplo";
      hintBtn.setAttribute("aria-label", "Ver explicação com exemplo para este exercício");
      hintBtn.innerHTML = ICON_HINT + "<span>Dica</span>";
      hintBtn.onclick = (ev) => {
        ev.stopPropagation();
        item.classList.toggle("hint-open");
      };
      row.appendChild(hintBtn);

      const hintPanel = document.createElement("div");
      hintPanel.className = "exercicio-dica";
      hintPanel.innerHTML = renderDicaHTML(dicaTexto);
      panels.push(hintPanel);
    }

    if (recursosLinks.length) {
      const resBtn = document.createElement("button");
      resBtn.className = "exercicio-res-btn";
      resBtn.title = "Ver guias de estudo deste bloco";
      resBtn.setAttribute("aria-label", "Ver guias de estudo deste bloco");
      resBtn.innerHTML = ICON_BOOK + "<span>Recursos</span>";
      resBtn.onclick = (ev) => {
        ev.stopPropagation();
        item.classList.toggle("res-open");
      };
      row.appendChild(resBtn);

      const panel = document.createElement("div");
      panel.className = "exercicio-recursos";
      for (const r of recursosLinks) {
        const a = document.createElement("a");
        a.href = r.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = r.label;
        a.onclick = (ev) => ev.stopPropagation();
        panel.appendChild(a);
      }
      panels.push(panel);
    }

    if (iaDisponivel) {
      const duvidaBtn = document.createElement("button");
      duvidaBtn.className = "exercicio-ia-btn exercicio-duvida-btn";
      duvidaBtn.title = "Tirar uma dúvida sobre este exercício";
      duvidaBtn.setAttribute("aria-label", `Tirar uma dúvida sobre o exercício ${idx + 1}`);
      duvidaBtn.innerHTML = ICON_CHAT + "<span>Dúvidas</span>";
      duvidaBtn.onclick = (ev) => {
        ev.stopPropagation();
        item.classList.toggle("duvida-open");
      };
      row.appendChild(duvidaBtn);
      panels.push(criarPainelDuvida(trilha, bloco, idx, texto));

      const corrigirBtn = document.createElement("button");
      corrigirBtn.className = "exercicio-ia-btn exercicio-corrigir-btn";
      corrigirBtn.title = "Submeter a tua resposta e receber uma nota";
      corrigirBtn.setAttribute("aria-label", `Submeter a tua resposta ao exercício ${idx + 1} e receber uma nota`);
      corrigirBtn.innerHTML = ICON_CORRIGIR + "<span>Corrigir</span>";
      corrigirBtn.onclick = (ev) => {
        ev.stopPropagation();
        item.classList.toggle("corrigir-open");
      };
      row.appendChild(corrigirBtn);
      panels.push(criarPainelCorrigir(trilha, bloco, idx, texto, atualizarBlocoNotaUI));
    }

    item.appendChild(row);
    panels.forEach((p) => item.appendChild(p));

    listEl.appendChild(item);
  });
  contentEl.appendChild(listEl);
}

function renderContent() {
  const nivel = findNivel(currentNivel);
  const contentEl = document.getElementById("content");
  contentEl.innerHTML = "";

  if (!isNivelUnlocked(nivel)) {
    renderNivelBloqueado(nivel);
    return;
  }

  const trilha = findTrilha(currentTrilha) || nivel.trilhas[0];

  if (currentBloco === OVERVIEW_ID) {
    renderOverviewContent(nivel, trilha);
    return;
  }

  const bloco = findBloco(trilha, currentBloco);
  if (!bloco) {
    renderOverviewContent(nivel, trilha);
    return;
  }
  renderBlocoContent(nivel, trilha, bloco);
}

// Página "Trilhas": o que antes era o corpo inteiro da app (tabs de nível,
// tabs de trilha, sidebar de blocos, conteúdo) vive agora dentro da shell,
// montado de raiz a cada visita porque os ids (#nivel-tabs, #sidebar,
// #content, ...) são recriados — o resto do motor (renderContent,
// renderBlocoContent, renderOverviewContent) não muda nada.
function renderTrilhasPage(container) {
  container.innerHTML = `
    <nav class="nivel-tabs" id="nivel-tabs"></nav>
    <div class="nivel-nota" id="nivel-nota" hidden></div>
    <nav class="trilha-tabs" id="trilha-tabs"></nav>
    <div class="layout">
      <aside class="sidebar" id="sidebar"></aside>
      <section class="content" id="content" tabindex="-1"></section>
    </div>
  `;
  renderNiveis(document.getElementById("nivel-tabs"));
  renderNivelNota(document.getElementById("nivel-nota"));
  renderTabs(document.getElementById("trilha-tabs"));
  renderSidebar(document.getElementById("sidebar"));
  renderContent();
}

// Trilha com progresso a meio (nem 0 nem completa), a mostrar no Dashboard.
// Sem isso ainda, cai na primeira trilha do nível de entrada.
function trilhaAtiva() {
  let melhor = null;
  for (const nivel of NIVEIS) {
    if (!isNivelUnlocked(nivel)) continue;
    for (const trilha of nivel.trilhas) {
      const s = trilhaStats(trilha);
      if (s.done > 0 && s.done < s.total) {
        if (!melhor || s.done > melhor.stats.done) melhor = { nivel, trilha, stats: s };
      }
    }
  }
  if (melhor) return melhor;
  const nivel = findNivel(nivelEntrada());
  const trilha = nivel.trilhas[0];
  return { nivel, trilha, stats: trilhaStats(trilha) };
}

function trilhasEmAndamento() {
  const lista = [];
  for (const nivel of NIVEIS) {
    if (!isNivelUnlocked(nivel)) continue;
    for (const trilha of nivel.trilhas) {
      const s = trilhaStats(trilha);
      if (s.done > 0 && s.done < s.total) lista.push({ nivel, trilha, stats: s });
    }
  }
  return lista;
}

function gridDePassos(trilha) {
  const exercicios = [];
  for (const bloco of trilha.blocos) {
    bloco.exercicios.forEach((_, idx) => exercicios.push(isDone(trilha.id, bloco.id, idx)));
  }
  const grid = document.createElement("div");
  grid.className = "passos-grid";
  const proximoIdx = exercicios.findIndex((feito) => !feito);
  exercicios.forEach((feito, i) => {
    const passo = document.createElement("span");
    passo.className = "passo" + (feito ? " passo-feito" : i === proximoIdx ? " passo-atual" : "");
    grid.appendChild(passo);
  });
  return grid;
}

function renderDashboardPage(container) {
  const ativa = trilhaAtiva();
  const geral = overallStats();
  const nota = (() => {
    let soma = 0, n = 0;
    for (const nivel of NIVEIS) {
      const nn = nivelNota(nivel);
      if (nn.corrigidos) { soma += nn.media * nn.corrigidos; n += nn.corrigidos; }
    }
    return n ? soma / n : null;
  })();
  const emAndamento = trilhasEmAndamento();
  const sequencia = calcularSequencia();

  const header = document.createElement("div");
  header.className = "dash-header";
  header.innerHTML = `<h2>Olá${perfil.apelido ? `, ${escapeHtml(perfil.apelido)}` : ""} ${perfil.avatar}</h2><p class="bloco-desc">${motivationalText(geral.pct)}</p>`;
  container.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "dash-grid";

  const cardsStats = document.createElement("div");
  cardsStats.className = "dash-stats";
  cardsStats.innerHTML = `
    <div class="stat-card"><strong>${geral.done}</strong><span>exercícios concluídos</span></div>
    <div class="stat-card"><strong>${emAndamento.length}</strong><span>trilhas em andamento</span></div>
    <div class="stat-card"><strong>${sequencia}</strong><span>dias em sequência</span></div>
    <div class="stat-card"><strong>${nota !== null ? Math.round(nota) : "—"}</strong><span>média de notas (/100)</span></div>
  `;
  grid.appendChild(cardsStats);

  if (ativa.trilha) {
    const painelAtiva = document.createElement("div");
    painelAtiva.className = "dash-card dash-trilha-ativa";
    painelAtiva.innerHTML = `
      <div class="dash-card-topo">
        <span class="dash-card-eyebrow">Trilha ativa</span>
        <h3>${ativa.trilha.titulo} — ${ativa.stats.done}/${ativa.stats.total}</h3>
      </div>
    `;
    painelAtiva.appendChild(gridDePassos(ativa.trilha));
    const btn = document.createElement("button");
    btn.className = "dash-btn-primario";
    btn.textContent = "Continuar trilha";
    btn.onclick = () => navigateTo(ativa.nivel.id, ativa.trilha.id, OVERVIEW_ID);
    painelAtiva.appendChild(btn);
    grid.appendChild(painelAtiva);
  }

  const insight = document.createElement("div");
  insight.className = "dash-card dash-insight";
  const ultimaNota = Object.values(notas).sort((a, b) => new Date(b.data) - new Date(a.data))[0];
  insight.innerHTML = `
    <div class="dash-card-topo">${ICON_CHAT}<span class="dash-card-eyebrow">Tutor IA</span></div>
    <p>${ultimaNota && ultimaNota.recomendacao ? escapeHtml(ultimaNota.recomendacao) : "Corrige um exercício para receberes feedback aqui."}</p>
  `;
  grid.appendChild(insight);

  if (emAndamento.length > 1) {
    const outras = document.createElement("div");
    outras.className = "dash-card dash-outras-trilhas";
    outras.innerHTML = `<div class="dash-card-topo"><span class="dash-card-eyebrow">Outras trilhas em andamento</span></div>`;
    const lista = document.createElement("div");
    lista.className = "dash-lista-trilhas";
    emAndamento
      .filter((t) => t.trilha.id !== ativa.trilha.id)
      .forEach((t) => {
        const linha = document.createElement("div");
        linha.className = "dash-linha-trilha";
        linha.innerHTML = `<span>${t.trilha.titulo}</span><span class="dash-linha-trilha-num">${t.stats.done} / ${t.stats.total}</span>`;
        tornarClicavel(linha, () => navigateTo(t.nivel.id, t.trilha.id, OVERVIEW_ID));
        lista.appendChild(linha);
      });
    outras.appendChild(lista);
    grid.appendChild(outras);
  }

  container.appendChild(grid);
}

const RENDERIZADORES_PAGINA = {
  dashboard: renderDashboardPage,
  trilhas: renderTrilhasPage,
  explorar: renderExplorarPage,
  progresso: renderProgressoPage,
  conquistas: renderConquistasPage,
  perfil: renderPerfilPage,
};

const ITENS_NAV = [
  { id: "dashboard", label: "Dashboard", icon: ICON_GRID },
  { id: "trilhas", label: "Minhas Trilhas", icon: ICON_BOOK },
  { id: "explorar", label: "Explorar", icon: ICON_CHECKLIST },
  { id: "progresso", label: "Progresso", icon: ICON_TRENDING },
  { id: "conquistas", label: "Conquistas", icon: ICON_TROFEU },
  { id: "perfil", label: "Perfil", icon: ICON_UTILIZADOR },
];

// Dia local (não UTC) no formato YYYY-MM-DD, para agrupar atividade por
// "dia do calendário do utilizador", não por dia UTC.
function diaLocal(d) {
  return d.toLocaleDateString("en-CA");
}

// Datas guardadas em `progress` são ISO (desde a Tarefa 4); valores `true`
// vêm de antes disso e não entram em sequências/mapa de atividade.
function diasComAtividade() {
  const dias = new Set();
  for (const valor of Object.values(progress)) {
    if (typeof valor === "string") dias.add(diaLocal(new Date(valor)));
  }
  return dias;
}

// Sequência atual: conta para trás a partir de hoje (ou de ontem, se hoje
// ainda não tiver nada — não queres perder a sequência só porque ainda não
// abriste a app hoje).
function calcularSequencia() {
  const dias = diasComAtividade();
  if (!dias.size) return 0;
  const cursor = new Date();
  if (!dias.has(diaLocal(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (dias.has(diaLocal(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// Maior sequência alguma vez feita (para badges tipo "30 dias seguidos",
// que não devem desaparecer só porque a sequência atual quebrou).
function calcularMaiorSequencia() {
  const dias = [...diasComAtividade()].sort();
  if (!dias.length) return 0;
  let maior = 1;
  let atual = 1;
  for (let i = 1; i < dias.length; i++) {
    const diffDias = Math.round((new Date(dias[i]) - new Date(dias[i - 1])) / 86400000);
    atual = diffDias === 1 ? atual + 1 : 1;
    if (atual > maior) maior = atual;
  }
  return maior;
}

// Mapa de atividade tipo GitHub: quantos exercícios concluídos em cada um
// dos últimos N dias.
function mapaDeAtividade(semanas = 16) {
  const contagem = {};
  for (const valor of Object.values(progress)) {
    if (typeof valor === "string") {
      const dia = diaLocal(new Date(valor));
      contagem[dia] = (contagem[dia] || 0) + 1;
    }
  }
  const dias = [];
  const totalDias = semanas * 7;
  for (let i = totalDias - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const chave = diaLocal(d);
    dias.push({ data: chave, contagem: contagem[chave] || 0 });
  }
  return dias;
}

function contextoConquistas() {
  const geral = overallStats();
  let blocosCompletos = 0;
  for (const nivel of NIVEIS) {
    for (const trilha of nivel.trilhas) blocosCompletos += trilhaStats(trilha).blocosCompletos;
  }
  const temNotaPerfeita = Object.values(notas).some((n) => n.geral === 100);
  return {
    sequenciaAtual: calcularSequencia(),
    maiorSequencia: calcularMaiorSequencia(),
    totalConcluidos: geral.done,
    blocosCompletos,
    temNotaPerfeita,
  };
}

const BADGES = [
  { id: "sequencia-7", titulo: "Sequência de 7 dias", categoria: "Consistência", descricao: "Estuda 7 dias seguidos.", verifica: (c) => c.maiorSequencia >= 7 },
  { id: "sequencia-30", titulo: "Sequência de 30 dias", categoria: "Consistência", descricao: "Estuda 30 dias seguidos.", verifica: (c) => c.maiorSequencia >= 30 },
  { id: "primeiro-bloco", titulo: "Primeiro bloco concluído", categoria: "Domínio", descricao: "Termina o teu primeiro bloco.", verifica: (c) => c.blocosCompletos >= 1 },
  { id: "meio-caminho", titulo: "Meio caminho", categoria: "Domínio", descricao: "Completa 50 exercícios.", verifica: (c) => c.totalConcluidos >= 50 },
  { id: "cem-exercicios", titulo: "100 exercícios", categoria: "Domínio", descricao: "Completa 100 exercícios.", verifica: (c) => c.totalConcluidos >= 100 },
  { id: "nota-100", titulo: "Nota 100", categoria: "Qualidade", descricao: "Recebe uma correção perfeita da IA.", verifica: (c) => c.temNotaPerfeita },
];

function renderMapaAtividade() {
  const dias = mapaDeAtividade();
  const wrap = document.createElement("div");
  wrap.className = "atividade-mapa";
  for (const dia of dias) {
    const cel = document.createElement("span");
    const nivel = dia.contagem === 0 ? 0 : dia.contagem === 1 ? 1 : dia.contagem <= 3 ? 2 : 3;
    cel.className = `atividade-dia atividade-nivel-${nivel}`;
    cel.title = `${dia.data}: ${dia.contagem} exercício${dia.contagem === 1 ? "" : "s"}`;
    wrap.appendChild(cel);
  }
  return wrap;
}

// Explorar: cartões por nível deste eixo (Go ou Design, conforme o site),
// mais um cartão a apontar para o outro eixo. Os mockups mostravam vários
// cursos (Go/Python/React); aqui usa-se o conteúdo que existe de facto.
function renderExplorarPage(container) {
  const header = document.createElement("div");
  header.className = "dash-header";
  header.innerHTML = `
    <h2>Exploração de Trilhas</h2>
    <p class="bloco-desc">Escolhe por onde continuar. Cada nível é um percurso completo, do primeiro exercício ao último.</p>
  `;
  container.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "explorar-grid";

  for (const nivel of NIVEIS) {
    const stats = nivelStats(nivel);
    const desbloqueado = isNivelUnlocked(nivel);
    const comecado = stats.done > 0;
    const card = document.createElement("div");
    card.className = "explorar-card" + (desbloqueado ? "" : " explorar-card-bloqueado");
    card.innerHTML = `
      <div class="explorar-card-topo">
        <span class="explorar-card-icone">${desbloqueado ? APP.nome.slice(0, 2) : ICON_LOCK}</span>
        <span class="explorar-card-etiqueta">${nivel.subtitulo}</span>
      </div>
      <h3>${nivel.titulo}</h3>
      <p class="explorar-card-desc">${escapeHtml(nivel.descricao || "")}</p>
      <div class="explorar-card-progresso">${stats.done} / ${stats.total} exercícios</div>
    `;
    const btn = document.createElement("button");
    btn.className = comecado ? "explorar-btn-secundario" : "dash-btn-primario";
    btn.textContent = desbloqueado ? (comecado ? "Continuar" : "Iniciar trilha") : "Bloqueado";
    btn.disabled = !desbloqueado;
    btn.onclick = () => navigateTo(nivel.id, nivel.trilhas[0].id, OVERVIEW_ID);
    card.appendChild(btn);
    grid.appendChild(card);
  }

  container.appendChild(grid);

  const outro = document.createElement("div");
  outro.className = "dash-card explorar-outro";
  outro.style.marginTop = "var(--s5)";
  outro.innerHTML = `
    <div class="dash-card-topo"><span class="dash-card-eyebrow">O outro eixo</span></div>
    <p>O 100to tem duas trilhas independentes. Estás em <strong>${escapeHtml(APP.nome)}</strong>.</p>
    <a class="dash-btn-primario explorar-link-outro" href="${APP.outro.href}">Ir para ${escapeHtml(APP.outro.nome)}</a>
  `;
  container.appendChild(outro);
}

// Progresso: detalhe por nível, trilha e bloco, a partir das stats já
// calculadas — sem dados novos, só uma vista mais completa do que já existe.
function renderProgressoPage(container) {
  const geral = overallStats();

  const header = document.createElement("div");
  header.className = "dash-header";
  header.innerHTML = `
    <h2>Progresso</h2>
    <p class="bloco-desc">${geral.done} de ${geral.total} exercícios concluídos (${geral.pct}%).</p>
  `;
  container.appendChild(header);

  for (const nivel of NIVEIS) {
    const nStats = nivelStats(nivel);
    const nNota = nivelNota(nivel);
    const secao = document.createElement("div");
    secao.className = "dash-card progresso-nivel";
    secao.innerHTML = `
      <div class="progresso-nivel-topo">
        <h3>${nivel.titulo} <span class="progresso-nivel-sub">${nivel.subtitulo}</span></h3>
        <span class="progresso-nivel-num">${nStats.done} / ${nStats.total}${nNota.corrigidos ? ` · média ${Math.round(nNota.media)}/100` : ""}</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${nStats.pct}%"></div></div>
    `;

    if (isNivelUnlocked(nivel)) {
      for (const trilha of nivel.trilhas) {
        const tStats = trilhaStats(trilha);
        const bloco = document.createElement("div");
        bloco.className = "progresso-trilha";
        bloco.innerHTML = `<div class="progresso-trilha-titulo">${trilha.titulo} <span>${tStats.done}/${tStats.total}</span></div>`;
        const lista = document.createElement("div");
        lista.className = "progresso-blocos";
        for (const b of trilha.blocos) {
          const bStats = blocoStats(trilha, b);
          const item = document.createElement("div");
          item.className = "progresso-bloco" + (bStats.total && bStats.done === bStats.total ? " completo" : "");
          item.innerHTML = `
            <span class="progresso-bloco-nome">${b.titulo}</span>
            <span class="progresso-bloco-num">${bStats.done}/${bStats.total}</span>
          `;
          tornarClicavel(item, () => navigateTo(nivel.id, trilha.id, b.id));
          lista.appendChild(item);
        }
        bloco.appendChild(lista);
        secao.appendChild(bloco);
      }
    } else {
      const bloqueado = document.createElement("p");
      bloqueado.className = "bloco-desc";
      bloqueado.style.margin = "var(--s3) 0 0";
      bloqueado.textContent = "Nível bloqueado. Conclui o nível anterior, ou escolhe-o como nível de entrada.";
      secao.appendChild(bloqueado);
    }

    container.appendChild(secao);
  }
}

function renderPerfilPage(container) {
  const ctx = contextoConquistas();
  const geral = overallStats();

  const header = document.createElement("div");
  header.className = "dash-header";
  header.innerHTML = `<h2>Perfil</h2><p class="bloco-desc">Só para dar cara à tua jornada. Fica guardado neste dispositivo, sem conta nem servidor.</p>`;
  container.appendChild(header);

  const cartao = document.createElement("div");
  cartao.className = "dash-card perfil-cartao";

  const identidade = document.createElement("div");
  identidade.className = "perfil-identidade";
  const avatarEl = document.createElement("div");
  avatarEl.className = "perfil-avatar";
  avatarEl.textContent = perfil.avatar;
  identidade.appendChild(avatarEl);

  const campos = document.createElement("div");
  campos.className = "perfil-campos";

  const labelApelido = document.createElement("label");
  labelApelido.className = "perfil-label";
  labelApelido.setAttribute("for", "perfil-apelido");
  labelApelido.textContent = "Como queres ser tratado";
  const inputApelido = document.createElement("input");
  inputApelido.id = "perfil-apelido";
  inputApelido.className = "perfil-input";
  inputApelido.type = "text";
  inputApelido.maxLength = 30;
  inputApelido.placeholder = "O teu nome ou apelido";
  inputApelido.value = perfil.apelido;
  inputApelido.oninput = () => {
    perfil.apelido = inputApelido.value.trim();
    savePerfil();
  };
  campos.appendChild(labelApelido);
  campos.appendChild(inputApelido);

  const labelAvatar = document.createElement("span");
  labelAvatar.className = "perfil-label";
  labelAvatar.textContent = "Avatar";
  campos.appendChild(labelAvatar);

  const escolhaAvatar = document.createElement("div");
  escolhaAvatar.className = "perfil-avatares";
  escolhaAvatar.setAttribute("role", "radiogroup");
  escolhaAvatar.setAttribute("aria-label", "Escolher avatar");
  for (const emoji of AVATARES) {
    const opcao = document.createElement("button");
    opcao.type = "button";
    opcao.className = "perfil-avatar-opcao" + (emoji === perfil.avatar ? " ativo" : "");
    opcao.textContent = emoji;
    opcao.setAttribute("role", "radio");
    opcao.setAttribute("aria-checked", emoji === perfil.avatar ? "true" : "false");
    opcao.setAttribute("aria-label", `Avatar ${emoji}`);
    opcao.onclick = () => {
      perfil.avatar = emoji;
      savePerfil();
      avatarEl.textContent = emoji;
      [...escolhaAvatar.children].forEach((c) => {
        const ativo = c.textContent === emoji;
        c.classList.toggle("ativo", ativo);
        c.setAttribute("aria-checked", ativo ? "true" : "false");
      });
      renderAppNav();
    };
    escolhaAvatar.appendChild(opcao);
  }
  campos.appendChild(escolhaAvatar);

  identidade.appendChild(campos);
  cartao.appendChild(identidade);
  container.appendChild(cartao);

  const stats = document.createElement("div");
  stats.className = "dash-stats";
  stats.style.marginTop = "var(--s5)";
  stats.innerHTML = `
    <div class="stat-card"><strong>${geral.done}</strong><span>exercícios concluídos</span></div>
    <div class="stat-card"><strong>${geral.pct}%</strong><span>do total</span></div>
    <div class="stat-card"><strong>${ctx.sequenciaAtual}</strong><span>dias em sequência</span></div>
    <div class="stat-card"><strong>${ctx.blocosCompletos}</strong><span>blocos completos</span></div>
  `;
  container.appendChild(stats);

  const atividadeCard = document.createElement("div");
  atividadeCard.className = "dash-card";
  atividadeCard.style.marginTop = "var(--s5)";
  atividadeCard.innerHTML = `<div class="dash-card-topo"><span class="dash-card-eyebrow">Atividade recente</span></div>`;
  atividadeCard.appendChild(renderMapaAtividade());
  container.appendChild(atividadeCard);

  const conquistadas = BADGES.filter((b) => b.verifica(ctx));
  const recentes = document.createElement("div");
  recentes.className = "dash-card";
  recentes.style.marginTop = "var(--s5)";
  recentes.innerHTML = `<div class="dash-card-topo"><span class="dash-card-eyebrow">Conquistas</span></div>`;
  if (conquistadas.length) {
    const lista = document.createElement("div");
    lista.className = "conquistas-lista";
    for (const badge of conquistadas) {
      const item = document.createElement("div");
      item.className = "conquista-card conquista-feita";
      item.innerHTML = `
        <div class="conquista-icone">${ICON_TROFEU}</div>
        <div><strong>${badge.titulo}</strong><span>${badge.descricao}</span></div>
      `;
      lista.appendChild(item);
    }
    recentes.appendChild(lista);
  } else {
    const vazio = document.createElement("p");
    vazio.className = "bloco-desc";
    vazio.style.margin = "0";
    vazio.textContent = "Ainda sem conquistas. Faz o primeiro exercício e começa a sequência.";
    recentes.appendChild(vazio);
  }
  container.appendChild(recentes);
}

function renderConquistasPage(container) {
  const ctx = contextoConquistas();

  const header = document.createElement("div");
  header.className = "dash-header";
  header.innerHTML = `<h2>Suas Conquistas</h2><p class="bloco-desc">Cada exercício é um passo em direção ao domínio.</p>`;
  container.appendChild(header);

  const stats = document.createElement("div");
  stats.className = "dash-stats";
  stats.innerHTML = `
    <div class="stat-card"><strong>${ctx.sequenciaAtual}</strong><span>dias em sequência agora</span></div>
    <div class="stat-card"><strong>${ctx.maiorSequencia}</strong><span>maior sequência</span></div>
    <div class="stat-card"><strong>${ctx.totalConcluidos}</strong><span>exercícios concluídos</span></div>
    <div class="stat-card"><strong>${ctx.blocosCompletos}</strong><span>blocos completos</span></div>
  `;
  container.appendChild(stats);

  const atividadeCard = document.createElement("div");
  atividadeCard.className = "dash-card";
  atividadeCard.style.marginTop = "var(--s5)";
  atividadeCard.innerHTML = `<div class="dash-card-topo"><span class="dash-card-eyebrow">Atividade recente</span></div>`;
  atividadeCard.appendChild(renderMapaAtividade());
  container.appendChild(atividadeCard);

  const categorias = [...new Set(BADGES.map((b) => b.categoria))];
  const badgesGrid = document.createElement("div");
  badgesGrid.className = "conquistas-categorias";
  for (const categoria of categorias) {
    const bloco = document.createElement("div");
    bloco.className = "conquistas-categoria";
    bloco.innerHTML = `<h3>${categoria}</h3>`;
    const lista = document.createElement("div");
    lista.className = "conquistas-lista";
    for (const badge of BADGES.filter((b) => b.categoria === categoria)) {
      const conquistado = badge.verifica(ctx);
      const item = document.createElement("div");
      item.className = "conquista-card" + (conquistado ? " conquista-feita" : "");
      item.innerHTML = `
        <div class="conquista-icone">${conquistado ? ICON_TROFEU : ICON_LOCK}</div>
        <div>
          <strong>${badge.titulo}</strong>
          <span>${badge.descricao}</span>
        </div>
      `;
      lista.appendChild(item);
    }
    bloco.appendChild(lista);
    badgesGrid.appendChild(bloco);
  }
  container.appendChild(badgesGrid);
}

function renderAppNav() {
  const el = document.getElementById("app-nav-links");
  if (!el) return;
  el.innerHTML = "";
  for (const item of ITENS_NAV) {
    const link = document.createElement("div");
    link.className = "app-nav-link" + (currentPage === item.id ? " active" : "");
    const icone = item.id === "perfil" ? `<span class="app-nav-avatar">${perfil.avatar}</span>` : item.icon;
    link.innerHTML = `${icone}<span>${item.label}</span>`;
    tornarClicavel(link, () => {
      // "Minhas Trilhas" precisa de nível/trilha/bloco, ao contrário das
      // outras páginas da shell — navigateTo já sabe como preencher isso.
      if (item.id === "trilhas") navigateTo(currentNivel, currentTrilha, currentBloco);
      else irParaPagina(item.id);
    });
    el.appendChild(link);
  }
}

function renderApp() {
  renderCabecalho();
  renderAppNav();
  const container = document.getElementById("app-content");
  container.innerHTML = "";
  const render = RENDERIZADORES_PAGINA[currentPage] || renderDashboardPage;
  render(container);
}

document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Reiniciar todo o progresso, em todos os eixos e níveis? Esta ação não pode ser desfeita.")) {
    progress = {};
    saveProgress();
    renderApp();
  }
});

renderApp();

// Sincroniza o hash com o estado inicial (cobre o caso de não haver nenhum,
// ou de ser inválido), sem criar uma entrada extra no histórico.
const hashInicial = hashDoEstado(currentPage, currentNivel, currentTrilha, currentBloco);
if (location.hash !== hashInicial) {
  history.replaceState(null, "", hashInicial);
}

// Botão recuar/avançar do browser: aplica o estado do hash sem voltar a
// empurrá-lo para o histórico (já lá está, foi o próprio browser que mudou).
window.addEventListener("popstate", () => {
  const estado = estadoDoHash();
  if (!estado) return;
  currentPage = estado.page;
  if (estado.page === "trilhas") {
    currentNivel = estado.nivelId;
    currentTrilha = estado.trilhaId;
    currentBloco = estado.blocoId;
  }
  renderApp();
  document.getElementById("app-content").scrollTo({ top: 0 });
});
