import errorHandler from '../error/errorHandler';
import clinicRepository from '../repositories/clinic.repository';
import User from '../models/user.model';
import { CreateClinicDto, UpdateClinicDto } from '../dto/clinic.dto';
import { IClinicService } from './interfaces/clinic.service.interface';

class ClinicService implements IClinicService {
  async findAll() {
    return await clinicRepository.findAll();
  }

  async findById(id: number) {
    const clinic = await clinicRepository.findById(id);
    if (!clinic) {
      throw new errorHandler(404, 'Clínica no encontrada');
    }
    return clinic;
  }

  async findByNIT(NIT: string) {
    const clinic = await clinicRepository.findByNIT(NIT);
    if (!clinic) {
      throw new errorHandler(404, 'Clínica no encontrada');
    }
    return clinic;
  }

  async create(dto: CreateClinicDto) {
    const existingClinic = await clinicRepository.findByNIT(dto.NIT);
    if (existingClinic) {
      throw new errorHandler(409, 'Ya existe una clínica con este NIT');
    }

    const user = await User.findByPk(dto.responsibleUserId);
    if (!user) {
      throw new errorHandler(404, 'Usuario responsable no encontrado');
    }

    return await clinicRepository.create(dto);
  }

  async update(id: number, dto: UpdateClinicDto) {
    const clinic = await clinicRepository.findById(id);
    if (!clinic) {
      throw new errorHandler(404, 'Clínica no encontrada');
    }

    if (dto.NIT && dto.NIT !== clinic.NIT) {
      const existingClinic = await clinicRepository.findByNIT(dto.NIT);
      if (existingClinic) {
        throw new errorHandler(409, 'Ya existe una clínica con este NIT');
      }
    }

    if (dto.responsibleUserId) {
      const user = await User.findByPk(dto.responsibleUserId);
      if (!user) {
        throw new errorHandler(404, 'Usuario responsable no encontrado');
      }
    }

    return await clinicRepository.update(id, dto);
  }

  async delete(id: number) {
    const clinic = await clinicRepository.findById(id);
    if (!clinic) {
      throw new errorHandler(404, 'Clínica no encontrada');
    }

    const deleted = await clinicRepository.delete(id);
    if (!deleted) {
      throw new errorHandler(500, 'Error al eliminar la clínica');
    }
    return true;
  }
}

export default new ClinicService();
