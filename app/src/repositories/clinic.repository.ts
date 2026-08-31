import Clinic, { ClinicAttributes, ClinicCreationAttributes } from '../models/clinic.model';
import type { IClinicRepository } from './interfaces/clinic.repository.interface';
import { Transaction } from 'sequelize';

class ClinicRepository implements IClinicRepository {
  async findByNIT(NIT: string): Promise<Clinic | null> {
    return await Clinic.findOne({ where: { NIT } });
  }

  async findById(id: number): Promise<Clinic | null> {
    return await Clinic.findByPk(id);
  }

  async findAll(): Promise<Clinic[]> {
    return await Clinic.findAll();
  }

  async create(data: ClinicCreationAttributes, transaction?: Transaction): Promise<Clinic> {
    return await Clinic.create(data, { transaction });
  }

  async update(id: number, data: Partial<ClinicAttributes>, transaction?: Transaction): Promise<Clinic | null> {
    const clinic = await Clinic.findByPk(id);
    if (!clinic) return null;
    await clinic.update(data, { transaction });
    return clinic;
  }

  async delete(id: number, transaction?: Transaction): Promise<boolean> {
    const deleted = await Clinic.destroy({ where: { id }, transaction });
    return deleted > 0;
  }
}

export default new ClinicRepository();
