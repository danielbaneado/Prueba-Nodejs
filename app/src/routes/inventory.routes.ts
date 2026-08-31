import { Router } from 'express';
import {
  getAllInventories,
  getInventoryById,
  getInventoriesByWarehouse,
  getInventoriesByMedication,
  createInventory,
  updateInventory,
  deleteInventory,
} from '../controllers/inventory.controller';
import { authToken } from '../middlewares/authToken';
import requireRole from '../middlewares/requireRole';

const router = Router();

/**
 * @swagger
 * /api/inventories:
 *   get:
 *     summary: Obtener todos los registros de inventario
 *     tags: [Inventory]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de inventarios obtenida exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authToken, requireRole('admin'), getAllInventories);

/**
 * @swagger
 * /api/inventories/{id}:
 *   get:
 *     summary: Obtener un registro de inventario por ID
 *     tags: [Inventory]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de inventario
 *     responses:
 *       200:
 *         description: Registro de inventario encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Registro de inventario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', authToken, requireRole('admin'), getInventoryById);

/**
 * @swagger
 * /api/inventories/warehouse/{warehouseId}:
 *   get:
 *     summary: Obtener inventario por almacén
 *     tags: [Inventory]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del almacén
 *     responses:
 *       200:
 *         description: Inventario del almacén obtenido exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/warehouse/:warehouseId', authToken, requireRole('admin'), getInventoriesByWarehouse);

/**
 * @swagger
 * /api/inventories/medication/{medicationId}:
 *   get:
 *     summary: Obtener inventario por medicamento
 *     tags: [Inventory]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: medicationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medicamento
 *     responses:
 *       200:
 *         description: Inventario del medicamento obtenido exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/medication/:medicationId', authToken, requireRole('admin'), getInventoriesByMedication);

/**
 * @swagger
 * /api/inventories:
 *   post:
 *     summary: Crear un nuevo registro de inventario
 *     tags: [Inventory]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - warehouseId
 *               - medicationId
 *               - stock
 *               - minStock
 *               - status
 *             properties:
 *               warehouseId:
 *                 type: integer
 *               medicationId:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               minStock:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Registro de inventario creado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Almacén o medicamento no encontrado
 *       409:
 *         description: Ya existe un registro de inventario para este medicamento en este almacén
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authToken, requireRole('admin'), createInventory);

/**
 * @swagger
 * /api/inventories/{id}:
 *   put:
 *     summary: Actualizar un registro de inventario
 *     tags: [Inventory]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de inventario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: integer
 *               minStock:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Registro de inventario actualizado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Registro de inventario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', authToken, requireRole('admin'), updateInventory);

/**
 * @swagger
 * /api/inventories/{id}:
 *   delete:
 *     summary: Eliminar un registro de inventario
 *     tags: [Inventory]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de inventario
 *     responses:
 *       200:
 *         description: Registro de inventario eliminado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Registro de inventario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', authToken, requireRole('admin'), deleteInventory);

export default router;
