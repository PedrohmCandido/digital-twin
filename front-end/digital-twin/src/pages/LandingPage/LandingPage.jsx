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

export default function LandingPage() {
  const navigate = useNavigate();
  const user = safeGetUser();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <SidebarProvider>
      <Sidebar onLogout={handleLogout} />

      <SidebarInset>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-semibold">
                    Bem-vindo{user?.name ? `, ${user.name}` : ""}!
                  </h1>
                  {user?.email && (
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/ai-assistant"
                  className="rounded-lg border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  Assistente de IA
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90"
                >
                  Sair
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
              <section className="rounded-xl border p-5">
                <h2 className="text-lg font-medium">Início</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Esta é a sua página inicial após o login. Use o menu lateral
                  para navegar.
                </p>

                <ul className="mt-4 list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Acesse o{" "}
                    <Link className="text-primary underline" to="/dashboard">
                      Dashboard
                    </Link>{" "}
                    para visualizar indicadores.
                  </li>
                  <li>
                    Use o{" "}
                    <Link className="text-primary underline" to="/search">
                      Pesquisar
                    </Link>{" "}
                    para encontrar itens rapidamente.
                  </li>
                  <li>
                    Configure preferências em{" "}
                    <Link className="text-primary underline" to="/settings">
                      Configurações
                    </Link>
                    .
                  </li>
                </ul>
              </section>

              <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border p-4">
                  <h3 className="font-medium text-primary">Prazos</h3>

                  <p className="text-sm text-muted-foreground">
                    Veja prazos próximos e organize suas tarefas.
                  </p>
                  <Link
                    to="/calendar"
                    className="mt-3 inline-block text-sm text-primary underline"
                  >
                    Abrir calendário
                  </Link>
                </div>

                <div className="rounded-xl border p-4">
                  <h3 className="font-medium text-primary">Atalhos</h3>
                  <p className="text-sm text-muted-foreground">
                    Acesse funções frequentes em um clique.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      to="/dashboard"
                      className="rounded-lg border px-2.5 py-1 text-sm hover:bg-accent"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/ai-assistant"
                      className="rounded-lg border px-2.5 py-1 text-sm hover:bg-accent"
                    >
                      Assistente
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl border p-4">
                  <h3 className="font-medium text-primary">Dicas</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize o tema, teclado e layouts nas configurações.
                  </p>
                  <Link
                    to="/settings"
                    className="mt-3 inline-block text-sm text-primary underline"
                  >
                    Abrir configurações
                  </Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
