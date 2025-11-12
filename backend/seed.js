import mongoose from "mongoose";
import dotenv from "dotenv";
import Patient from "./models/Patient.js";
import Device from "./models/Device.js";
import FollowUp from "./models/Follow-up.js";

dotenv.config();

const MONGO_URI = "mongodb+srv://kaiki_user_db:asrsybuNQWGMB4gP@db-digital-twin.ljpgrct.mongodb.net/digital_twin?appName=db-digital-twin";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB");

    // Limpar 
    await Promise.all([
      Patient.deleteMany(),
      Device.deleteMany(),
      FollowUp.deleteMany(),
      User.deleteMany()
    ]);
    console.log("🧹 Coleções limpas");

    //  pacientes
    const patients = await Patient.insertMany([
      {
        name: "João Silva",
        email: "joao.silva@example.com",
        phone: "(11) 98765-4321",
        address: "Rua das Flores, 123 - São Paulo",
        gender: "Masculino",
        birthdate: new Date("1990-05-10"),
        illnesses: ["Hipertensão", "Ansiedade"],
      },
      {
        name: "Maria Oliveira",
        email: "maria.oliveira@example.com",
        phone: "(21) 91234-5678",
        address: "Av. Atlântica, 456 - Rio de Janeiro",
        gender: "Feminino",
        birthdate: new Date("1985-08-22"),
        illnesses: ["Diabetes tipo 2"],
      },
      {
        name: "Carlos Pereira",
        email: "carlos.pereira@example.com",
        phone: "(31) 99876-5432",
        address: "Rua Minas Gerais, 789 - Belo Horizonte",
        gender: "Masculino",
        birthdate: new Date("1978-03-15"),
        illnesses: ["Asma"],
      },
    ]);
    console.log("👤 Pacientes criados:", patients.length);

    //  dispositivos
    const devices = await Device.insertMany([
      {
        nome_dispositivo: "Smartwatch Galaxy Fit",
        tipo_dispositivo: "Smartwatch",
        fk_usuario: patients[0]._id,
      },
      {
        nome_dispositivo: "Apple Watch Series 8",
        tipo_dispositivo: "Smartwatch",
        fk_usuario: patients[1]._id,
      },
      {
        nome_dispositivo: "Mi Band 7",
        tipo_dispositivo: "Pulseira Fitness",
        fk_usuario: patients[2]._id,
      },
      {
        nome_dispositivo: "Garmin Forerunner",
        tipo_dispositivo: "Smartwatch Esportivo",
        fk_usuario: patients[0]._id,
      },
    ]);
    console.log("⌚ Dispositivos criados:", devices.length);

    //  acompanhamentos
    const followUps = await FollowUp.insertMany([
      {
        fk_dispositivo: devices[0]._id,
        frequencia_cardiaca_bpm: 78,
        variabilidade_fc_ms: 52,
        ritmo_cardiaco: "Normal",
        oxigenacao_spo2: 97,
        calorias_queimadas_kcal: 210,
        nivel_estresse: "Baixo",
        timestamp: new Date(),
      },
      {
        fk_dispositivo: devices[1]._id,
        frequencia_cardiaca_bpm: 92,
        variabilidade_fc_ms: 40,
        ritmo_cardiaco: "Irregular",
        oxigenacao_spo2: 95,
        calorias_queimadas_kcal: 320,
        nivel_estresse: "Médio",
        timestamp: new Date(),
      },
      {
        fk_dispositivo: devices[2]._id,
        frequencia_cardiaca_bpm: 70,
        variabilidade_fc_ms: 60,
        ritmo_cardiaco: "Normal",
        oxigenacao_spo2: 99,
        calorias_queimadas_kcal: 180,
        nivel_estresse: "Baixo",
        timestamp: new Date(),
      },
      {
        fk_dispositivo: devices[3]._id,
        frequencia_cardiaca_bpm: 110,
        variabilidade_fc_ms: 35,
        ritmo_cardiaco: "Acelerado",
        oxigenacao_spo2: 94,
        calorias_queimadas_kcal: 500,
        nivel_estresse: "Alto",
        timestamp: new Date(),
      },
    ]);
    console.log("📊 Acompanhamentos criados:", followUps.length);

    console.log("✅ SEED finalizado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao fazer seed:", error);
    process.exit(1);
  }
};

seed();
