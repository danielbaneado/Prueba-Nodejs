import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface WarehouseAttributes {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  managerId: number;
  status: 'active' | 'inactive';
}

export interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, 'id'> {}

class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes> implements WarehouseAttributes {
  public id!: number;
  public name!: string;
  public address!: string;
  public phone!: string;
  public email!: string;
  public managerId!: number;
  public status!: 'active' | 'inactive';
}

Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'Warehouse',
    tableName: 'warehouses',
    timestamps: true,
  }
);

export default Warehouse;
