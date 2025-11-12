import { useEffect, useMemo, useState } from "react";
import getFollowUp from "../../../services/followUp";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import { Activity, HeartPulse, Heart, Percent } from "lucide-react";
import StatCard from "./StatCard.jsx";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

function avg(nums) {
  const a = nums.filter((n) => typeof n === "number" && !Number.isNaN(n));
  if (!a.length) return 0;
  return a.reduce((s, n) => s + n, 0) / a.length;
}

export default function ChartsFollowUp() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getFollowUp();
      setDados(Array.isArray(res) ? res : []);
    })();
  }, []);

  const {
    leituras,
    dispositivos,
    mediaFC,
    mediaSpO2,
    mediaVFC,
    barrasFCporDispositivo,
    pizzaEstresse,
  } = useMemo(() => {
    const leituras = dados.length;

    const devKey = (d) =>
      d.dispositivo_nome?.trim() ||
      (typeof d.fk_dispositivo === "string"
        ? d.fk_dispositivo.slice(-6)
        : String(d.fk_dispositivo || "").slice(-6) || "Desconhecido");

    const porDev = new Map();
    for (const d of dados) {
      const key = devKey(d);
      if (!porDev.has(key)) porDev.set(key, []);
      porDev.get(key).push(d);
    }

    const dispositivos = porDev.size;

    const mediaFC = avg(dados.map((d) => d.frequencia_cardiaca_bpm));
    const mediaSpO2 = avg(dados.map((d) => d.oxigenacao_spo2));
    const mediaVFC = avg(dados.map((d) => d.variabilidade_fc_ms));

    const barrasFCporDispositivo = Array.from(porDev.entries()).map(([name, arr]) => ({
      name,
      fc_media: avg(arr.map((x) => x.frequencia_cardiaca_bpm)),
    }));

    const contEstresse = {};
    for (const d of dados) {
      const k = d.nivel_estresse || "desconhecido";
      contEstresse[k] = (contEstresse[k] || 0) + 1;
    }
    const pizzaEstresse = Object.entries(contEstresse).map(([nivel, value]) => ({
      nivel,
      value,
    }));

    return {
      leituras,
      dispositivos,
      mediaFC,
      mediaSpO2,
      mediaVFC,
      barrasFCporDispositivo,
      pizzaEstresse,
    };
  }, [dados]);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={<Activity className="text-blue-500 w-6 h-6" />}
          title="Leituras"
          value={leituras}
          color="bg-blue-100"
        />
        <StatCard
          icon={<HeartPulse className="text-green-500 w-6 h-6" />}
          title="Dispositivos"
          value={dispositivos}
          color="bg-green-100"
        />
        <StatCard
          icon={<Heart className="text-pink-500 w-6 h-6" />}
          title="FC média (bpm)"
          value={mediaFC ? mediaFC.toFixed(0) : 0}
          color="bg-pink-100"
        />
        <StatCard
          icon={<Percent className="text-yellow-500 w-6 h-6" />}
          title="SpO₂ média (%)"
          value={mediaSpO2 ? mediaSpO2.toFixed(1) : 0}
          color="bg-yellow-100"
        />
        <StatCard
          icon={<Activity className="text-pink-500 w-6 h-6" />}
          title="VFC média (ms)"
          value={mediaVFC ? mediaVFC.toFixed(0) : 0}
          color="bg-gray-200"
        />
      </div>

      <div className="flex flex-1 gap-6 mt-2">
        <div className="flex-1 bg-white shadow-md rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            FC média por dispositivo (bpm)
          </h2>
          <div className="flex-1">
            {barrasFCporDispositivo.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barrasFCporDispositivo}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="fc_media" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400 mt-10">Nenhum dado disponível</p>
            )}
          </div>
        </div>

        <div className="flex-1 bg-white shadow-md rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Distribuição de níveis de estresse
          </h2>
          <div className="flex-1 flex justify-center items-center">
            {pizzaEstresse.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pizzaEstresse}
                    dataKey="value"
                    nameKey="nivel"
                    outerRadius="80%"
                    label
                  >
                    {pizzaEstresse.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400">Nenhum dado disponível</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
