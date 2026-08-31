import { CreateClinicDto, UpdateClinicDto } from '../../dto/clinic.dto';

export interface IClinicService {
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  findByNIT(NIT: string): Promise<any | null>;
  create(dto: CreateClinicDto): Promise<any>;
  update(id: number, dto: UpdateClinicDto): Promise<any | null>;
  delete(id: number): Promise<boolean>;
}
