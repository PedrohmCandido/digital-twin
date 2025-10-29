import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  nome_dispositivo: { type: String, required: true },
  tipo_dispositivo: { type: String, required: true },
  status: { type: String, default: "ativo" },
  fk_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
});

const Device = mongoose.model("Device", deviceSchema);

export default Device;

