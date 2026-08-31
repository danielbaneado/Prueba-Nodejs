import { Request, Response, NextFunction } from 'express';
import warehouseService from '../services/warehouse.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dto/warehouse.dto';

export const getAllWarehouses = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const warehouses = await warehouseService.findAll();
    res.status(200).json(warehouses);
  } catch (error) {
    next(error);
  }
};

export const getWarehouseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const warehouse = await warehouseService.findById(id);
    res.status(200).json(warehouse);
  } catch (error) {
    next(error);
  }
};

export const createWarehouse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto: CreateWarehouseDto = req.body;
    const warehouse = await warehouseService.create(dto);
    res.status(201).json(warehouse);
  } catch (error) {
    next(error);
  }
};

export const updateWarehouse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const dto: UpdateWarehouseDto = req.body;
    const warehouse = await warehouseService.update(id, dto);
    res.status(200).json(warehouse);
  } catch (error) {
    next(error);
  }
};

export const deleteWarehouse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await warehouseService.delete(id);
    res.status(200).json({ message: 'Almacén eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};
