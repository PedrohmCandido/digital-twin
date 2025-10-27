import express from "express";
import cors from "cors";
import patientsRouter from "./routers/patients.js";
import devicesRouter from "./routers/devices.js";
import vitalsRouter from "./routers/vitals.js";
import simulationsRouter from "./routers/simulations.js";
import { swaggerUi, specs } from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => res.send("API is running..."));

// Rotas
app.use("/patients", patientsRouter);
app.use("/devices", devicesRouter);
app.use("/vitals", vitalsRouter);
app.use("/simulations", simulationsRouter);

// Rota do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
