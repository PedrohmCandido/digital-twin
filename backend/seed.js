import mongoose from "mongoose";
import dotenv from "dotenv";
import Patient from "./models/Patient.js";
import Device from "./models/Device.js";
import FollowUp from "./models/Follow-up.js";
import User from "./models/user.js";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://kaiki_user_db:asrsybuNQWGMB4gP@db-digital-twin.ljpgrct.mongodb.net/digital_twin?appName=db-digital-twin";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB");

    // Limpar coleções
    await Promise.all([
      Patient.deleteMany(),
      Device.deleteMany(),
      FollowUp.deleteMany(),
      User.deleteMany(),
    ]);
    console.log("🧹 Coleções limpas");

    const plainPassword = "1234"; 
    const hashedPassword = await bcrypt.hash(plainPassword, 10)

    const user = await User.create({
      name: "Kaiki",
      email: "kaiki@exemplo.com",
      password: hashedPassword,
    });

    console.log("👤 Usuário criado:", user.email);

    const patient = await Patient.create({
      fk_user: user._id,
      name: "Kaiki Silva",
      email: "kaiki@exemplo.com",
      phone: "(11) 98765-4321",
      address: "Rua das Flores, 123 - São Paulo",
      gender: "Masculino",
      birthdate: new Date("1990-05-10"),
      illnesses: ["Hipertensão", "Ansiedade"],
    });

    console.log("🧍 Paciente criado:", patient.name);

    const device = await Device.create({
      nome_dispositivo: "Smartwatch Galaxy Fit",
      tipo_dispositivo: "Smartwatch",
      fk_usuario: patient._id,
    });

    console.log("⌚ Dispositivo criado:", device.nome_dispositivo);

    const baseDate = new Date();
    baseDate.setHours(10, 0, 0, 0);

    const followUpsData = [
      {
        frequencia_cardiaca_bpm: 72,
        variabilidade_fc_ms: 55,
        ritmo_cardiaco: "Normal",
        oxigenacao_spo2: 98,
        calorias_queimadas_kcal: 200,
        nivel_estresse: "Baixo",
      },
      {
        frequencia_cardiaca_bpm: 78,
        variabilidade_fc_ms: 50,
        ritmo_cardiaco: "Normal",
        oxigenacao_spo2: 97,
        calorias_queimadas_kcal: 250,
        nivel_estresse: "Médio",
      },
      {
        frequencia_cardiaca_bpm: 85,
        variabilidade_fc_ms: 45,
        ritmo_cardiaco: "Acelerado",
        oxigenacao_spo2: 96,
        calorias_queimadas_kcal: 300,
        nivel_estresse: "Médio",
      },
      {
        frequencia_cardiaca_bpm: 90,
        variabilidade_fc_ms: 40,
        ritmo_cardiaco: "Acelerado",
        oxigenacao_spo2: 95,
        calorias_queimadas_kcal: 350,
        nivel_estresse: "Alto",
      },
      {
        frequencia_cardiaca_bpm: 76,
        variabilidade_fc_ms: 52,
        ritmo_cardiaco: "Normal",
        oxigenacao_spo2: 98,
        calorias_queimadas_kcal: 220,
        nivel_estresse: "Baixo",
      },
    ].map((item, index) => ({
      fk_dispositivo: device._id,
      ...item,
      timestamp: new Date(baseDate.getTime() - index * 24 * 60 * 60 * 1000),
    }));

    const followUps = await FollowUp.insertMany(followUpsData);

    console.log("📊 Acompanhamentos criados:", followUps.length);

    console.log("✅ SEED finalizado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao fazer seed:", error);
    process.exit(1);
  }
};

seed();
