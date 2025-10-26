import fs from "fs";
import path from "path";
import Patient from "../models/Patient.js";

const dbPath = path.resolve("db/db.json");

function loadDB() {
  const rawData = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(rawData);
}

function saveDB(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

export const getAllPatients = (req, res) => {
  const db = loadDB();
  res.json(db.patients || []);
};

export const createPatient = (req, res) => {
  const db = loadDB();
  const patients = db.patients || [];

  const newPatient = new Patient({ id: patients.length + 1, ...req.body });
  patients.push(newPatient);
  db.patients = patients;
  saveDB(db);

  res.status(201).json(newPatient);
};

export const updatePatient = (req, res) => {
  const db = loadDB();
  const patients = db.patients || [];
  const id = parseInt(req.params.id);

  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Patient not found" });

  patients[index] = new Patient({ ...patients[index], ...req.body });
  db.patients = patients;
  saveDB(db);

  res.json(patients[index]);
};

export const deletePatient = (req, res) => {
  const db = loadDB();
  let patients = db.patients || [];
  const id = parseInt(req.params.id);

  const beforeCount = patients.length;
  patients = patients.filter((p) => p.id !== id);

  if (patients.length === beforeCount) {
    return res.status(404).json({ error: "Patient not found" });
  }

  db.patients = patients;
  saveDB(db);
  res.status(204).send();
};
