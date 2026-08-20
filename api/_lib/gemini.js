// Helper partilhado para chamar a API REST do Gemini a partir das
// serverless functions. Sem dependências: usa fetch nativo do runtime
// Node do Vercel. Não exporta handler HTTP, por isso não vira rota.

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";

async function callGemini({ systemInstruction, contents, jsonResponse }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const err = new Error("GEMINI_API_KEY não está configurada no servidor.");
    err.status = 500;
    throw err;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const body = {
    contents,
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: jsonResponse
      ? { responseMimeType: "application/json" }
      : {},
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
    body: JSON.stringify(body),
  });

  if (res.status === 429) {
    const err = new Error("Sem quota disponível no Gemini gratuito neste momento. Tenta outra vez daqui a pouco.");
    err.status = 429;
    throw err;
  }

  if (res.status === 503) {
    const err = new Error("O Gemini está sobrecarregado neste momento. Tenta outra vez daqui a pouco.");
    err.status = 503;
    throw err;
  }

  if (!res.ok) {
    console.error("Gemini respondeu com erro:", res.status, await res.text().catch(() => ""));
    const err = new Error("Não foi possível obter uma resposta agora.");
    err.status = 502;
    throw err;
  }

  const data = await res.json();
  const texto = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
  if (!texto) {
    const err = new Error("O Gemini devolveu uma resposta vazia.");
    err.status = 502;
    throw err;
  }
  return texto;
}

module.exports = { callGemini };
