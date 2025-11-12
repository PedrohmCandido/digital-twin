import mongoose from "mongoose";
import dotenv from "dotenv";
import Patient from "./models/Patient.js";
import Device from "./models/Device.js";
import FollowUp from "./models/Follow-up.js";
import User from "./models/user.js";

dotenv.config();

const MONGO_URI = "mongodb+srv://kaiki_user_db:asrsybuNQWGMB4gP@db-digital-twin.ljpgrct.mongodb.net/digital_twin?appName=db-digital-twin";

const clear = async () => {
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
    }
    catch (error) {
        console.error("❌ Erro ao conectar no MongoDB:", error);
        process.exit(1);
    }
}

clear();