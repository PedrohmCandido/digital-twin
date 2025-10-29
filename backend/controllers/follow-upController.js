import FollowUp from "../models/Follow-up.js";

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
