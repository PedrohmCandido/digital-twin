import Patient from "../models/Patient.js";

// GET /patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /patients
export const createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE /patients/:id
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /patients/:id
export const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
