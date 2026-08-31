export interface CreateMedicationDto {
  name: string;
  description: string;
  unit: string;
  category: string;
  status: 'active' | 'inactive';
}

export interface UpdateMedicationDto {
  name?: string;
  description?: string;
  unit?: string;
  category?: string;
  status?: 'active' | 'inactive';
}
