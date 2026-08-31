import { Request, Response, NextFunction } from 'express';
import inventoryService from '../services/inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from '../dto/inventory.dto';

export const getAllInventories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const inventories = await inventoryService.findAll();
    res.status(200).json(inventories);
  } catch (error) {
    next(error);
  }
};

export const getInventoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const inventory = await inventoryService.findById(id);
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

export const getInventoriesByWarehouse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const warehouseId = parseInt(req.params.warehouseId as string, 10);
    const inventories = await inventoryService.findByWarehouse(warehouseId);
    res.status(200).json(inventories);
  } catch (error) {
    next(error);
  }
};

export const getInventoriesByMedication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const medicationId = parseInt(req.params.medicationId as string, 10);
    const inventories = await inventoryService.findByMedication(medicationId);
    res.status(200).json(inventories);
  } catch (error) {
    next(error);
  }
};

export const createInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto: CreateInventoryDto = req.body;
    const inventory = await inventoryService.create(dto);
    res.status(201).json(inventory);
  } catch (error) {
    next(error);
  }
};

export const updateInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const dto: UpdateInventoryDto = req.body;
    const inventory = await inventoryService.update(id, dto);
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

export const deleteInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await inventoryService.delete(id);
    res.status(200).json({ message: 'Registro de inventario eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};
