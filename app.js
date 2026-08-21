/* Motor partilhado pelos dois sites. Cada um traz o seu APP, NIVEIS e GUIAS.
   O progresso vive numa chave comum, porque os ids de trilha não colidem entre
   eixos, e o tema é partilhado de propósito: quem escolhe escuro num site
   espera encontrar escuro no outro. */
const STORAGE_KEY = "100to:progress";
const OVERVIEW_ID = "__overview__";

const GUIAS_TODOS = GUIAS;
const TRILHAS = NIVEIS.flatMap((n) => n.trilhas);

const ICON_GRID =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>';

const ICON_BOOK =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>';

const ICON_SUN =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';

const ICON_MOON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';

const ICON_LOCK =
  '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>';

const ICON_CHECKLIST =
  '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 7 2 2 4-4"/><path d="m3 17 2 2 4-4"/><path d="M13 7h8"/><path d="M13 17h8"/></svg>';

const ICON_HINT =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.5.5.8 1 .8 1.7V16h6.4v-.8c0-.7.3-1.2.8-1.7A6 6 0 0 0 12 3Z"/></svg>';

const ICON_LIVRO =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M12 3h5.5A2.5 2.5 0 0 1 20 5.5v14a2.5 2.5 0 0 1-2.5 2.5H12"/><path d="M8 8h2M8 12h2"/></svg>';

const ICON_CHAT =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>';

const ICON_CORRIGIR =
  '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>';

const THEME_KEY = "100to:theme";
const ENTRY_KEY = "100to:entrada";
const NOTAS_KEY = "100to:notas";

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
            return `<h4 class="livro-secao">${formatEnunciado(t.slice(3).trim())}</h4>`;
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
  btn.title = theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro";
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

// Deep-linking: o estado (nível/trilha/bloco) vive também no hash do URL,
// #/nivel/trilha/bloco, para permitir partilhar um link direto, recarregar
// sem perder o sítio, e o botão recuar do browser funcionar dentro da app.
function hashDoEstado(nivelId, trilhaId, blocoId) {
  return `#/${nivelId}/${trilhaId}/${blocoId}`;
}

function estadoDoHash() {
  const partes = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (partes.length < 3) return null;
  const [nivelId, trilhaId, blocoId] = partes;
  const nivel = findNivel(nivelId);
  if (!nivel) return null;
  const trilha = nivel.trilhas.find((t) => t.id === trilhaId);
  if (!trilha) return null;
  if (blocoId !== OVERVIEW_ID && !findBloco(trilha, blocoId)) return null;
  return { nivelId, trilhaId, blocoId };
}

// Arranca no nível de entrada escolhido para este eixo, não sempre no primeiro,
// exceto se o URL já apontar para um sítio específico (link partilhado, ou
// recarregar a página a meio de um bloco).
const estadoInicial = estadoDoHash();
let currentNivel = estadoInicial ? estadoInicial.nivelId : nivelEntrada();
let currentTrilha = estadoInicial ? estadoInicial.trilhaId : findNivel(currentNivel).trilhas[0].id;
let currentBloco = estadoInicial ? estadoInicial.blocoId : OVERVIEW_ID;

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
  else progress[key] = true;
  saveProgress();
  renderAll();
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
      soma += nota.nota;
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
  currentNivel = nivelId;
  currentTrilha = trilhaId;
  currentBloco = blocoId;
  renderAll();
  document.getElementById("content").scrollTo({ top: 0 });

  const hash = hashDoEstado(nivelId, trilhaId, blocoId);
  if (location.hash !== hash) {
    history.pushState(null, "", hash);
  }
}

function renderCabecalho() {
  document.getElementById("app-nome").textContent = APP.nome;
  document.getElementById("app-tagline").textContent = APP.tagline;
  const logo = document.getElementById("app-logo");
  logo.src = APP.icone;
  logo.alt = APP.nome;
  const outro = document.getElementById("link-outro");
  outro.href = APP.outro.href;
  outro.textContent = APP.outro.nome;
}

