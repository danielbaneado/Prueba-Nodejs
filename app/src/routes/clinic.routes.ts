import { Router } from 'express';
import {
  getAllClinics,
  getClinicById,
  getClinicByNIT,
  createClinic,
  updateClinic,
  deleteClinic,
} from '../controllers/clinic.controller';
import { authToken } from '../middlewares/authToken';
import requireRole from '../middlewares/requireRole';
import validateClinic from '../middlewares/validateClinic';

const router = Router();

/**
 * @swagger
 * /api/clinics:
 *   get:
 *     summary: Obtener todas las clínicas
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de clínicas obtenida exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authToken, requireRole('admin', 'gestor de solicitudes'), getAllClinics);

/**
 * @swagger
 * /api/clinics/NIT/{NIT}:
 *   get:
 *     summary: Obtener una clínica por NIT
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: NIT
 *         required: true
 *         schema:
 *           type: string
 *         description: NIT de la clínica
 *     responses:
 *       200:
 *         description: Clínica encontrada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Clínica no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/NIT/:NIT', authToken, requireRole('admin', 'gestor de solicitudes'), getClinicByNIT);

/**
 * @swagger
 * /api/clinics/{id}:
 *   get:
 *     summary: Obtener una clínica por ID
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clínica
 *     responses:
 *       200:
 *         description: Clínica encontrada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Clínica no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', authToken, requireRole('admin', 'gestor de solicitudes'), getClinicById);

/**
 * @swagger
 * /api/clinics:
 *   post:
 *     summary: Crear una nueva clínica
 *     tags: [Clinics]
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
 *               - NIT
 *               - address
 *               - phone
 *               - email
 *               - responsibleUserId
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               NIT:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               responsibleUserId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Clínica creada exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario responsable no encontrado
 *       409:
 *         description: Ya existe una clínica con este NIT
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authToken, requireRole('admin'), validateClinic, createClinic);

/**
 * @swagger
 * /api/clinics/{id}:
 *   put:
 *     summary: Actualizar una clínica
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clínica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               NIT:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               responsibleUserId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Clínica actualizada exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Clínica o usuario responsable no encontrado
 *       409:
 *         description: Ya existe una clínica con este NIT
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', authToken, requireRole('admin'), updateClinic);

/**
 * @swagger
 * /api/clinics/{id}:
 *   delete:
 *     summary: Eliminar una clínica
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clínica
 *     responses:
 *       200:
 *         description: Clínica eliminada exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Clínica no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', authToken, requireRole('admin'), deleteClinic);

export default router;
