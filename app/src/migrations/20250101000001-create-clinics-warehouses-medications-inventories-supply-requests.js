'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add new ENUM values to users.role
    await queryInterface.sequelize.query(`
      ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
      ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'gestor de solicitudes', 'responsable de clínica', 'gestor de almacén'));
    `);

    // Create clinics table
    await queryInterface.createTable('clinics', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      NIT: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      responsibleUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create warehouses table
    await queryInterface.createTable('warehouses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      managerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create medications table
    await queryInterface.createTable('medications', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      unit: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create inventories table
    await queryInterface.createTable('inventories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      warehouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'warehouses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      medicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'medications',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      minStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add unique constraint for inventory
    await queryInterface.addConstraint('inventories', {
      fields: ['warehouseId', 'medicationId'],
      type: 'unique',
      name: 'unique_warehouse_medication',
    });

    // Create supply_requests table
    await queryInterface.createTable('supply_requests', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clinicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clinics',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      medicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'medications',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      warehouseId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'warehouses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'assigned', 'in_transit', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      requestDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deliveryDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add indexes
    await queryInterface.addIndex('clinics', ['NIT']);
    await queryInterface.addIndex('clinics', ['responsibleUserId']);
    await queryInterface.addIndex('warehouses', ['managerId']);
    await queryInterface.addIndex('inventories', ['warehouseId']);
    await queryInterface.addIndex('inventories', ['medicationId']);
    await queryInterface.addIndex('supply_requests', ['clinicId']);
    await queryInterface.addIndex('supply_requests', ['warehouseId']);
    await queryInterface.addIndex('supply_requests', ['medicationId']);
    await queryInterface.addIndex('supply_requests', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('supply_requests', ['status']);
    await queryInterface.removeIndex('supply_requests', ['medicationId']);
    await queryInterface.removeIndex('supply_requests', ['warehouseId']);
    await queryInterface.removeIndex('supply_requests', ['clinicId']);
    await queryInterface.removeIndex('inventories', ['medicationId']);
    await queryInterface.removeIndex('inventories', ['warehouseId']);
    await queryInterface.removeIndex('warehouses', ['managerId']);
    await queryInterface.removeIndex('clinics', ['responsibleUserId']);
    await queryInterface.removeIndex('clinics', ['NIT']);

    // Drop tables
    await queryInterface.dropTable('supply_requests');
    await queryInterface.dropTable('inventories');
    await queryInterface.dropTable('medications');
    await queryInterface.dropTable('warehouses');
    await queryInterface.dropTable('clinics');

    // Revert ENUM values
    await queryInterface.sequelize.query(`
      ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
      ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'gestor de solicitudes'));
    `);
  },
};
