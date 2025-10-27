import fs from "fs";
import path from "path";
import Simulation from "../models/Simulation.js";

const dbPath = path.resolve("db/db.json");

function loadDB() {
  const rawData = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(rawData);
}

function saveDB(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

export const getAllSimulations = (req, res) => {
  const db = loadDB();
  res.json(db.simulations || []);
};

export const createSimulation = (req, res) => {
  const db = loadDB();
  const simulations = db.simulations || [];

  const newSimulation = new Simulation({ id: simulations.length + 1, ...req.body });
  simulations.push(newSimulation);
  db.simulations = simulations;
  saveDB(db);

  res.status(201).json(newSimulation);
};

export const updateSimulation = (req, res) => {
  const db = loadDB();
  const simulations = db.simulations || [];
  const id = parseInt(req.params.id);

  const index = simulations.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Simulation not found" });

  simulations[index] = new Simulation({ ...simulations[index], ...req.body });
  db.simulations = simulations;
  saveDB(db);

  res.json(simulations[index]);
};

export const deleteSimulation = (req, res) => {
  const db = loadDB();
  let simulations = db.simulations || [];
  const id = parseInt(req.params.id);

  const beforeCount = simulations.length;
  simulations = simulations.filter((s) => s.id !== id);

  if (simulations.length === beforeCount) {
    return res.status(404).json({ error: "Simulation not found" });
  }

  db.simulations = simulations;
  saveDB(db);
  res.status(204).send();
};
