export default function LandingPage() {
  const paciente = {
    nome: "João Silva",
    idade: 30,
    genero: "Masculino",
    ultimaConsulta: "20-10-2025",
    riscoGeral: "Baixo",
  };

   const riskClassName = paciente.riscoGeral === 'Baixo' ? 'status-baixo' : 'status-alerta';

  return (
    <>
      <div className="lp-container">
        <nav><li><a href="/login">Sair da Sistema</a></li></nav>

        <header className="lp-header">
          <h1>Bem vindo, {paciente.nome}</h1>
          <p>Seu Painel de Acompanhamento de Saúde e Prevenção de Riscos</p>
        </header>

        <section className="data-list">
            <h2>Informações do Perfil</h2>
            <p><strong>Idade:</strong> {paciente.idade} anos</p>
            <p><strong>Gênero:</strong> {paciente.genero}</p>
            <p>
                <strong>Risco Geral Estimado: </strong>
                <span>{paciente.riscoGeral}</span>
            </p>
            <p><strong>Última Atualização dos Dados:</strong> {paciente.ultimaConsulta}</p>
        </section>

        <section className="Dashboard">
            <h2>Visão Completa</h2>
            <p>Para visualizar suas métricas de saúde detalhadas e recomendações de prevenção, acesse <a href="/dashboard"> Painel de Acompanhamento</a></p>
        </section>
      </div>
    </>
  );
}
