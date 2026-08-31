import errorHandler from '../error/errorHandler';
import medicationRepository from '../repositories/medication.repository';
import { CreateMedicationDto, UpdateMedicationDto } from '../dto/medication.dto';
import { IMedicationService } from './interfaces/medication.service.interface';

class MedicationService implements IMedicationService {
  async findAll() {
    return await medicationRepository.findAll();
  }

  async findById(id: number) {
    const medication = await medicationRepository.findById(id);
    if (!medication) {
      throw new errorHandler(404, 'Medicamento no encontrado');
    }
    return medication;
  }

  async create(dto: CreateMedicationDto) {
    return await medicationRepository.create(dto);
  }

  async update(id: number, dto: UpdateMedicationDto) {
    const medication = await medicationRepository.findById(id);
    if (!medication) {
      throw new errorHandler(404, 'Medicamento no encontrado');
    }

    return await medicationRepository.update(id, dto);
  }

  async delete(id: number) {
    const medication = await medicationRepository.findById(id);
    if (!medication) {
      throw new errorHandler(404, 'Medicamento no encontrado');
    }

    const deleted = await medicationRepository.delete(id);
    if (!deleted) {
      throw new errorHandler(500, 'Error al eliminar el medicamento');
    }
    return true;
  }
}

export default new MedicationService();
