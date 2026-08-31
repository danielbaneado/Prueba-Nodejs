import Warehouse from "../../models/warehouse.model";

export interface IWarehouseRepository {
  findById(id: number): Promise<Warehouse | null>;
  findAll(): Promise<Warehouse[]>;
  create(data: Partial<Warehouse>): Promise<Warehouse>;
  update(id: number, data: Partial<Warehouse>): Promise<Warehouse | null>;
  delete(id: number): Promise<boolean>;
}
