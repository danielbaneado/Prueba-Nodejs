import { Router } from 'express';

import {
  getUsers,
  login,
  logout,
  refresh,
  updateUser,
} from '../controllers/user.controller';
import { authToken } from '../middlewares/authToken';
import requireRole from '../middlewares/requireRole';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios (solo admin)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (requiere rol admin)
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authToken, requireRole('admin'), getUsers);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión con JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: danielalzate076@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin123!
 *     responses:
 *       201:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', login);

/**
 * @swagger
 * /api/users/refresh:
 *   post:
 *     summary: Refrescar el token y darle uno nuevo al usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nuevo accessToken generado
 *       401:
 *         description: Refresh token inválido, expirado o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/refresh', refresh);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Cierra la sesión, eliminando la cookie del accessToken
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */
router.post('/logout', logout);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar los datos de un usuario existente
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               documentType:
 *                 type: string
 *               documentNumber:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Datos inválidos o sin campos para actualizar
 *       401:
 *         description: Usuario sin token/ token inválido
 *       403:
 *         description: No autorizado para modificar este usuario
 *       404:
 *         description: Usuario no encontrado
 *       409:
 *         description: El correo ya está en uso por otro usuario
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', authToken, updateUser)

export default router;
