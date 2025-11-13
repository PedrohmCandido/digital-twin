import FollowUp from "../models/Follow-up.js";
import Device from "../models/Device.js";
import Patient from "../models/Patient.js";

// GET /acompanhamentos
export const getAllAcompanhamentos = async (req, res) => {
  try {
    const acompanhamentos = await FollowUp.find(); // sem populate
    res.status(200).json(acompanhamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /acompanhamentos
export const createAcompanhamento = async (req, res) => {
  try {
    const novo = new FollowUp(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE /acompanhamentos/:id
export const updateAcompanhamento = async (req, res) => {
  try {
    const atualizado = await FollowUp.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ error: "Acompanhamento não encontrado" });
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /acompanhamentos/:id
export const deleteAcompanhamento = async (req, res) => {
  try {
    const deletado = await FollowUp.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ error: "Acompanhamento não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getFollowUpsForLoggedUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log("userId recebido:", userId);

    if (!userId) {
      return res.status(400).json({ error: "userId é obrigatório na query" });
    }

    const patients = await Patient.find({ fk_user: userId }).select("_id");
    console.log("patients:", patients);

    const patientIds = patients.map((p) => p._id);

    const devices = await Device.find({
      fk_usuario: { $in: patientIds },
    }).select("_id nome_dispositivo");
    console.log("devices:", devices);

    const deviceIds = devices.map((d) => d._id);

    const followUps = await FollowUp.find({
      fk_dispositivo: { $in: deviceIds },
    }).populate("fk_dispositivo");
    console.log("followUps:", followUps.length);

    const formatted = followUps.map((f) => ({
      _id: f._id,
      fk_dispositivo: f.fk_dispositivo?._id,
      dispositivo_nome: f.fk_dispositivo?.nome_dispositivo,
      frequencia_cardiaca_bpm: f.frequencia_cardiaca_bpm,
      variabilidade_fc_ms: f.variabilidade_fc_ms,
      ritmo_cardiaco: f.ritmo_cardiaco,
      oxigenacao_spo2: f.oxigenacao_spo2,
      calorias_queimadas_kcal: f.calorias_queimadas_kcal,
      nivel_estresse: f.nivel_estresse,
      timestamp: f.timestamp,
    }));

    return res.json({
      devices: devices.map((d) => ({
        id: d._id,
        nome_dispositivo: d.nome_dispositivo,
      })),
      followUps: formatted,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar follow-ups" });
  }
};

