import { useNavigate } from "react-router";
export default function DashBoard() {
  const navigate = useNavigate();

  function handleLp() {
    navigate("/landing-page");
  }
  const metricas = [
    { nome: "Pressão Arterial", valor: "120/80 mmHg", risco: "Baixo" },
    { nome: "Frequência Cardíaca", valor: "72 bpm", risco: "Baixo" },
    { nome: "Nível de Colesterol", valor: "190 mg/dL", risco: "Alto" },
    { nome: "Índice de Massa Corporal (IMC)", valor: "24.5", risco: "Baixo" },
    { nome: "Glicemia em Jejum", valor: "95 mg/dL", risco: "Medio" },
    { nome: "Nível de Stresse", valor: "Moderado", risco: "Baixo" },
  ];

  const getRiskClassName = (risco: string) => {
    return `risco-${risco.toLowerCase()}`;
  };

  const getRecomendacao = () => {
    const metricaAlerta = metricas.find(m => m.risco === "Alto" || m.risco === "Medio");
    if (!metricaAlerta) {
        return{
            titulo: "Saúde em Dia",
            texto: "Parabéns! Seus indicadores de saúde estão dentro dos níveis recomendados.",
            tipo: "baixo"
        };
    }
    switch (metricaAlerta.nome) {
        case "Pressão Arterial":
            return {
                titulo: "Atenção à Pressão Arterial",
                texto: "Sua pressão arterial está alta. Considere consultar um médico e adotar hábitos saudáveis.",
                tipo: metricaAlerta.risco
            };
        case "Frequência Cardíaca":
            return {
                titulo: "Cuidado com a Frequência Cardíaca",
                texto: "Sua frequência cardíaca está elevada. Práticas de relaxamento e exercícios podem ajudar.",
                tipo: metricaAlerta.risco
            };
        case "Nível de Colesterol":
            return {
                titulo: "Atenção ao Colesterol",
                texto: "Seu nível de colesterol está alto. Considere uma dieta balanceada e exercícios regulares.",
                tipo: metricaAlerta.risco
            };
        case "Índice de Massa Corporal (IMC)":
            return {
                titulo: "Controle do Peso",
                texto: "Seu IMC está acima do recomendado. Adotar uma alimentação saudável e praticar exercícios pode ajudar.",
                tipo: metricaAlerta.risco
            };
        case "Glicemia em Jejum":
            return {
                titulo: "Atenção à Glicemia",
                texto: "Seu nível de glicemia está elevado. Monitorar a dieta e consultar um profissional de saúde é recomendado.",
                tipo: metricaAlerta.risco
            };
        case "Nível de Stresse":
            return {
                titulo: "Gerenciamento do Estresse",
                texto: "Seu nível de estresse está moderado. Práticas de relaxamento e mindfulness podem ajudar.",
                tipo: metricaAlerta.risco
            };
        default:
            return{
                titulo: `Revisão Necessária para : ${metricaAlerta.nome}`,
                texto: `Métrica está em nível ${metricaAlerta.risco}. Consulte seu médico.`,
                tipo: metricaAlerta.risco
            };
    }
};

const recomendacao = getRecomendacao();

  return (
  <>
    <div className='dashboard-container'>
        <header className='dashboard-header'>
            <h1>Painel de Acompanhamento de Saúde</h1>
            <p> Métricas vitais para o seu acompanhamento e prevenção de riscos.</p>
        </header>
        <button className='btn-return' onClick={handleLp}>Voltar para Página Inicial</button>

        <section className={`recomendacao ${getRiskClassName(recomendacao.tipo)}`}>
            <h2>{recomendacao.titulo}</h2>
            <p dangerouslySetInnerHTML={{ __html: recomendacao.texto }}></p>
        </section>

        <section className='metrics-list'>
            {metricas.map((metrica, index) => (
                <div key={index} className='metric-card'>
                    <h3>{metrica.nome}</h3>
                    <p className='metric-value'>{metrica.valor}</p>
                    <p className={`metric-risk ${getRiskClassName(metrica.risco)}`}>
                        Risco: {metrica.risco}</p>
                </div>
            ))} 
        </section>
    </div>
  </>
  );
}
