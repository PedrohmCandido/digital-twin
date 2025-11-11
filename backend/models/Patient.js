import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  fk_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  gender: { type: String, required: true },
  birthdate: { type: Date, required: true },
  illnesses: { type: [String], default: [] },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;

