const { callGemini } = require("./_lib/gemini");

const MAX_RESPOSTA = 4000;

const REFERENCIAS = {
  b0: require("./_ref/b0"),
};

function numeroEm0a100(v) {
  const n = Math.round(Math.max(0, Math.min(100, Number(v))));
  return Number.isNaN(n) ? null : n;
}

function listaDeTexto(v, max) {
  if (!Array.isArray(v)) return [];
  return v.filter((x) => typeof x === "string" && x.trim()).slice(0, max);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ erro: "Método não permitido." });
    return;
  }

  const { blocoId, exercicioIdx, enunciado, resposta } = req.body || {};

  if (
    typeof blocoId !== "string" ||
    typeof exercicioIdx !== "number" ||
    typeof enunciado !== "string" ||
    typeof resposta !== "string" ||
    !resposta.trim()
  ) {
    res.status(400).json({ erro: "Pedido inválido." });
    return;
  }

  if (resposta.length > MAX_RESPOSTA) {
    res.status(400).json({ erro: "Resposta demasiado longa." });
    return;
  }

  const refsDoBloco = REFERENCIAS[blocoId];
  const referencia = refsDoBloco && refsDoBloco[exercicioIdx];
  if (!referencia) {
    res.status(400).json({ erro: "Este exercício ainda não tem correção automática disponível." });
    return;
  }

  const systemInstruction = `És um corretor de exercícios de Go para o curso "100to". Vais comparar a resposta de um aluno a um exercício com uma solução de referência, e devolver uma avaliação detalhada por critérios.

Enunciado do exercício: "${enunciado}"

Solução de referência (o aluno nunca vê isto):
${referencia.resposta}

Pontos-chave que a resposta do aluno deve cumprir:
${referencia.pontosChave.map((p) => `- ${p}`).join("\n")}

A resposta do aluno não precisa de ser idêntica à referência: qualquer código idiomático e correto que cumpra os pontos-chave conta como certo. Julga se funciona e faz sentido, não se é uma cópia.

Avalia 4 critérios, cada um de 0 a 100:
- correcao: cumpre os pontos-chave e funciona para os casos razoáveis.
- qualidade: legibilidade, nomes, estrutura idiomática em Go.
- eficiencia: não faz nada desnecessariamente caro ou repetido (para um exercício deste nível, não penalizes detalhes irrelevantes ao contexto).
- boasPraticas: tratamento de erros, convenções do Go, uso correto da linguagem.

Responde ESTRITAMENTE em JSON, sem markdown, neste formato:
{
  "correcao": <0-100>,
  "qualidade": <0-100>,
  "eficiencia": <0-100>,
  "boasPraticas": <0-100>,
  "pontosFortes": ["<até 3 frases curtas em português, o que a resposta fez bem>"],
  "pontosMelhorar": ["<até 3 frases curtas em português, o que falta ou está errado>"],
  "recomendacao": "<até 2 frases em português, uma sugestão concreta de próximo passo>",
  "correto": <true ou false, cumpre os pontos-chave essenciais>
}`;

  const contents = [{ role: "user", parts: [{ text: `Resposta do aluno:\n${resposta}` }] }];

  try {
    const texto = await callGemini({ systemInstruction, contents, jsonResponse: true });
    let resultado;
    try {
      resultado = JSON.parse(texto);
    } catch {
      res.status(502).json({ erro: "O corretor devolveu um resultado inválido. Tenta outra vez." });
      return;
    }

    const correcao = numeroEm0a100(resultado.correcao);
    const qualidade = numeroEm0a100(resultado.qualidade);
    const eficiencia = numeroEm0a100(resultado.eficiencia);
    const boasPraticas = numeroEm0a100(resultado.boasPraticas);

    if (correcao === null || qualidade === null || eficiencia === null || boasPraticas === null) {
      res.status(502).json({ erro: "O corretor devolveu notas inválidas. Tenta outra vez." });
      return;
    }

    // Correção pesa mais: é o critério que decide se o exercício está feito.
    const geral = Math.round(correcao * 0.4 + qualidade * 0.2 + eficiencia * 0.2 + boasPraticas * 0.2);

    res.status(200).json({
      geral,
      correcao,
      qualidade,
      eficiencia,
      boasPraticas,
      pontosFortes: listaDeTexto(resultado.pontosFortes, 3),
      pontosMelhorar: listaDeTexto(resultado.pontosMelhorar, 3),
      recomendacao: typeof resultado.recomendacao === "string" ? resultado.recomendacao : "",
      correto: !!resultado.correto,
    });
  } catch (err) {
    res.status(err.status || 500).json({ erro: err.message || "Erro inesperado." });
  }
};
