import Inventory, { InventoryAttributes, InventoryCreationAttributes } from '../models/inventory.model';
import type { IInventoryRepository } from './interfaces/inventory.repository.interface';
import { Transaction } from 'sequelize';

class InventoryRepository implements IInventoryRepository {
  async findById(id: number): Promise<Inventory | null> {
    return await Inventory.findByPk(id);
  }

  async findByWarehouseAndMedication(warehouseId: number, medicationId: number): Promise<Inventory | null> {
    return await Inventory.findOne({ where: { warehouseId, medicationId } });
  }

  async findByWarehouse(warehouseId: number): Promise<Inventory[]> {
    return await Inventory.findAll({ where: { warehouseId } });
  }

  async findByMedication(medicationId: number): Promise<Inventory[]> {
    return await Inventory.findAll({ where: { medicationId } });
  }

  async findAll(): Promise<Inventory[]> {
    return await Inventory.findAll();
  }

  async create(data: InventoryCreationAttributes, transaction?: Transaction): Promise<Inventory> {
    return await Inventory.create(data, { transaction });
  }

  async update(id: number, data: Partial<InventoryAttributes>, transaction?: Transaction): Promise<Inventory | null> {
    const inventory = await Inventory.findByPk(id);
    if (!inventory) return null;
    await inventory.update(data, { transaction });
    return inventory;
  }

  async delete(id: number, transaction?: Transaction): Promise<boolean> {
    const deleted = await Inventory.destroy({ where: { id }, transaction });
    return deleted > 0;
  }
}

export default new InventoryRepository();
