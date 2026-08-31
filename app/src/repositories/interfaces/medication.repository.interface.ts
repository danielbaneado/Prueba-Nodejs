import Medication from "../../models/medication.model";

export interface IMedicationRepository {
  findById(id: number): Promise<Medication | null>;
  findAll(): Promise<Medication[]>;
  create(data: Partial<Medication>): Promise<Medication>;
  update(id: number, data: Partial<Medication>): Promise<Medication | null>;
  delete(id: number): Promise<boolean>;
}
