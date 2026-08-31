import { RequestStatus } from '../models/supply-request.model';

export interface CreateSupplyRequestDto {
  clinicId: number;
  medicationId: number;
  quantity: number;
  notes?: string;
}

export interface UpdateSupplyRequestDto {
  warehouseId?: number;
  quantity?: number;
  status?: RequestStatus;
  notes?: string;
  deliveryDate?: Date;
}
