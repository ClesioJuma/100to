const { callGemini } = require("./_lib/gemini");

const MAX_RESPOSTA = 4000;

const REFERENCIAS = {
  b0: require("./_ref/b0"),
};

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

  const systemInstruction = `És um corretor de exercícios de Go para o curso "100to". Vais comparar a resposta de um aluno a um exercício com uma solução de referência, e devolver uma nota.

Enunciado do exercício: "${enunciado}"

Solução de referência (o aluno nunca vê isto):
${referencia.resposta}

Pontos-chave que a resposta do aluno deve cumprir:
${referencia.pontosChave.map((p) => `- ${p}`).join("\n")}

A resposta do aluno não precisa de ser idêntica à referência: qualquer código idiomático e correto que cumpra os pontos-chave conta como certo. Julga se funciona e faz sentido, não se é uma cópia.

Responde ESTRITAMENTE em JSON, sem markdown, neste formato:
{"nota": <número de 0 a 10>, "feedback": "<até 3 frases em português, diz o que está certo e o que falta ou está errado>", "correto": <true ou false>}`;

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

    const nota = Math.max(0, Math.min(10, Number(resultado.nota)));
    if (Number.isNaN(nota)) {
      res.status(502).json({ erro: "O corretor devolveu uma nota inválida. Tenta outra vez." });
      return;
    }

    res.status(200).json({
      nota,
      feedback: typeof resultado.feedback === "string" ? resultado.feedback : "",
      correto: !!resultado.correto,
    });
  } catch (err) {
    res.status(err.status || 500).json({ erro: err.message || "Erro inesperado." });
  }
};
