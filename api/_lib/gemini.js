// Helper partilhado para chamar a API REST do Gemini a partir das
// serverless functions. Sem dependências: usa fetch nativo do runtime
// Node do Vercel. Não exporta handler HTTP, por isso não vira rota.
//
// Quando um modelo está sobrecarregado (503) ou sem quota (429), tenta o
// seguinte da lista antes de desistir, para o aluno nunca ver um erro de
// "sobrecarregado" só porque um dos três modelos gratuitos está ocupado.
// O orçamento total (todas as tentativas juntas) fica limitado a ~20s, para
// o botão "A pensar..."/"A corrigir..." não ficar pendurado indefinidamente.

// Aliases "-latest", não nomes de versão fixos: a Google aponta-os sempre
// para o modelo atual, o que evita partir quando uma versão pinada (como
// gemini-2.5-flash) é descontinuada para chaves novas.
const DEFAULT_MODELS = ["gemini-flash-latest", "gemini-flash-lite-latest", "gemini-pro-latest"];
const MODELS = (process.env.GEMINI_MODELS || process.env.GEMINI_MODEL || DEFAULT_MODELS.join(","))
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

const ORCAMENTO_TOTAL_MS = 20000;

async function tentarModelo(model, apiKey, body, timeoutMs) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (res.status === 429 || res.status === 503 || res.status >= 500) {
      console.error(`Gemini (${model}) indisponível: ${res.status}`);
      return { retomavel: true };
    }

    if (!res.ok) {
      console.error(`Gemini (${model}) respondeu com erro:`, res.status, await res.text().catch(() => ""));
      const err = new Error("Não foi possível obter uma resposta agora.");
      err.status = 502;
      throw err;
    }

    const data = await res.json();
    const texto = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
    if (!texto) return { retomavel: true };
    return { texto };
  } catch (err) {
    if (err.name === "AbortError") {
      console.error(`Gemini (${model}) excedeu o tempo limite.`);
      return { retomavel: true };
    }
    if (err.status) throw err;
    console.error(`Gemini (${model}) falhou:`, err.message);
    return { retomavel: true };
  } finally {
    clearTimeout(timer);
  }
}

async function callGemini({ systemInstruction, contents, jsonResponse }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const err = new Error("GEMINI_API_KEY não está configurada no servidor.");
    err.status = 500;
    throw err;
  }

  const body = {
    contents,
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: jsonResponse ? { responseMimeType: "application/json" } : {},
  };

  const inicio = Date.now();
  for (const model of MODELS) {
    const restante = ORCAMENTO_TOTAL_MS - (Date.now() - inicio);
    if (restante < 1500) break;

    const resultado = await tentarModelo(model, apiKey, body, Math.min(restante, 9000));
    if (resultado.texto) return resultado.texto;
    // resultado.retomavel: este modelo falhou, tenta o próximo da lista.
  }

  const err = new Error("Não foi possível obter uma resposta agora. Tenta outra vez daqui a um bocado.");
  err.status = 503;
  throw err;
}

module.exports = { callGemini };
