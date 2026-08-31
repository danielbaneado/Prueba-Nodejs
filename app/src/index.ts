import app from './server';
import sequelize from './config/database';
import { env } from './config/env'
import logger from './utils/logger'
import './models'

const PORT = env.app.port;

const start = async () => {
  try {
    await sequelize.authenticate()
    logger.info('Conexión a la base de datos establecida')

    app.listen(PORT, () => {
      logger.info('Servidor iniciado', {
        port: Number(PORT),
        environment: process.env.NODE_ENV || 'development',
      })
    })
  } catch (error) {
    logger.error('No fue posible iniciar la aplicación', {
      error: error instanceof Error ? error.message : String(error),
    })
    process.exit(1)
  }
}

start()
