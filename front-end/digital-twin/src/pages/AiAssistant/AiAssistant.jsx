import React, { useState } from 'react';
import { aiChat } from '../../services/aiClient';
import AppSidebar from "../../pages/LandingPage/_components/Sidebar.jsx";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.js';
import { Link } from 'react-router-dom';

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
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1 transition-all duration-300">
          <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-2">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-gray-800">Assistente de IA</h1>
              </div>

              <div className="flex items-center gap-2">
              </div>
            </div>
          </header>

          <div className="flex-1 p-4">
            <div className="mx-auto max-w-6xl">
              <div className="border border-black/10 p-6 rounded-2xl shadow-sm bg-white">
                <div className="mb-4">
                  <div className="border rounded-lg p-4 min-h-[320px]">
                    {messages.map((m, i) => (
                      <p key={i} className={m.role === 'user' ? 'mb-2 text-right' : 'mb-2 text-left'}>
                        <strong className="mr-2">{m.role === 'user' ? 'Você' : 'Assistente'}:</strong>
                        <span>{m.content}</span>
                      </p>
                    ))}
                    {loading && <p className="text-sm text-gray-500"><em>pensando…</em></p>}
                  </div>
                </div>

                <form onSubmit={handleSend} className="flex gap-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pergunte algo…"
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded bg-primary text-white px-4 py-2 disabled:opacity-60"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
