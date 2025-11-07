export async function aiChat({ messages, system }) {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const res = await fetch(`${base}/api/ai/chat`, {   // note a BARRA inicial
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, system }),
  });
  if (!res.ok) throw new Error('AI API error');
  return res.json();
}
