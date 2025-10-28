import express from "express";
import cors from "cors";
import patientsRouter from "./routers/patients.js";
import devicesRouter from "./routers/devices.js";
import { swaggerUi, swaggerSpec } from "./swagger/swaggerConfig.js"; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => res.send("API is running..."));

// Swagger Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 

// Rotas
app.use("/patients", patientsRouter);
app.use("/devices", devicesRouter);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
