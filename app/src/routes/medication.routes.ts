import { Router } from 'express';
import {
  getAllMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
} from '../controllers/medication.controller';
import { authToken } from '../middlewares/authToken';
import requireRole from '../middlewares/requireRole';

const router = Router();

/**
 * @swagger
 * /api/medications:
 *   get:
 *     summary: Obtener todos los medicamentos
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de medicamentos obtenida exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authToken, requireRole('admin', 'gestor de solicitudes'), getAllMedications);

/**
 * @swagger
 * /api/medications/{id}:
 *   get:
 *     summary: Obtener un medicamento por ID
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medicamento
 *     responses:
 *       200:
 *         description: Medicamento encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Medicamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', authToken, requireRole('admin', 'gestor de solicitudes'), getMedicationById);

/**
 * @swagger
 * /api/medications:
 *   post:
 *     summary: Crear un nuevo medicamento
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - unit
 *               - category
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               unit:
 *                 type: string
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Medicamento creado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authToken, requireRole('admin', 'gestor de solicitudes'), createMedication);

/**
 * @swagger
 * /api/medications/{id}:
 *   put:
 *     summary: Actualizar un medicamento
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medicamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               unit:
 *                 type: string
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Medicamento actualizado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Medicamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', authToken, requireRole('admin', 'gestor de solicitudes'), updateMedication);

/**
 * @swagger
 * /api/medications/{id}:
 *   delete:
 *     summary: Eliminar un medicamento
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medicamento
 *     responses:
 *       200:
 *         description: Medicamento eliminado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Medicamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', authToken, requireRole('admin'), deleteMedication);

export default router;
