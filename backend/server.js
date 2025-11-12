import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import patientsRouter from "./routers/patients.js";
import devicesRouter from "./routers/devices.js";
import folloUpRouter from "./routers/follow-up.js";
import { swaggerUi, swaggerSpec } from "./swagger/swaggerConfig.js";
import { connectDB } from "./db/db.js";
import aiRouter from "./routers/aiRouter.js";
import auth from "./routers/auth.js";


connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => res.send("API is running..."));

// Swagger Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/auth", auth)
app.use("/patients", patientsRouter);
app.use("/devices", devicesRouter);
app.use("/follow-up", folloUpRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
