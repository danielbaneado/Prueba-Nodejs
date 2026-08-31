import Warehouse, { WarehouseAttributes, WarehouseCreationAttributes } from '../models/warehouse.model';
import type { IWarehouseRepository } from './interfaces/warehouse.repository.interface';
import { Transaction } from 'sequelize';

class WarehouseRepository implements IWarehouseRepository {
  async findById(id: number): Promise<Warehouse | null> {
    return await Warehouse.findByPk(id);
  }

  async findAll(): Promise<Warehouse[]> {
    return await Warehouse.findAll();
  }

  async create(data: WarehouseCreationAttributes, transaction?: Transaction): Promise<Warehouse> {
    return await Warehouse.create(data, { transaction });
  }

  async update(id: number, data: Partial<WarehouseAttributes>, transaction?: Transaction): Promise<Warehouse | null> {
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) return null;
    await warehouse.update(data, { transaction });
    return warehouse;
  }

  async delete(id: number, transaction?: Transaction): Promise<boolean> {
    const deleted = await Warehouse.destroy({ where: { id }, transaction });
    return deleted > 0;
  }
}

export default new WarehouseRepository();
