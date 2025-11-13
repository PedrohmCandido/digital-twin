import React, { useState } from 'react';
import { aiChat } from '../../services/aiClient';
import getFollowUp from '../../services/followUp';
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

  async function handleAnalyzeMetrics() {
    setLoading(true);
    try {
      const dados = await getFollowUp();
      const nums = (arr, key) =>
        arr
          .map((x) => {
            const v = x[key];
            return typeof v === 'number' ? v : v ? Number(v) : NaN;
          })
          .filter((n) => typeof n === 'number' && !Number.isNaN(n));

      const avg = (a) => {
        if (!a.length) return 0;
        return a.reduce((s, n) => s + n, 0) / a.length;
      };

      const mediaFC = avg(nums(dados, 'frequencia_cardiaca_bpm'));
      const mediaSpO2 = avg(nums(dados, 'oxigenacao_spo2'));
      const mediaVFC = avg(nums(dados, 'variabilidade_fc_ms'));

      const content = `Analise estas métricas do meu dashboard e forneça um diagnóstico/resumo e recomendações:\n- FC média (bpm): ${mediaFC ? mediaFC.toFixed(1) : 'N/A'}\n- SpO2 média (%): ${mediaSpO2 ? mediaSpO2.toFixed(1) : 'N/A'}\n- VFC média (ms): ${mediaVFC ? mediaVFC.toFixed(1) : 'N/A'}\n\nPor favor, explique o que esses números podem indicar e sugira próximos passos clínicos ou contextuais.`;

      const userMsg = { role: 'user', content };
      const next = [...messages, userMsg];
      setMessages(next);

      const { content: reply } = await aiChat({ messages: next });
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Erro ao analisar métricas', err);
      setMessages((m) => [...m, { role: 'assistant', content: 'Não consegui analisar as métricas agora.' }]);
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
                <button
                  onClick={handleAnalyzeMetrics}
                  disabled={loading}
                  className="rounded-lg border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  Analisar métricas
                </button>
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
