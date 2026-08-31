/// <reference types="node" />

import bcrypt from 'bcryptjs';
import sequelize from '../config/database';
import User from '../models/user.model';
import Profile from '../models/profile.model';
import Clinic from '../models/clinic.model';
import Warehouse from '../models/warehouse.model';
import Medication from '../models/medication.model';
import Inventory from '../models/inventory.model';
import SupplyRequest from '../models/supply-request.model';

interface SeedData {
  clinics?: any[];
  warehouses?: any[];
  medications?: any[];
  inventories?: any[];
  supplyRequests?: any[];
}

interface SeedResults {
  clinics: number;
  warehouses: number;
  medications: number;
  inventories: number;
  supplyRequests: number;
}

/**
 * Sincroniza la base de datos
 */
export async function syncDatabase(): Promise<void> {
  console.log('Iniciando sincronización de la base de datos...');
  await sequelize.sync({ alter: true });
  console.log('✓ Base de datos sincronizada');
}

/**
 * Verifica si ya existe un usuario admin
 */
export async function adminExists(): Promise<boolean> {
  const existingAdmin = await User.findOne({ where: { email: 'danielalzate076@gmail.com' } });
  return !!existingAdmin;
}

/**
 * Crea el usuario admin por defecto
 */
export async function createAdminUser(transaction?: any): Promise<User> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('Admin123!', saltRounds);

  const admin = await User.create(
    {
      name: 'Admin',
      lastName: 'Sistema',
      email: 'danielalzate076@gmail.com',
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
    },
    { transaction }
  );

  return admin;
}

/**
 * Crea el perfil de un usuario
 */
export async function createProfile(userId: number, transaction?: any): Promise<void> {
  await Profile.create(
    {
      userId,
      lastName: 'Sistema',
      phone: '3000000000',
      documentType: 'CC',
      documentNumber: '0000000000',
      birthDate: new Date('1990-01-01'),
    },
    { transaction }
  );
}

/**
 * Crea el usuario gestor de solicitudes
 */
export async function createGestorUser(transaction?: any): Promise<User> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('Gestor123!', saltRounds);

  const gestor = await User.create(
    {
      name: 'Gestor',
      lastName: 'Solicitudes',
      email: 'gestor@sapmi.com',
      password: hashedPassword,
      phone: '3001111111',
      documentType: 'CC',
      documentNumber: '1111111111',
      birthDate: new Date('1995-05-15'),
      accountStatus: 'active',
      role: 'gestor de solicitudes' as any,
      failedLoginAttempts: 0,
      lastLoginAttempt: null,
      lockedUntil: null,
      activationToken: null,
      activationTokenExpires: null,
    },
    { transaction }
  );

  return gestor;
}

/**
 * Crea el perfil del gestor
 */
export async function createGestorProfile(userId: number, transaction?: any): Promise<void> {
  await Profile.create(
    {
      userId,
      lastName: 'Solicitudes',
      phone: '3001111111',
      documentType: 'CC',
      documentNumber: '1111111111',
      birthDate: new Date('1995-05-15'),
    },
    { transaction }
  );
}

/**
 * Crea la clínica por defecto
 */
export async function createDefaultClinic(adminId: number, transaction?: any): Promise<Clinic> {
  const clinic = await Clinic.create(
    {
      name: 'Sapmi Barranquilla',
      NIT: '900123456-1',
      address: 'Calle 72 # 45 - 32',
      phone: '3001234567',
      email: 'sapmi-baq@example.com',
      responsibleUserId: adminId,
      status: 'active',
    },
    { transaction }
  );

  return clinic;
}

/**
 * Crea el almacén por defecto
 */
export async function createDefaultWarehouse(adminId: number, transaction?: any): Promise<Warehouse> {
  const warehouse = await Warehouse.create(
    {
      name: 'Almacén Central Barranquilla',
      address: 'Calle 72 # 45 - 32',
      phone: '3007654321',
      email: 'almacen-baq@example.com',
      managerId: adminId,
      status: 'active',
    },
    { transaction }
  );

  return warehouse;
}

/**
 * Crea los medicamentos por defecto
 */
export async function createDefaultMedications(transaction?: any): Promise<Medication[]> {
  const medicationsData = [
    {
      name: 'Acetaminofén',
      description: 'Analgésico y antipirético',
      unit: 'tabletas',
      category: 'Analgésicos',
      status: 'active' as const,
    },
    {
      name: 'Ibuprofeno',
      description: 'Antiinflamatorio no esteroideo',
      unit: 'tabletas',
      category: 'Antiinflamatorios',
      status: 'active' as const,
    },
    {
      name: 'Amoxicilina',
      description: 'Antibiótico de amplio espectro',
      unit: 'cápsulas',
      category: 'Antibióticos',
      status: 'active' as const,
    },
    {
      name: 'Omeprazol',
      description: 'Inhibidor de la bomba de protones',
      unit: 'cápsulas',
      category: 'Gastrointestinal',
      status: 'active' as const,
    },
    {
      name: 'Loratadina',
      description: 'Antihistamínico',
      unit: 'tabletas',
      category: 'Antialérgicos',
      status: 'active' as const,
    },
  ];

  const createdMedications: Medication[] = [];
  for (const med of medicationsData) {
    const created = await Medication.create(med, { transaction });
    createdMedications.push(created);
  }

  return createdMedications;
}

/**
 * Crea los inventarios por defecto
 */
