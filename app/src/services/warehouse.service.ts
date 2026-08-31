import errorHandler from '../error/errorHandler';
import warehouseRepository from '../repositories/warehouse.repository';
import User from '../models/user.model';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dto/warehouse.dto';
import { IWarehouseService } from './interfaces/warehouse.service.interface';

class WarehouseService implements IWarehouseService {
  async findAll() {
    return await warehouseRepository.findAll();
  }

  async findById(id: number) {
    const warehouse = await warehouseRepository.findById(id);
    if (!warehouse) {
      throw new errorHandler(404, 'Almacén no encontrado');
    }
    return warehouse;
  }

  async create(dto: CreateWarehouseDto) {
    const user = await User.findByPk(dto.managerId);
    if (!user) {
      throw new errorHandler(404, 'Usuario gestor no encontrado');
    }

    return await warehouseRepository.create(dto);
  }

  async update(id: number, dto: UpdateWarehouseDto) {
    const warehouse = await warehouseRepository.findById(id);
    if (!warehouse) {
      throw new errorHandler(404, 'Almacén no encontrado');
    }

    if (dto.managerId) {
      const user = await User.findByPk(dto.managerId);
      if (!user) {
        throw new errorHandler(404, 'Usuario gestor no encontrado');
      }
    }

    return await warehouseRepository.update(id, dto);
  }

  async delete(id: number) {
    const warehouse = await warehouseRepository.findById(id);
    if (!warehouse) {
      throw new errorHandler(404, 'Almacén no encontrado');
    }

    const deleted = await warehouseRepository.delete(id);
    if (!deleted) {
      throw new errorHandler(500, 'Error al eliminar el almacén');
    }
    return true;
  }
}

export default new WarehouseService();
