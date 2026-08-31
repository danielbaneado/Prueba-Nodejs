import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface MedicationAttributes {
  id: number;
  name: string;
  description: string;
  unit: string;
  category: string;
  status: 'active' | 'inactive';
}

export interface MedicationCreationAttributes extends Optional<MedicationAttributes, 'id'> {}

class Medication extends Model<MedicationAttributes, MedicationCreationAttributes> implements MedicationAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public unit!: string;
  public category!: string;
  public status!: 'active' | 'inactive';
}

Medication.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'Medication',
    tableName: 'medications',
    timestamps: true,
  }
);

export default Medication;
