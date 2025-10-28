import express from "express";
import { getAllDevices, createDevice, updateDevice, deleteDevice } from "../controllers/deviceController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Rotas para gerenciamento de dispositivos
 */

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Retorna todos os dispositivos
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: Lista de dispositivos retornada com sucesso
 */
router.get("/", getAllDevices);

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Cria um novo dispositivo
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Sensor de temperatura
 *               status:
 *                 type: string
 *                 example: ativo
 *     responses:
 *       201:
 *         description: Dispositivo criado com sucesso
 */
router.post("/", createDevice);

/**
 * @swagger
 * /devices/{id}:
 *   put:
 *     summary: Atualiza um dispositivo existente
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do dispositivo
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Sensor de umidade
 *               status:
 *                 type: string
 *                 example: inativo
 *     responses:
 *       200:
 *         description: Dispositivo atualizado com sucesso
 */
router.put("/:id", updateDevice);

/**
 * @swagger
 * /devices/{id}:
 *   delete:
 *     summary: Remove um dispositivo pelo ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do dispositivo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dispositivo removido com sucesso
 */
router.delete("/:id", deleteDevice);

export default router;
