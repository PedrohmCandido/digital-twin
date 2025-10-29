import express from "express";
import {
    getAllAcompanhamentos,
    createAcompanhamento,
    updateAcompanhamento,
    deleteAcompanhamento,
} from "../controllers/follow-upController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Acompanhamento:
 *       type: object
 *       required:
 *         - fk_dispositivo
 *       properties:
 *         id:
 *           type: string
 *           description: ID gerado automaticamente
 *           example: 67201134e4a5a92d02b99a41
 *         fk_dispositivo:
 *           type: string
 *           description: ID do dispositivo relacionado
 *           example: 671ff49ee8f8a41c53f283c0
 *         frequencia_cardiaca_bpm:
 *           type: number
 *           example: 82
 *         variabilidade_fc_ms:
 *           type: number
 *           example: 45
 *         ritmo_cardiaco:
 *           type: string
 *           example: "Normal"
 *         oxigenacao_spo2:
 *           type: number
 *           example: 97
 *         calorias_queimadas_kcal:
 *           type: number
 *           example: 120
 *         nivel_estresse:
 *           type: string
 *           example: "Baixo"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2025-10-28T20:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Acompanhamentos
 *   description: Rotas para gerenciar dados de acompanhamento de dispositivos
 */

/**
 * @swagger
 * /acompanhamentos:
 *   get:
 *     summary: Retorna todos os acompanhamentos
 *     tags: [Acompanhamentos]
 *     responses:
 *       200:
 *         description: Lista de acompanhamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Acompanhamento'
 *
 *   post:
 *     summary: Cria um novo acompanhamento
 *     tags: [Acompanhamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Acompanhamento'
 *     responses:
 *       201:
 *         description: Acompanhamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Acompanhamento'
 */

/**
 * @swagger
 * /acompanhamentos/dispositivo/{id}:
 *   get:
 *     summary: Retorna acompanhamentos de um dispositivo específico
 *     tags: [Acompanhamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do dispositivo
 *     responses:
 *       200:
 *         description: Lista de acompanhamentos do dispositivo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Acompanhamento'
 */

/**
 * @swagger
 * /acompanhamentos/{id}:
 *   put:
 *     summary: Atualiza um acompanhamento existente
 *     tags: [Acompanhamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do acompanhamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Acompanhamento'
 *     responses:
 *       200:
 *         description: Acompanhamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Acompanhamento'
 *
 *   delete:
 *     summary: Deleta um acompanhamento existente
 *     tags: [Acompanhamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do acompanhamento
 *     responses:
 *       204:
 *         description: Acompanhamento deletado com sucesso
 */

router.get("/", getAllAcompanhamentos);
router.post("/", createAcompanhamento);
router.put("/:id", updateAcompanhamento);
router.delete("/:id", deleteAcompanhamento);

export default router;
