/* Página de entrada. Não carrega o conteúdo das trilhas: lê apenas o progresso
   guardado e conta as chaves que pertencem a cada eixo, para mostrar onde a
   pessoa ficou sem ter de descarregar os dois ficheiros de dados. */

const THEME_KEY = "100to:theme";

const TOTAIS = {
  go: { total: 354, prefixos: ["principal:", "dominios:", "n2conceitos:", "n2projetos:", "n3conceitos:", "n3projetos:"] },
  sd: { total: 116, prefixos: ["sd1trilha:", "sd2conceitos:", "sd2projetos:", "sd3conceitos:", "sd3projetos:"] },
};

const ICON_SUN =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
const ICON_MOON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';

function effectiveTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
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

function lerProgresso() {
  let dados = {};
  try {
    dados = JSON.parse(localStorage.getItem("100to:progress")) || {};
  } catch {
    dados = {};
  }
  const chaves = Object.keys(dados).filter((k) => dados[k]);
  const out = {};
  for (const [eixo, cfg] of Object.entries(TOTAIS)) {
    out[eixo] = chaves.filter((k) => cfg.prefixos.some((p) => k.startsWith(p))).length;
  }
  return out;
}

function renderProgresso() {
  const feito = lerProgresso();
  for (const eixo of Object.keys(TOTAIS)) {
    const total = TOTAIS[eixo].total;
    const done = Math.min(feito[eixo] || 0, total);
    const pct = total ? Math.round((done / total) * 100) : 0;
    document.getElementById(`prog-${eixo}`).style.width = pct + "%";
    document.getElementById(`prog-${eixo}-txt`).textContent = `${done} / ${total}`;
  }
}

// Mapa visual do percurso completo, sem carregar os dados das trilhas: cada
// quadrado é um exercício, agregado dos dois eixos, na ordem em que estão.
function renderJornada() {
  const grid = document.getElementById("lp-jornada-grid");
  if (!grid) return;
  const feito = lerProgresso();
  const totalGeral = Object.values(TOTAIS).reduce((s, c) => s + c.total, 0);
  const feitoGeral = Object.keys(TOTAIS).reduce((s, e) => s + Math.min(feito[e] || 0, TOTAIS[e].total), 0);

  grid.innerHTML = "";
  for (let i = 0; i < totalGeral; i++) {
    const passo = document.createElement("span");
    passo.className = "lp-jornada-passo" + (i < feitoGeral ? " feito" : i === feitoGeral ? " atual" : "");
    grid.appendChild(passo);
  }
  grid.setAttribute("aria-label", `${feitoGeral} de ${totalGeral} exercícios concluídos nas duas trilhas`);
}

renderThemeToggle();
renderProgresso();
renderJornada();
