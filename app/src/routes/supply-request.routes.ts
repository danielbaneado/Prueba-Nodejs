import { Router } from 'express';
import {
  getAllSupplyRequests,
  getSupplyRequestById,
  getSupplyRequestsByClinic,
  getSupplyRequestsByWarehouse,
  getSupplyRequestsByStatus,
  createSupplyRequest,
  updateSupplyRequest,
  assignWarehouse,
  updateSupplyRequestStatus,
  deleteSupplyRequest,
} from '../controllers/supply-request.controller';
import { authToken } from '../middlewares/authToken';
import requireRole from '../middlewares/requireRole';

const router = Router();

/**
 * @swagger
 * /api/supply-requests:
 *   get:
 *     summary: Obtener todas las solicitudes de abastecimiento
 *     tags: [Supply Requests]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de solicitudes obtenida exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authToken, requireRole('admin'), getAllSupplyRequests);

/**
 * @swagger
 * /api/supply-requests/clinic/{clinicId}:
 *   get:
 *     summary: Obtener solicitudes por clínica (historial)
 *     tags: [Supply Requests]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clínica
 *     responses:
 *       200:
 *         description: Historial de solicitudes de la clínica
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/clinic/:clinicId', authToken, requireRole('admin'), getSupplyRequestsByClinic);

/**
 * @swagger
 * /api/supply-requests/warehouse/{warehouseId}:
 *   get:
 *     summary: Obtener solicitudes por almacén
 *     tags: [Supply Requests]
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
 *         description: Solicitudes del almacén obtenidas exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/warehouse/:warehouseId', authToken, requireRole('admin'), getSupplyRequestsByWarehouse);

/**
 * @swagger
 * /api/supply-requests/status/{status}:
 *   get:
 *     summary: Obtener solicitudes por estado
 *     tags: [Supply Requests]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, assigned, in_transit, delivered, cancelled]
 *         description: Estado de la solicitud
 *     responses:
 *       200:
 *         description: Solicitudes por estado obtenidas exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/status/:status', authToken, requireRole('admin'), getSupplyRequestsByStatus);

/**
 * @swagger
 * /api/supply-requests/{id}:
 *   get:
 *     summary: Obtener una solicitud por ID
 *     tags: [Supply Requests]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Solicitud encontrada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Solicitud no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', authToken, requireRole('admin'), getSupplyRequestById);

/**
 * @swagger
 * /api/supply-requests:
 *   post:
 *     summary: Crear una nueva solicitud de abastecimiento
 *     tags: [Supply Requests]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clinicId
 *               - medicationId
 *               - quantity
 *             properties:
 *               clinicId:
 *                 type: integer
 *               medicationId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Clínica o medicamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authToken, requireRole('admin'), createSupplyRequest);

/**
 * @swagger
 * /api/supply-requests/{id}:
 *   put:
 *     summary: Actualizar una solicitud de abastecimiento
 *     tags: [Supply Requests]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               warehouseId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [pending, assigned, in_transit, delivered, cancelled]
 *               notes:
 *                 type: string
 *               deliveryDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Solicitud actualizada exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Solicitud o almacén no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', authToken, requireRole('admin'), updateSupplyRequest);

/**
 * @swagger
 * /api/supply-requests/{id}/assign:
 *   post:
 *     summary: Asignar un almacén a una solicitud
 *     tags: [Supply Requests]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - warehouseId
 *             properties:
 *               warehouseId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Almacén asignado exitosamente
 *       400:
 *         description: Solo se pueden asignar almacenes a solicitudes pendientes
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Solicitud o almacén no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/:id/assign', authToken, requireRole('admin'), assignWarehouse);

/**
 * @swagger
 * /api/supply-requests/{id}/status:
 *   post:
 *     summary: Actualizar el estado de una solicitud
 *     tags: [Supply Requests]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, assigned, in_transit, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *       400:
 *         description: Estado no válido o stock insuficiente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Solicitud no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.post('/:id/status', authToken, requireRole('admin'), updateSupplyRequestStatus);

/**
 * @swagger
 * /api/supply-requests/{id}:
 *   delete:
 *     summary: Eliminar una solicitud de abastecimiento
 *     tags: [Supply Requests]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Solicitud eliminada exitosamente
 *       400:
 *         description: No se puede eliminar una solicitud entregada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Solicitud no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', authToken, requireRole('admin'), deleteSupplyRequest);

export default router;
