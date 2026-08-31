import errorHandler from '../error/errorHandler';
import supplyRequestRepository from '../repositories/supply-request.repository';
import inventoryRepository from '../repositories/inventory.repository';
import Clinic from '../models/clinic.model';
import Warehouse from '../models/warehouse.model';
import Medication from '../models/medication.model';
import { CreateSupplyRequestDto, UpdateSupplyRequestDto } from '../dto/supply-request.dto';
import { ISupplyRequestService } from './interfaces/supply-request.service.interface';
import { RequestStatus } from '../models/supply-request.model';

class SupplyRequestService implements ISupplyRequestService {
  async findAll() {
    return await supplyRequestRepository.findAll();
  }

  async findById(id: number) {
    const request = await supplyRequestRepository.findById(id);
    if (!request) {
      throw new errorHandler(404, 'Solicitud de abastecimiento no encontrada');
    }
    return request;
  }

  async findByClinic(clinicId: number) {
    return await supplyRequestRepository.findByClinic(clinicId);
  }

  async findByWarehouse(warehouseId: number) {
    return await supplyRequestRepository.findByWarehouse(warehouseId);
  }

  async findByStatus(status: string) {
    return await supplyRequestRepository.findByStatus(status);
  }

  async create(dto: CreateSupplyRequestDto) {
    const clinic = await Clinic.findByPk(dto.clinicId);
    if (!clinic) {
      throw new errorHandler(404, 'Clínica no encontrada');
    }

    const medication = await Medication.findByPk(dto.medicationId);
    if (!medication) {
      throw new errorHandler(404, 'Medicamento no encontrado');
    }

    return await supplyRequestRepository.create({
      ...dto,
      status: 'pending',
    });
  }

  async update(id: number, dto: UpdateSupplyRequestDto) {
    const request = await supplyRequestRepository.findById(id);
    if (!request) {
      throw new errorHandler(404, 'Solicitud de abastecimiento no encontrada');
    }

    if (dto.warehouseId) {
      const warehouse = await Warehouse.findByPk(dto.warehouseId);
      if (!warehouse) {
        throw new errorHandler(404, 'Almacén no encontrado');
      }
    }

    return await supplyRequestRepository.update(id, dto);
  }

  async assignWarehouse(id: number, warehouseId: number) {
    const request = await supplyRequestRepository.findById(id);
    if (!request) {
      throw new errorHandler(404, 'Solicitud de abastecimiento no encontrada');
    }

    if (request.status !== 'pending') {
      throw new errorHandler(400, 'Solo se pueden asignar almacenes a solicitudes pendientes');
    }

    const warehouse = await Warehouse.findByPk(warehouseId);
    if (!warehouse) {
      throw new errorHandler(404, 'Almacén no encontrado');
    }

    return await supplyRequestRepository.update(id, {
      warehouseId,
      status: 'assigned',
    });
  }

  async updateStatus(id: number, status: string) {
    const request = await supplyRequestRepository.findById(id);
    if (!request) {
      throw new errorHandler(404, 'Solicitud de abastecimiento no encontrado');
    }

    const validStatuses: RequestStatus[] = ['pending', 'assigned', 'in_transit', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status as RequestStatus)) {
      throw new errorHandler(400, 'Estado no válido');
    }

    const updateData: any = { status };

    if (status === 'delivered') {
      updateData.deliveryDate = new Date();

      // Update inventory stock
      if (request.warehouseId) {
        const inventory = await inventoryRepository.findByWarehouseAndMedication(
          request.warehouseId,
          request.medicationId
        );

        if (inventory) {
          const newStock = inventory.stock - request.quantity;
          if (newStock < 0) {
            throw new errorHandler(400, 'Stock insuficiente en el almacén');
          }
          await inventoryRepository.update(inventory.id, { stock: newStock });
        }
      }
    }

    return await supplyRequestRepository.update(id, updateData);
  }

  async delete(id: number) {
    const request = await supplyRequestRepository.findById(id);
    if (!request) {
      throw new errorHandler(404, 'Solicitud de abastecimiento no encontrada');
    }

    if (request.status === 'delivered') {
      throw new errorHandler(400, 'No se puede eliminar una solicitud entregada');
    }

    const deleted = await supplyRequestRepository.delete(id);
    if (!deleted) {
      throw new errorHandler(500, 'Error al eliminar la solicitud');
    }
    return true;
  }
}

export default new SupplyRequestService();
