import { Router } from 'express';
import { uploadSeedFile, runDefaultSeedController } from '../controllers/seed.controller';
import { upload } from '../seeders/readSeed';
import { authToken } from '../middlewares/authToken';
import requireRole from '../middlewares/requireRole';

const router = Router();

/**
 * @swagger
 * /api/seed/upload:
 *   post:
 *     summary: Cargar archivo de seed (solo admin)
 *     tags: [Seed]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo JSON con datos de seed
 *     responses:
 *       200:
 *         description: Seed cargado exitosamente
 *       400:
 *         description: Archivo no proporcionado o inválido
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/upload', authToken, requireRole("admin"), upload.single('file'), uploadSeedFile);

/**
 * @swagger
 * /api/seed/run-default:
 *   post:
 *     summary: Ejecutar seed por defecto (solo admin)
 *     tags: [Seed]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Seed ejecutado exitosamente o ya fue ejecutado previamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/run-default', authToken, requireRole("admin"), runDefaultSeedController);

export default router;
