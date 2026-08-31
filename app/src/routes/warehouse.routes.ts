import { Router } from 'express';
import {
  getAllWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from '../controllers/warehouse.controller';
import { authToken } from '../middlewares/authToken';
import requireRole from '../middlewares/requireRole';

const router = Router();

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Obtener todos los almacenes
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de almacenes obtenida exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authToken, requireRole('admin'), getAllWarehouses);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     summary: Obtener un almacén por ID
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del almacén
 *     responses:
 *       200:
 *         description: Almacén encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Almacén no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', authToken, requireRole('admin'), getWarehouseById);

/**
 * @swagger
 * /api/warehouses:
 *   post:
 *     summary: Crear un nuevo almacén
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *               - email
 *               - managerId
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               managerId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Almacén creado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario gestor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authToken, requireRole('admin'), createWarehouse);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   put:
 *     summary: Actualizar un almacén
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del almacén
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               managerId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Almacén actualizado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Almacén o usuario gestor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', authToken, requireRole('admin'), updateWarehouse);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   delete:
 *     summary: Eliminar un almacén
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del almacén
 *     responses:
 *       200:
 *         description: Almacén eliminado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Almacén no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', authToken, requireRole('admin'), deleteWarehouse);

export default router;
