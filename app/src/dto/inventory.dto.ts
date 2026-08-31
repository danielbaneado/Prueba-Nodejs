export interface CreateInventoryDto {
  warehouseId: number;
  medicationId: number;
  stock: number;
  minStock: number;
  status: 'active' | 'inactive';
}

export interface UpdateInventoryDto {
  stock?: number;
  minStock?: number;
  status?: 'active' | 'inactive';
}
