import mongoose from "mongoose";

const acompanhamentoSchema = new mongoose.Schema({
    fk_dispositivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dispositivo",
        required: true,
    },
    frequencia_cardiaca_bpm: Number,
    variabilidade_fc_ms: Number,
    ritmo_cardiaco: String,
    oxigenacao_spo2: Number,
    calorias_queimadas_kcal: Number,
    nivel_estresse: String,
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("FollowUp", acompanhamentoSchema);
