export interface CreateClinicDto {
  name: string;
  NIT: string;
  address: string;
  phone: string;
  email: string;
  responsibleUserId: number;
  status: 'active' | 'inactive';
}

export interface UpdateClinicDto {
  name?: string;
  NIT?: string;
  address?: string;
  phone?: string;
  email?: string;
  responsibleUserId?: number;
  status?: 'active' | 'inactive';
}
