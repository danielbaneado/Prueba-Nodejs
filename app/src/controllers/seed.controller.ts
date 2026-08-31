import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { runDefaultSeed, uploadSeedData } from '../seeders/seed';

/**
 * Carga un archivo de seed JSON
 */
export const uploadSeedFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No se proporcionó ningún archivo' });
      return;
    }

    const filePath = req.file.path;

    // Leer y parsear el archivo JSON
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    let seedData: any;

    try {
      seedData = JSON.parse(fileContent);
    } catch {
      // Eliminar archivo si no es JSON válido
      fs.unlinkSync(filePath);
      res.status(400).json({ error: 'El archivo no es un JSON válido' });
      return;
    }

    // Validar estructura del seed
    if (!seedData.clinics && !seedData.warehouses && !seedData.medications && !seedData.inventories && !seedData.supplyRequests) {
      fs.unlinkSync(filePath);
      res.status(400).json({ error: 'El archivo no contiene datos válidos de seed' });
      return;
    }

    // Cargar datos de seed
    const results = await uploadSeedData(seedData);

    // Eliminar archivo después de procesar
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: 'Seed cargado exitosamente',
      results,
    });
  } catch (error) {
    // Eliminar archivo en caso de error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

/**
 * Ejecuta el seed por defecto
 */
export const runDefaultSeedController = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await runDefaultSeed();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
