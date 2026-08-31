import { RequestStatus } from "../../models/supply-request.model";
import SupplyRequest from "../../models/supply-request.model";

export interface ISupplyRequestRepository {
  findById(id: number): Promise<SupplyRequest | null>;
  findByClinic(clinicId: number): Promise<SupplyRequest[]>;
  findByWarehouse(warehouseId: number): Promise<SupplyRequest[]>;
  findByStatus(status: RequestStatus): Promise<SupplyRequest[]>;
  findAll(): Promise<SupplyRequest[]>;
  create(data: Partial<SupplyRequest>): Promise<SupplyRequest>;
  update(id: number, data: Partial<SupplyRequest>): Promise<SupplyRequest | null>;
  delete(id: number): Promise<boolean>;
}
