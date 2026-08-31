import { CreateInventoryDto, UpdateInventoryDto } from '../../dto/inventory.dto';

export interface IInventoryService {
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  findByWarehouse(warehouseId: number): Promise<any[]>;
  findByMedication(medicationId: number): Promise<any[]>;
  create(dto: CreateInventoryDto): Promise<any>;
  update(id: number, dto: UpdateInventoryDto): Promise<any | null>;
  delete(id: number): Promise<boolean>;
}
