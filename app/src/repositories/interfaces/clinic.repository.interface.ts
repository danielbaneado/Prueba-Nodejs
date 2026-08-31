import Clinic from "../../models/clinic.model";

export interface IClinicRepository {
  findByNIT(NIT: string): Promise<Clinic | null>;
  findById(id: number): Promise<Clinic | null>;
  findAll(): Promise<Clinic[]>;
  create(data: Partial<Clinic>): Promise<Clinic>;
  update(id: number, data: Partial<Clinic>): Promise<Clinic | null>;
  delete(id: number): Promise<boolean>;
}
