import { useState } from 'react';
import { aiChat } from '../../services/aiClient';

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Oi! Sou seu assistente do Digital Twin. Como posso ajudar?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const { content } = await aiChat({ messages: next });
      setMessages([...next, { role: 'assistant', content }]);
    } catch (err) {
      setMessages([
        ...next,
        { role: 'assistant', content: 'Ops! Não consegui falar com a IA agora.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', padding: 16 }}>
      <h1>AI Assistant</h1>

      <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, minHeight: 320 }}>
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.role === 'user' ? 'Você' : 'Assistente'}:</strong> {m.content}
          </p>
        ))}
        {loading && <p><em>pensando…</em></p>}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte algo…"
          style={{ flex: 1 }}
        />
        <button disabled={loading}>Enviar</button>
      </form>
    </div>
  );
}
