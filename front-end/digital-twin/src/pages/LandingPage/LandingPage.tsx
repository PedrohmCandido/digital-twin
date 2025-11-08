// pages/LandingPage/LandingPage.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type User = {
  name?: string;
  email?: string;
  // adicione outros campos se existirem no seu objeto salvo
};

function safeGetUser(): User | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
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
    <div style={{ padding: 24 }}>
      <header style={{ marginBottom: 16 }}>
        <h1>Bem-vindo{user?.name ? `, ${user.name}` : ""}!</h1>
        {user?.email && <p style={{ opacity: 0.8 }}>{user.email}</p>}
      </header>

      <nav style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <Link to="/dashboard">Ir para o Dashboard</Link>
        <Link to="/ai-assistant">Assistente de IA</Link>

        <button onClick={handleLogout}>Sair do Sistema</button>
      </nav>

      <main>
        <p>Esta é a sua página inicial após o login.</p>
        <ul>
          <li>Use o menu acima para acessar o painel.</li>
          <li>Ou experimente o assistente de IA.</li>
          <li>Ao sair, você será levado à página de login.</li>
        </ul>
      </main>
    </div>
  );
}
