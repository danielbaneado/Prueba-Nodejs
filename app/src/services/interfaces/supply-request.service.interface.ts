import { CreateSupplyRequestDto, UpdateSupplyRequestDto } from '../../dto/supply-request.dto';

export interface ISupplyRequestService {
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  findByClinic(clinicId: number): Promise<any[]>;
  findByWarehouse(warehouseId: number): Promise<any[]>;
  findByStatus(status: string): Promise<any[]>;
  create(dto: CreateSupplyRequestDto): Promise<any>;
  update(id: number, dto: UpdateSupplyRequestDto): Promise<any | null>;
  assignWarehouse(id: number, warehouseId: number): Promise<any | null>;
  updateStatus(id: number, status: string): Promise<any | null>;
  delete(id: number): Promise<boolean>;
}
