import { Request, Response, NextFunction } from 'express';
import clinicRepository from '../repositories/clinic.repository';

export default function validateClinic(req: Request, res: Response, next: NextFunction): void {
  const { NIT } = req.body;
  
  if (!NIT) {
    res.status(400).json({ error: 'NIT es requerido' });
    return;
  }
  
  clinicRepository.findByNIT(NIT).then((nitExists) => {
    if (nitExists) {
      res.status(409).json({ error: 'Ya existe una clínica con este NIT' });
      return;
    }
    next();
  }).catch((error) => {
    next(error);
  });
}
