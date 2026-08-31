import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export type RequestStatus = 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';

export interface SupplyRequestAttributes {
  id: number;
  clinicId: number;
  medicationId: number;
  warehouseId: number | null;
  quantity: number;
  status: RequestStatus;
  notes: string | null;
  requestDate: Date;
  deliveryDate: Date | null;
}

export interface SupplyRequestCreationAttributes extends Optional<SupplyRequestAttributes, 'id' | 'warehouseId' | 'requestDate' | 'deliveryDate' | 'notes'> {}

class SupplyRequest extends Model<SupplyRequestAttributes, SupplyRequestCreationAttributes> implements SupplyRequestAttributes {
  public id!: number;
  public clinicId!: number;
  public medicationId!: number;
  public warehouseId!: number | null;
  public quantity!: number;
  public status!: RequestStatus;
  public notes!: string | null;
  public requestDate!: Date;
  public deliveryDate!: Date | null;
}

SupplyRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clinics',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    medicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medications',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'warehouses',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'assigned', 'in_transit', 'delivered', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    requestDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'SupplyRequest',
    tableName: 'supply_requests',
    timestamps: true,
  }
);

export default SupplyRequest;
