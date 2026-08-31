import { Request, Response, NextFunction } from 'express';

import userService from '../services/user.service';
import { AuthPayload } from '../types/index.d';
import { createToken, verifyToken } from '../utils/jwt';
import { cookieOptions } from '../config/cookie';
import { env } from '../config/env';
import { UpdateUserDto } from '../dto/update-user.dto';

export const getUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    return;
  }

  try {
    const user = await userService.findOne(email);

    if (!user) {
      res.status(401).json({error: 'Credenciales inválidas'});
      return;
    }

    if (user.accountStatus === 'inactive') {
      res.status(401).json({error: 'La cuenta no ha sido activada. Por favor revise su correo electrónico para activar su cuenta.'});
      return;
    }

    if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()){
      res.status(401).json({error: 'Cuenta bloqueada temporalmente por múltiples intentos fallidos, inténtelo nuevamente en unos minutos'});
      return;
    }

    const validatedUser = await userService.findCredential(email, password);
    if (!validatedUser) {
      res.status(401).json({error: 'Credenciales inválidas'});
      return;
    }

    await userService.clearAttempts(validatedUser)

    const payload = {
      role: user?.role,
      id: user?.id,
      name: user?.name,
    };

    const accessToken = createToken(payload, env.jwt.accessSecret, { expiresIn: env.jwt.accessExpiresIn });
    const refreshToken = createToken(payload, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpiresIn });

    res
      .status(201)
      .cookie('accessToken', accessToken, cookieOptions)
      .json({
        message: 'Login exitoso',
        accessToken,
        refreshToken,
        user: {
          role: payload.role,
          id: payload.id,
          name: payload.name,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ error: 'Usuario sin token' });
      return;
    }

    const payload = verifyToken(refreshToken, env.jwt.refreshSecret) as AuthPayload;

    if (!payload) {
      res.status(401).json({ error: 'Token inválido' });
      return;
    }

    const newToken = createToken(
      {
        role: payload.role,
        id: payload.id,
        name: payload.name,
      },
      env.jwt.accessSecret,
      { expiresIn: env.jwt.accessExpiresIn }
    );

    res
      .status(201)
      .cookie('accessToken', newToken, cookieOptions)
      .json({ newToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .json({ message: 'Sesión cerrada correctamente' });
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const targetId = parseInt(String(req.params.id), 10);
    if (isNaN(targetId)) {
      res.status(400).json({ error: 'ID de usuario inválido' });
      return;
    }

    // Authorization: admin can modify all users, requests gestors only themselves
    const isAdmin = req.user.role === 'admin';
    const isSelf = req.user.id === targetId;

    if (!isAdmin && !isSelf) {
      res.status(403).json({ error: 'No autorizado para modificar este usuario' });
      return;
    }

    const dto: UpdateUserDto = req.body;
    const updatedUser = await userService.updateUser(targetId, dto);

    res.status(200).json({
      message: "Usuario actualizado correctamente",
      updatedUser
    });
  } catch (error) {
    next(error);
  }
};