export async function createDefaultInventories(
  warehouseId: number,
  medications: Medication[],
  transaction?: any
): Promise<void> {
  const inventoriesData = [
    { warehouseId, medicationId: medications[0].id, stock: 500, minStock: 50, status: 'active' as const },
    { warehouseId, medicationId: medications[1].id, stock: 300, minStock: 30, status: 'active' as const },
    { warehouseId, medicationId: medications[2].id, stock: 200, minStock: 20, status: 'active' as const },
    { warehouseId, medicationId: medications[3].id, stock: 150, minStock: 15, status: 'active' as const },
    { warehouseId, medicationId: medications[4].id, stock: 400, minStock: 40, status: 'active' as const },
  ];

  for (const inv of inventoriesData) {
    await Inventory.create(inv, { transaction });
  }
}

/**
 * Crea las solicitudes de abastecimiento de ejemplo
 */
export async function createDefaultSupplyRequests(
  clinicId: number,
  warehouseId: number,
  medications: Medication[],
  transaction?: any
): Promise<void> {
  await SupplyRequest.create(
    {
      clinicId,
      medicationId: medications[0].id,
      warehouseId,
      quantity: 50,
      status: 'delivered',
      notes: 'Solicitud de prueba - entregada',
      requestDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      deliveryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    { transaction }
  );

  await SupplyRequest.create(
    {
      clinicId,
      medicationId: medications[1].id,
      warehouseId,
      quantity: 30,
      status: 'in_transit',
      notes: 'Solicitud de prueba - en tránsito',
      requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      deliveryDate: null,
    },
    { transaction }
  );

  await SupplyRequest.create(
    {
      clinicId,
      medicationId: medications[2].id,
      quantity: 20,
      status: 'pending',
      notes: 'Solicitud de prueba - pendiente',
      requestDate: new Date(),
      deliveryDate: null,
    },
    { transaction }
  );
}

/**
 * Ejecuta el seed completo por defecto
 */
export async function runDefaultSeed(): Promise<{ message: string; credentials?: any }> {
  // Sincronizar la base de datos primero (crea las tablas si no existen)
  await syncDatabase();

  const exists = await adminExists();

  if (exists) {
    return { message: 'El seed ya fue ejecutado previamente' };
  }

  const transaction = await sequelize.transaction();

  try {
    // Crear usuario admin
    const admin = await createAdminUser(transaction);
    await createProfile(admin.id, transaction);

    // Crear usuario gestor de solicitudes
    const gestor = await createGestorUser(transaction);
    await createGestorProfile(gestor.id, transaction);

    // Crear clínica
    const clinic = await createDefaultClinic(admin.id, transaction);

    // Crear almacén
    const warehouse = await createDefaultWarehouse(admin.id, transaction);

    // Crear medicamentos
    const medications = await createDefaultMedications(transaction);

    // Crear inventarios
    await createDefaultInventories(warehouse.id, medications, transaction);

    // Crear solicitudes de abastecimiento
    await createDefaultSupplyRequests(clinic.id, warehouse.id, medications, transaction);

    await transaction.commit();

    return {
      message: 'Seed ejecutado exitosamente',
      credentials: {
        admin: {
          email: 'danielalzate076@gmail.com',
          password: 'Admin123!',
        },
        gestor: {
          email: 'gestor@sapmi.com',
          password: 'Gestor123!',
        },
      },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

/**
 * Carga datos de seed desde un objeto
 */
export async function uploadSeedData(seedData: SeedData): Promise<SeedResults> {
  // Sincronizar la base de datos primero (crea las tablas si no existen)
  await syncDatabase();

  const results: SeedResults = {
    clinics: 0,
    warehouses: 0,
    medications: 0,
    inventories: 0,
    supplyRequests: 0,
  };

  const transaction = await sequelize.transaction();

  try {
    // Crear clínicas
    if (seedData.clinics && Array.isArray(seedData.clinics)) {
      for (const clinic of seedData.clinics) {
        const existing = await Clinic.findOne({ where: { NIT: clinic.NIT }, transaction });
        if (!existing) {
          await Clinic.create(clinic, { transaction });
          results.clinics++;
        }
      }
    }

    // Crear almacenes
    if (seedData.warehouses && Array.isArray(seedData.warehouses)) {
      for (const warehouse of seedData.warehouses) {
        const existing = await Warehouse.findOne({
          where: { name: warehouse.name },
          transaction,
        });
        if (!existing) {
          await Warehouse.create(warehouse, { transaction });
          results.warehouses++;
        }
      }
    }

    // Crear medicamentos
    if (seedData.medications && Array.isArray(seedData.medications)) {
      for (const medication of seedData.medications) {
        const existing = await Medication.findOne({
          where: { name: medication.name },
          transaction,
        });
        if (!existing) {
          await Medication.create(medication, { transaction });
          results.medications++;
        }
      }
    }

    // Crear inventarios
    if (seedData.inventories && Array.isArray(seedData.inventories)) {
      for (const inventory of seedData.inventories) {
        const existing = await Inventory.findOne({
          where: {
            warehouseId: inventory.warehouseId,
            medicationId: inventory.medicationId,
          },
          transaction,
        });
        if (!existing) {
          await Inventory.create(inventory, { transaction });
          results.inventories++;
        }
      }
    }

    // Crear solicitudes de abastecimiento
    if (seedData.supplyRequests && Array.isArray(seedData.supplyRequests)) {
      for (const request of seedData.supplyRequests) {
        await SupplyRequest.create(request, { transaction });
        results.supplyRequests++;
      }
    }

    await transaction.commit();
    return results;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

// Solo ejecutar si se llama directamente (no cuando se importa)
if (require.main === module) {
  (async () => {
    try {
      await syncDatabase();
      const result = await runDefaultSeed();
      console.log(result.message);
      if (result.credentials) {
        console.log('Admin:', result.credentials.admin.email, '-', result.credentials.admin.password);
      }
      process.exit(0);
    } catch (error) {
      console.error('❌ Error en el seeder:', error);
      process.exit(1);
    }
  })();
}
