import { Request, Response, NextFunction } from 'express';

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Acceso no autorizado: Token no proporcionado' });
    return; // No llamar a next() si hay un error
  }

  // Validar token (se implementará en Alpha-3.1)
  if (token === 'token-valido') {
    next(); // Continuar con la siguiente función middleware
  } else {
    res.status(401).json({ message: 'Acceso no autorizado: Token inválido' });
    return; // No llamar a next() si hay un error
  }
};