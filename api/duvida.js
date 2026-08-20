const { callGemini } = require("./_lib/gemini");

const MAX_PERGUNTA = 2000;
const MAX_HISTORICO = 10;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ erro: "Método não permitido." });
    return;
  }

  const { blocoId, exercicioIdx, enunciado, dica, pergunta, historico } = req.body || {};

  if (
    typeof blocoId !== "string" ||
    typeof exercicioIdx !== "number" ||
    typeof enunciado !== "string" ||
    typeof pergunta !== "string" ||
    !pergunta.trim()
  ) {
    res.status(400).json({ erro: "Pedido inválido." });
    return;
  }

  if (pergunta.length > MAX_PERGUNTA) {
    res.status(400).json({ erro: "Pergunta demasiado longa." });
    return;
  }

  const historicoValido = Array.isArray(historico)
    ? historico
        .slice(-MAX_HISTORICO)
        .filter((m) => m && (m.papel === "user" || m.papel === "ia") && typeof m.texto === "string")
    : [];

  const systemInstruction = `És um tutor de Go para o curso "100to", a ajudar um aluno com um exercício específico do Bloco ${blocoId}.

Enunciado do exercício: "${enunciado}"
${dica ? `Dica já disponível para o aluno (ele já pode tê-la lido): "${dica}"` : ""}

Regras:
- Respondes sempre em português (Portugal/Moçambique, sem gírias brasileiras).
- Nunca escreves a solução completa e final do exercício, mesmo que o aluno peça diretamente. O objetivo é ele aprender a chegar lá, não copiar.
- Podes explicar conceitos, mostrar pequenos exemplos ilustrativos (não a resposta ao exercício em si), apontar erros de raciocínio, e fazer perguntas que ajudem o aluno a pensar.
- Sê direto e curto. Sem introduções longas nem despedidas.
- Se o aluno insistir em pedir a resposta pronta, explica que o objetivo é ele chegar lá, e continua a guiar em vez de resolver por ele.`;

  const contents = [
    ...historicoValido.map((m) => ({
      role: m.papel === "user" ? "user" : "model",
      parts: [{ text: m.texto }],
    })),
    { role: "user", parts: [{ text: pergunta }] },
  ];

  try {
    const resposta = await callGemini({ systemInstruction, contents, jsonResponse: false });
    res.status(200).json({ resposta });
  } catch (err) {
    res.status(err.status || 500).json({ erro: err.message || "Erro inesperado." });
  }
};
