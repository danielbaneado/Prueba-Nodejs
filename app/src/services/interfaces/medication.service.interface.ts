import { CreateMedicationDto, UpdateMedicationDto } from '../../dto/medication.dto';

export interface IMedicationService {
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  create(dto: CreateMedicationDto): Promise<any>;
  update(id: number, dto: UpdateMedicationDto): Promise<any | null>;
  delete(id: number): Promise<boolean>;
}
