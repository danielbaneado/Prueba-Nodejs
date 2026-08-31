import { CreateWarehouseDto, UpdateWarehouseDto } from '../../dto/warehouse.dto';

export interface IWarehouseService {
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  create(dto: CreateWarehouseDto): Promise<any>;
  update(id: number, dto: UpdateWarehouseDto): Promise<any | null>;
  delete(id: number): Promise<boolean>;
}
