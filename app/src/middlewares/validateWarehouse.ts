import { Request, Response, NextFunction } from 'express';
import warehouseRepository from '../repositories/warehouse.repository';

export default function validateWarehouse(req: Request, res: Response, next: NextFunction): void{
    const {id} = req.body

    if(!id){
        res.status(404).json({message: "Este almacén no existe"}) 
        return
    } 

    const warehouse= warehouseRepository.findById(id)

    if(!warehouse){
        res.status(404).json({error: "Almacén no encontrado"})
        return
    }
    
    next()
}