import { Request, Response, NextFunction } from 'express';
import medicationService from '../services/medication.service';
import { CreateMedicationDto, UpdateMedicationDto } from '../dto/medication.dto';

export const getAllMedications = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const medications = await medicationService.findAll();
    res.status(200).json(medications);
  } catch (error) {
    next(error);
  }
};

export const getMedicationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const medication = await medicationService.findById(id);
    res.status(200).json(medication);
  } catch (error) {
    next(error);
  }
};

export const createMedication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto: CreateMedicationDto = req.body;
    const medication = await medicationService.create(dto);
    res.status(201).json(medication);
  } catch (error) {
    next(error);
  }
};

export const updateMedication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const dto: UpdateMedicationDto = req.body;
    const medication = await medicationService.update(id, dto);
    res.status(200).json(medication);
  } catch (error) {
    next(error);
  }
};

export const deleteMedication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await medicationService.delete(id);
    res.status(200).json({ message: 'Medicamento eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};
