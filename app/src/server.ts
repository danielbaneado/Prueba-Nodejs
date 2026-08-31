import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { corsOptions } from './config/cors';
import { swaggerSpec } from './docs/swagger';
import { requestLogger } from './middlewares/requestLogger';
import { centralizedErrorHandler } from './error/centralizedErrorHandler';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import clinicRoutes from './routes/clinic.routes';
import warehouseRoutes from './routes/warehouse.routes';
import medicationRoutes from './routes/medication.routes';
import inventoryRoutes from './routes/inventory.routes';
import v1Routes from './routes/v1.routes';

const app = express();

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/api/test', (_req, res) => {
  res.status(200).json({ message: 'Servidor funcionando correctamente!' });
});

app.use('/api/v1', v1Routes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/inventories', inventoryRoutes);

// Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Centralized error handling middleware (must be after all routes, setted at bottom)
app.use(centralizedErrorHandler);

export default app;
