import { Request, Response, NextFunction } from 'express';
import clinicService from '../services/clinic.service';
import { CreateClinicDto, UpdateClinicDto } from '../dto/clinic.dto';

export const getAllClinics = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const clinics = await clinicService.findAll();
    res.status(200).json(clinics);
  } catch (error) {
    next(error);
  }
};

export const getClinicById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const clinic = await clinicService.findById(id);
    res.status(200).json(clinic);
  } catch (error) {
    next(error);
  }
};

export const getClinicByNIT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { NIT } = req.params;
    const clinic = await clinicService.findByNIT(NIT as string);
    res.status(200).json(clinic);
  } catch (error) {
    next(error);
  }
};

export const createClinic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto: CreateClinicDto = req.body;
    const clinic = await clinicService.create(dto);
    res.status(201).json(clinic);
  } catch (error) {
    next(error);
  }
};

export const updateClinic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const dto: UpdateClinicDto = req.body;
    const clinic = await clinicService.update(id, dto);
    res.status(200).json(clinic);
  } catch (error) {
    next(error);
  }
};

export const deleteClinic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await clinicService.delete(id);
    res.status(200).json({ message: 'Clínica eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
};
