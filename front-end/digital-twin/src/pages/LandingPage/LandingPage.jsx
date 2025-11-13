import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./_components/Sidebar.jsx";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function safeGetUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getDisplayName(user) {
  if (!user) return "";
  return (
    user.name ||
    user.username ||
    user.fullName ||
    user.displayName ||
    (user.email ? user.email.split("@")[0] : "")
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const user = safeGetUser();
  const displayName = getDisplayName(user);
  const displayEmail = user?.email || "";

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <SidebarProvider>
      <Sidebar onLogout={handleLogout} />

      <SidebarInset>
        <div className="min-h-screen flex flex-col bg-[#F5FAFC]">
          <header className="sticky top-0 z-10 border-b  backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="text-black hover:text-white transition" />

                <div>
                  <h1 className="text-xl font-semibold text-black">
                    Bem-vindo{displayName ? `, ${displayName}` : ""}!
                  </h1>

                  {displayEmail && (
                    <p className="text-sm text-gray-500">{displayEmail}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90"
              >
                Sair
              </button>
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
              {/* Card de Introdução */}
              <section className="rounded-xl border border-[#75A7BD] bg-white p-5 shadow-md">
                <h2 className="text-lg font-medium text-[#324158]">Início</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Esta é a sua página inicial após o login. Use o menu lateral
                  para navegar.
                </p>

                <ul className="mt-4 list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Acesse o{" "}
                    <Link className="text-[#357066] underline" to="/dashboard">
                      Dashboard
                    </Link>{" "}
                    para visualizar indicadores.
                  </li>

                  <li>
                    Use o{" "}
                    <Link className="text-[#357066] underline" to="/search">
                      Ficha técnica
                    </Link>{" "}
                    para encontrar os seus dados.
                  </li>

                  <li>
                    Configure preferências em{" "}
                    <Link className="text-[#357066] underline" to="/settings">
                      Configurações
                    </Link>
                    .
                  </li>

                  <li>
                    Acesse o{" "}
                    <Link
                      className="text-[#357066] underline"
                      to="/aiassistant"
                    >
                      assistente de IA
                    </Link>{" "}
                    para tirar dúvidas sobre sua saúde.
                  </li>

                  <li>
                    Acesse a página de{" "}
                    <Link className="text-[#357066] underline" to="/devices">
                      dispositivos
                    </Link>{" "}
                    para conectar seus dispositivos.
                  </li>
                </ul>
              </section>

              {/* Cards da grade */}
              <section className="grid gap-4 md:grid-cols-3">
                {/* CARD 1 */}

                {/* CARD 2 */}
                <div className="rounded-xl border border-[#75A7BD] bg-white p-4 shadow-md hover:shadow-lg transition">
                  <h3 className="font-medium text-[#357066]">Atalhos</h3>

                  <p className="text-sm text-gray-600">
                    Acesse funções frequentes em um clique.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      to="/dashboard"
                      className="rounded-lg border border-[#6CB7BD] text-[#324158] px-2.5 py-1 text-sm hover:bg-[#6CB7BD]/20"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/devices"
                      className="rounded-lg border border-[#6CB7BD] text-[#324158] px-2.5 py-1 text-sm hover:bg-[#6CB7BD]/20"
                    >
                      Dispositivos
                    </Link>

                    <Link
                      to="/ai-assistant"
                      className="rounded-lg border border-[#6CB7BD] text-[#324158] px-2.5 py-1 text-sm hover:bg-[#6CB7BD]/20"
                    >
                      Assistente
                    </Link>
                  </div>
                </div>

                {/* CARD 3 */}
                <div className="rounded-xl border border-[#75A7BD] bg-white p-4 shadow-md hover:shadow-lg transition">
                  <h3 className="font-medium text-[#357066]">Novidades</h3>

                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Métricas adicionadas e novas funcionalidades</li>
                    <li>Ficha técnica em construção</li>
                    <li>Assistente de IA atualizado</li>
                  </ul>
                </div>
              </section>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
