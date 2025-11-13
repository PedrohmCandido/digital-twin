import express from "express";
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Rotas de gerenciamento de pacientes
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */
router.get("/", getAllPatients);

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 */
router.post("/", createPatient);

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Atualiza um paciente pelo ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 */
router.put("/:id", updatePatient);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Remove um paciente pelo ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do paciente
 *     responses:
 *       204:
 *         description: Paciente removido com sucesso
 */
router.delete("/:id", deletePatient);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - name
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do paciente
 *         name:
 *           type: string
 *           description: Nome do paciente
 *         age:
 *           type: integer
 *           description: Idade do paciente
 */
