import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../domain/errors/HttpError';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        console.error(err); 
        res.status(500).json({ error: 'Algo inesperado aconteceu!' })
    }
}