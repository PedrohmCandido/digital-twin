import 'dotenv/config';                 // <- garante que o .env é lido
import Groq from 'groq-sdk';

let client;                             // cache do cliente

function getGroq() {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    throw new Error('GROQ_API_KEY ausente. Crie backend/.env e defina GROQ_API_KEY=');
  }
  if (!client) client = new Groq({ apiKey: key });
  return client;
}

export async function chat(req, res) {
  try {
    const { messages = [], system } = req.body;

    const groq = getGroq();             // cliente só é criado aqui, após .env
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        ...(system ? [{ role: 'system', content: system }] : []),
        ...messages,
      ],
      temperature: 0.4,
      max_tokens: 800,
    });

    const content = completion.choices?.[0]?.message?.content ?? '';
    res.json({ content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI_CHAT_ERROR', details: err.message });
  }
}
