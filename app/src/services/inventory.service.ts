import errorHandler from '../error/errorHandler';
import inventoryRepository from '../repositories/inventory.repository';
import Warehouse from '../models/warehouse.model';
import Medication from '../models/medication.model';
import { CreateInventoryDto, UpdateInventoryDto } from '../dto/inventory.dto';
import { IInventoryService } from './interfaces/inventory.service.interface';

class InventoryService implements IInventoryService {
  async findAll() {
    return await inventoryRepository.findAll();
  }

  async findById(id: number) {
    const inventory = await inventoryRepository.findById(id);
    if (!inventory) {
      throw new errorHandler(404, 'Registro de inventario no encontrado');
    }
    return inventory;
  }

  async findByWarehouse(warehouseId: number) {
    return await inventoryRepository.findByWarehouse(warehouseId);
  }

  async findByMedication(medicationId: number) {
    return await inventoryRepository.findByMedication(medicationId);
  }

  async create(dto: CreateInventoryDto) {
    const warehouse = await Warehouse.findByPk(dto.warehouseId);
    if (!warehouse) {
      throw new errorHandler(404, 'Almacén no encontrado');
    }

    const medication = await Medication.findByPk(dto.medicationId);
    if (!medication) {
      throw new errorHandler(404, 'Medicamento no encontrado');
    }

    const existingInventory = await inventoryRepository.findByWarehouseAndMedication(
      dto.warehouseId,
      dto.medicationId
    );
    if (existingInventory) {
      throw new errorHandler(409, 'Ya existe un registro de inventario para este medicamento en este almacén');
    }

    return await inventoryRepository.create(dto);
  }

  async update(id: number, dto: UpdateInventoryDto) {
    const inventory = await inventoryRepository.findById(id);
    if (!inventory) {
      throw new errorHandler(404, 'Registro de inventario no encontrado');
    }

    return await inventoryRepository.update(id, dto);
  }

  async delete(id: number) {
    const inventory = await inventoryRepository.findById(id);
    if (!inventory) {
      throw new errorHandler(404, 'Registro de inventario no encontrado');
    }

    const deleted = await inventoryRepository.delete(id);
    if (!deleted) {
      throw new errorHandler(500, 'Error al eliminar el registro de inventario');
    }
    return true;
  }
}

export default new InventoryService();
