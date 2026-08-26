/// <reference types="node" />

import sequelize from '../config/database';

async function seed() {
  try {
    console.log('Iniciando sincronización de la base de datos...');
    
    await sequelize.sync({ alter: true });
    console.log('✓ Base de datos sincronizada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seeder:', error);
    process.exit(1);
  }
}

seed();
