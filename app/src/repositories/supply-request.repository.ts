import SupplyRequest, { SupplyRequestAttributes, SupplyRequestCreationAttributes } from '../models/supply-request.model';
import type { ISupplyRequestRepository } from './interfaces/supply-request.repository.interface';
import { Transaction } from 'sequelize';

class SupplyRequestRepository implements ISupplyRequestRepository {
  async findById(id: number): Promise<SupplyRequest | null> {
    return await SupplyRequest.findByPk(id);
  }

  async findByClinic(clinicId: number): Promise<SupplyRequest[]> {
    return await SupplyRequest.findAll({ where: { clinicId } });
  }

  async findByWarehouse(warehouseId: number): Promise<SupplyRequest[]> {
    return await SupplyRequest.findAll({ where: { warehouseId } });
  }

  async findByStatus(status: string): Promise<SupplyRequest[]> {
    return await SupplyRequest.findAll({ where: { status } });
  }

  async findAll(): Promise<SupplyRequest[]> {
    return await SupplyRequest.findAll();
  }

  async create(data: SupplyRequestCreationAttributes, transaction?: Transaction): Promise<SupplyRequest> {
    return await SupplyRequest.create(data, { transaction });
  }

  async update(id: number, data: Partial<SupplyRequestAttributes>, transaction?: Transaction): Promise<SupplyRequest | null> {
    const request = await SupplyRequest.findByPk(id);
    if (!request) return null;
    await request.update(data, { transaction });
    return request;
  }

  async delete(id: number, transaction?: Transaction): Promise<boolean> {
    const deleted = await SupplyRequest.destroy({ where: { id }, transaction });
    return deleted > 0;
  }
}

export default new SupplyRequestRepository();
