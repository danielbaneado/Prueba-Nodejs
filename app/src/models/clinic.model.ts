import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface ClinicAttributes {
  id: number;
  name: string;
  NIT: string;
  address: string;
  phone: string;
  email: string;
  responsibleUserId: number;
  status: 'active' | 'inactive';
}

export interface ClinicCreationAttributes extends Optional<ClinicAttributes, 'id'> {}

class Clinic extends Model<ClinicAttributes, ClinicCreationAttributes> implements ClinicAttributes {
  public id!: number;
  public name!: string;
  public NIT!: string;
  public address!: string;
  public phone!: string;
  public email!: string;
  public responsibleUserId!: number;
  public status!: 'active' | 'inactive';
}

Clinic.init(
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
    NIT: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
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
    responsibleUserId: {
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
    modelName: 'Clinic',
    tableName: 'clinics',
    timestamps: true,
  }
);

export default Clinic;
