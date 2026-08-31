import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface InventoryAttributes {
  id: number;
  warehouseId: number;
  medicationId: number;
  stock: number;
  minStock: number;
  status: 'active' | 'inactive';
}

export interface InventoryCreationAttributes extends Optional<InventoryAttributes, 'id'> {}

class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  public id!: number;
  public warehouseId!: number;
  public medicationId!: number;
  public stock!: number;
  public minStock!: number;
  public status!: 'active' | 'inactive';
}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'warehouses',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    medicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medications',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    minStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'Inventory',
    tableName: 'inventories',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['warehouseId', 'medicationId'],
      },
    ],
  }
);

export default Inventory;
