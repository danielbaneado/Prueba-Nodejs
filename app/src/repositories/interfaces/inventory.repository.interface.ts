import Inventory from "../../models/inventory.model";

export interface IInventoryRepository {
  findById(id: number): Promise<Inventory | null>;
  findByWarehouseAndMedication(warehouseId: number, medicationId: number): Promise<Inventory | null>;
  findByWarehouse(warehouseId: number): Promise<Inventory[]>;
  findByMedication(medicationId: number): Promise<Inventory[]>;
  findAll(): Promise<Inventory[]>;
  create(data: Partial<Inventory>): Promise<Inventory>;
  update(id: number, data: Partial<Inventory>): Promise<Inventory | null>;
  delete(id: number): Promise<boolean>;
}
