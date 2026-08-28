/// <reference types="node" />

import bcrypt from 'bcryptjs';
import sequelize from '../config/database';
import User from '../models/user.model';
import Profile from '../models/profile.model';

async function seed() {
  try {
    console.log('Iniciando sincronización de la base de datos...');
    await sequelize.sync({ alter: true });
    console.log('✓ Base de datos sincronizada');

    // Verificar si ya existe un usuario admin
    const existingAdmin = await User.findOne({ where: { email: 'admin@sapmicommerce.com' } });

    if (!existingAdmin) {
      const saltRounds: number = 10;
      const hashedPassword = await bcrypt.hash('Admin123!', saltRounds);

      const admin = await User.create({
        name: 'Admin',
        lastName: 'Sistema',
        email: 'admin@sapmicommerce.com',
        password: hashedPassword,
        phone: '3000000000',
        documentType: 'CC',
        documentNumber: '0000000000',
        birthDate: new Date('1990-01-01'),
        accountStatus: 'active',
        role: 'admin',
        failedLoginAttempts: 0,
        lastLoginAttempt: null,
        lockedUntil: null,
        activationToken: null,
        activationTokenExpires: null,
      });

      await Profile.create({
        userId: admin.id,
        lastName: 'Sistema',
        phone: '3000000000',
        documentType: 'CC',
        documentNumber: '0000000000',
        birthDate: new Date('1990-01-01'),
      });

      console.log('Admin creado: admin@sapmicommerce.com - contra: Admin123!');
    } else {
      console.log('Admin existente, omitiendo seed');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seeder:', error);
    process.exit(1);
  }
}

seed();
