import { Request, Response, NextFunction } from 'express';
import supplyRequestService from '../services/supply-request.service';
import { CreateSupplyRequestDto, UpdateSupplyRequestDto } from '../dto/supply-request.dto';

export const getAllSupplyRequests = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests = await supplyRequestService.findAll();
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

export const getSupplyRequestById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const request = await supplyRequestService.findById(id);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

export const getSupplyRequestsByClinic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const clinicId = parseInt(req.params.clinicId as string, 10);
    const requests = await supplyRequestService.findByClinic(clinicId);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

export const getSupplyRequestsByWarehouse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const warehouseId = parseInt(req.params.warehouseId as string, 10);
    const requests = await supplyRequestService.findByWarehouse(warehouseId);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

export const getSupplyRequestsByStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.params;
    const requests = await supplyRequestService.findByStatus(status as string);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

export const createSupplyRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto: CreateSupplyRequestDto = req.body;
    const request = await supplyRequestService.create(dto);
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

export const updateSupplyRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const dto: UpdateSupplyRequestDto = req.body;
    const request = await supplyRequestService.update(id, dto);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

export const assignWarehouse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { warehouseId } = req.body;
    const request = await supplyRequestService.assignWarehouse(id, warehouseId);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

export const updateSupplyRequestStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { status } = req.body;
    const request = await supplyRequestService.updateStatus(id, status);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

export const deleteSupplyRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await supplyRequestService.delete(id);
    res.status(200).json({ message: 'Solicitud de abastecimiento eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
};
