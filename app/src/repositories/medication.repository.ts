import Medication, { MedicationAttributes, MedicationCreationAttributes } from '../models/medication.model';
import type { IMedicationRepository } from './interfaces/medication.repository.interface';
import { Transaction } from 'sequelize';

class MedicationRepository implements IMedicationRepository {
  async findById(id: number): Promise<Medication | null> {
    return await Medication.findByPk(id);
  }

  async findAll(): Promise<Medication[]> {
    return await Medication.findAll();
  }

  async create(data: MedicationCreationAttributes, transaction?: Transaction): Promise<Medication> {
    return await Medication.create(data, { transaction });
  }

  async update(id: number, data: Partial<MedicationAttributes>, transaction?: Transaction): Promise<Medication | null> {
    const medication = await Medication.findByPk(id);
    if (!medication) return null;
    await medication.update(data, { transaction });
    return medication;
  }

  async delete(id: number, transaction?: Transaction): Promise<boolean> {
    const deleted = await Medication.destroy({ where: { id }, transaction });
    return deleted > 0;
  }
}

export default new MedicationRepository();
