import mongoose from "mongoose";

const MONGO_URI = process.env.BANCO_MONGO;

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://kaiki_user_db:asrsybuNQWGMB4gP@db-digital-twin.ljpgrct.mongodb.net/digital_twin?appName=db-digital-twin");
        console.log("✅ MongoDB conectado com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar no MongoDB:", error);
        process.exit(1);
    }
};
