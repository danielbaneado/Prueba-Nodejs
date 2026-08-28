import dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';

// Cargar .env desde el directorio padre (Prueba-Nodejs/.env)
dotenv.config({ path: '../.env' });

// Validación de variables requeridas
const REQUIRED_VARIABLES = [
  'POSTGRES_DB',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
] as const;

const NUMERIC_VARIABLES = [
  'APP_PORT',
  'POSTGRES_PORT',
  'SALT_ROUNDS',
  'MAX_FAILED_ATTEMPTS',
] as const;

function validateEnvironment(): void {
  const missing = REQUIRED_VARIABLES.filter((key) => !process.env[key]?.trim());

  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno requeridas: ${missing.join(', ')}`);
  }

  for (const key of NUMERIC_VARIABLES) {
    const value = process.env[key];
    if (value && (!Number.isInteger(Number(value)) || Number(value) <= 0)) {
      throw new Error(`La variable ${key} debe ser un número entero positivo`);
    }
  }
}

// Config tipado y validado
export const env = {
  database: {
    name: process.env.POSTGRES_DB as string,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    host: process.env.POSTGRES_HOST || 'db',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  },
  app: {
    port: parseInt(process.env.APP_PORT || '5001', 10),
    url: process.env.APP_URL || 'http://localhost:5001',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  jwt: {
    accessSecret: process.env.JWT_SECRET as string,
    refreshSecret: process.env.JWT_REFRESH_SECRET as string,
    accessExpiresIn: '15m' as SignOptions['expiresIn'],
    refreshExpiresIn: '7d' as SignOptions['expiresIn'],
  },
  bcrypt: {
    saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10),
  },
  security: {
    maxFailedAttempts: parseInt(process.env.MAX_FAILED_ATTEMPTS || '5', 10),
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};

validateEnvironment();
