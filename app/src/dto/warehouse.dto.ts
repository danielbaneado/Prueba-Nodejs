export interface CreateWarehouseDto {
  name: string;
  address: string;
  phone: string;
  email: string;
  managerId: number;
  status: 'active' | 'inactive';
}

export interface UpdateWarehouseDto {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  managerId?: number;
  status?: 'active' | 'inactive';
}
