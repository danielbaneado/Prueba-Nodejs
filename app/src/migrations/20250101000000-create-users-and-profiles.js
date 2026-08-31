'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('admin', 'gestor de solicitudes'),
        allowNull: false,
        defaultValue: 'gestor de solicitudes',
      },
      failedLoginAttempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      lastLoginAttempt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      lockedUntil: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      phone: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      documentType: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      documentNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      accountStatus: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'inactive',
      },
      activationToken: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      activationTokenExpires: {
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

    await queryInterface.createTable('profiles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE', //Updates profile table info based in user changes
        onDelete: 'CASCADE',
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      documentType: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      documentNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profiles');
    await queryInterface.dropTable('users');
  },
};