function renderNiveis() {
  const el = document.getElementById("nivel-tabs");
  el.innerHTML = "";
  for (const nivel of NIVEIS) {
    const unlocked = isNivelUnlocked(nivel);
    const stats = nivelStats(nivel);
    const nota = nivelNota(nivel);
    const tab = document.createElement("div");
    tab.className = "nivel-tab" + (nivel.id === currentNivel ? " active" : "") + (unlocked ? "" : " locked");
    tab.innerHTML = `
      <span class="nivel-tab-titulo">${nivel.titulo}${unlocked ? "" : ` <span class="nivel-tab-lock">${ICON_LOCK}</span>`}</span>
      <span class="nivel-tab-sub">${nivel.subtitulo}${stats.total ? ` · ${stats.done}/${stats.total}` : ""}${nota.corrigidos ? ` · média ${nota.media.toFixed(1)}/10` : ""}</span>
    `;
    tornarClicavel(tab, () => {
      currentNivel = nivel.id;
      currentTrilha = nivel.trilhas.length ? nivel.trilhas[0].id : null;
      currentBloco = OVERVIEW_ID;
      renderAll();
    });
    el.appendChild(tab);
  }
  renderNivelNota();
}

function renderNivelNota() {
  const nota = document.getElementById("nivel-nota");
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

function renderTabs() {
  const nivel = findNivel(currentNivel);
  const tabsEl = document.getElementById("trilha-tabs");
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

function renderSidebar() {
  const nivel = findNivel(currentNivel);
  const sidebarEl = document.getElementById("sidebar");
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

function criarPainelCorrigir(trilha, bloco, idx, enunciado, aoAtualizarNota) {
  const painel = document.createElement("div");
  painel.className = "exercicio-corrigir";
  painel.onclick = (ev) => ev.stopPropagation();

  const textarea = document.createElement("textarea");
  textarea.className = "corrigir-input";
  textarea.rows = 5;
  textarea.placeholder = "Cola aqui a tua resposta ou código...";

  const btn = document.createElement("button");
  btn.className = "corrigir-enviar";
  btn.textContent = "Corrigir";

  const resultadoEl = document.createElement("div");
  resultadoEl.className = "corrigir-resultado";
  resultadoEl.hidden = true;

  function renderResultado(registo) {
    if (!registo) {
      resultadoEl.hidden = true;
      resultadoEl.innerHTML = "";
      return;
    }
    resultadoEl.hidden = false;
    resultadoEl.innerHTML = `
      <span class="corrigir-nota${registo.correto ? " corrigir-nota-ok" : ""}">${registo.nota.toFixed(1)}/10</span>
      <p class="corrigir-feedback">${escapeHtml(registo.feedback)}</p>
    `;
  }
  renderResultado(getNota(trilha.id, bloco.id, idx));

  async function corrigir() {
    const resposta = textarea.value.trim();
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
      const registo = { nota: data.nota, feedback: data.feedback, correto: data.correto, data: new Date().toISOString() };
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

  painel.appendChild(textarea);
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
      ? `Nota do bloco: ${n.media.toFixed(1)}/10 (${n.corrigidos}/${n.total} corrigidos)`
      : "";
    renderNiveis();
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

function renderOverall() {
  const stats = overallStats();
  document.getElementById("overall-count").textContent = `${stats.done} / ${stats.total}`;
  document.getElementById("overall-pct").textContent = `${stats.pct}%`;
  document.getElementById("overall-fill").style.width = `${stats.pct}%`;
  document.getElementById("overall-motivation").textContent = motivationalText(stats.pct);
}

function renderAll() {
  renderCabecalho();
  renderNiveis();
  renderTabs();
  renderSidebar();
  renderContent();
  renderOverall();
}

document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Reiniciar todo o progresso, em todos os eixos e níveis? Esta ação não pode ser desfeita.")) {
    progress = {};
    saveProgress();
    renderAll();
  }
});

renderAll();

// Sincroniza o hash com o estado inicial (cobre o caso de não haver nenhum,
// ou de ser inválido), sem criar uma entrada extra no histórico.
const hashInicial = hashDoEstado(currentNivel, currentTrilha, currentBloco);
if (location.hash !== hashInicial) {
  history.replaceState(null, "", hashInicial);
}

// Botão recuar/avançar do browser: aplica o estado do hash sem voltar a
// empurrá-lo para o histórico (já lá está, foi o próprio browser que mudou).
window.addEventListener("popstate", () => {
  const estado = estadoDoHash();
  if (!estado) return;
  currentNivel = estado.nivelId;
  currentTrilha = estado.trilhaId;
  currentBloco = estado.blocoId;
  renderAll();
  document.getElementById("content").scrollTo({ top: 0 });
});
