import { useEffect, useMemo, useState } from "react";
import getFollowUpByUser from "../../../services/followUp";
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
  LineChart,
  Line,
} from "recharts";
import { Activity, HeartPulse, Heart, Percent } from "lucide-react";
import StatCard from "./StatCard.jsx";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

function avg(nums) {
  const a = nums.filter((n) => typeof n === "number" && !Number.isNaN(n));
  if (!a.length) return 0;
  return a.reduce((s, n) => s + n, 0) / a.length;
}

export default function ChartsFollowUp() {
  const [dados, setDados] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(
    "691555099058ad63ab0e6516"
  );
  const [selectedDeviceId, setSelectedDeviceId] = useState("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        setCurrentUserId(u._id || u.id || null);
      }
    } catch {
      setCurrentUserId(null);
    }
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    (async () => {
      const res = await getFollowUpByUser(currentUserId);

      if (res && Array.isArray(res.followUps)) {
        setDados(res.followUps);
      } else if (Array.isArray(res)) {
        setDados(res);
      } else {
        setDados([]);
      }
    })();
  }, [currentUserId]);

  const deviceOptions = useMemo(() => {
    const map = new Map();
    for (const d of dados) {
      const id = String(d.fk_dispositivo || "");
      if (!id) continue;
      const label = d.dispositivo_nome?.trim() || id.slice(-6) || "Dispositivo";
      if (!map.has(id)) map.set(id, label);
    }
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [dados]);

  const {
    leituras,
    dispositivos,
    mediaFC,
    mediaSpO2,
    mediaVFC,
    barrasFCporDispositivo,
    pizzaEstresse,
    barrasCaloriasPorDispositivo,
    linhasPorTempo,
  } = useMemo(() => {
    let base = dados;

    if (selectedDeviceId !== "all") {
      base = base.filter(
        (d) => String(d.fk_dispositivo) === String(selectedDeviceId)
      );
    }

    const leituras = base.length;

    const devKey = (d) =>
      d.dispositivo_nome?.trim() ||
      (typeof d.fk_dispositivo === "string"
        ? d.fk_dispositivo.slice(-6)
        : String(d.fk_dispositivo || "").slice(-6) || "Desconhecido");

    const porDev = new Map();
    for (const d of base) {
      const key = devKey(d);
      if (!porDev.has(key)) porDev.set(key, []);
      porDev.get(key).push(d);
    }

    const dispositivos = porDev.size;

    const mediaFC = avg(base.map((d) => d.frequencia_cardiaca_bpm));
    const mediaSpO2 = avg(base.map((d) => d.oxigenacao_spo2));
    const mediaVFC = avg(base.map((d) => d.variabilidade_fc_ms));

    const barrasFCporDispositivo = Array.from(porDev.entries()).map(
      ([name, arr]) => ({
        name,
        fc_media: avg(arr.map((x) => x.frequencia_cardiaca_bpm)),
      })
    );

    const barrasCaloriasPorDispositivo = Array.from(porDev.entries()).map(
      ([name, arr]) => ({
        name,
        calorias_media: avg(arr.map((x) => x.calorias_queimadas_kcal)),
      })
    );

    const contEstresse = {};
    for (const d of base) {
      const k = d.nivel_estresse || "desconhecido";
      contEstresse[k] = (contEstresse[k] || 0) + 1;
    }
    const pizzaEstresse = Object.entries(contEstresse).map(
      ([nivel, value]) => ({
        nivel,
        value,
      })
    );

    const linhasPorTempo = base
      .filter((d) => d.timestamp)
      .map((d) => {
        const date = new Date(d.timestamp);
        return {
          ts: date.getTime(),
          time: date.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          fc: d.frequencia_cardiaca_bpm,
          spo2: d.oxigenacao_spo2,
        };
      })
      .sort((a, b) => a.ts - b.ts);

    return {
      leituras,
      dispositivos,
      mediaFC,
      mediaSpO2,
      mediaVFC,
      barrasFCporDispositivo,
      pizzaEstresse,
      barrasCaloriasPorDispositivo,
      linhasPorTempo,
    };
  }, [dados, selectedDeviceId]);

  return (
    <div className="flex flex-col h-full gap-6 flex-wrap">
      {/* Filtro por dispositivo */}
      <div className="flex justify-end mb-2">
        <select
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          className="border rounded-lg px-3 py-1 text-sm text-gray-700"
        >
          <option value="all">Todos os dispositivos</option>
          {deviceOptions.map((dev) => (
            <option key={dev.id} value={dev.id}>
              {dev.label}
            </option>
          ))}
        </select>
      </div>

      {/* Cards de estatísticas */}
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

      {/* Gráficos */}
      <div className=" flex-1 gap-6 mt-2 flex-wrap grid grid-cols-1 sm:grid-cols-2">
        {/* FC por dispositivo */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-6 flex flex-col mt-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            FC média (bpm)
          </h2>
          <div className="h-72">
            {barrasFCporDispositivo.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barrasFCporDispositivo}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="fc_media"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400 mt-10">
                Nenhum dado disponível
              </p>
            )}
          </div>
        </div>

        {/* Estresse */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-6 flex flex-col mt-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Distribuição de níveis de estresse
          </h2>
          <div className="h-72 justify-center items-center">
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
              <p className="text-center text-gray-400">
                Nenhum dado disponível
              </p>
            )}
          </div>
        </div>

        {/* Calorias por dispositivo */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-6 flex flex-col mt-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Calorias queimadas médias por dispositivo (kcal)
          </h2>
          <div className="h-72">
            {barrasCaloriasPorDispositivo.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barrasCaloriasPorDispositivo}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="calorias_media"
                    fill="#f97316"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400 mt-10">
                Nenhum dado disponível
              </p>
            )}
          </div>
        </div>

        {/* LINE CHART TEMPORAL */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-6 flex flex-col mt-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Evolução de FC e SpO₂ ao longo do tempo
          </h2>
          <div className="h-72">
            {linhasPorTempo.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={linhasPorTempo}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis
                    yAxisId="left"
                    label={{
                      value: "FC (bpm)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "SpO₂ (%)",
                      angle: 90,
                      position: "insideRight",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="fc"
                    stroke="#ef4444"
                    dot={false}
                    strokeWidth={2}
                    name="FC (bpm)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="spo2"
                    stroke="#3b82f6"
                    dot={false}
                    strokeWidth={2}
                    name="SpO₂ (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400 mt-10">
                Nenhum dado disponível
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
