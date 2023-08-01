import { NextFunction, Request, Response } from "express";
import { authMiddlewareUsecase, loginUserUsecase } from "../usecases";
import { handleErrors } from "shared/utils";
import { AuthRequest } from "../types";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const data = await loginUserUsecase.execute({
        idToken: req.body.idToken,
        network: req.body.network,
      });
      return res.json(data);
    } catch (error) {
      return handleErrors(res, error as Error);
    }
  }

  static async authRequired(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authorization = req.headers.authorization;
      const decoded = await authMiddlewareUsecase.execute(authorization);
      req.decoded = {
        userEmail: decoded.email,
        userId: "",
      };
      return next();
    } catch (error) {
      return handleErrors(res, error as Error);
    }
  }
}
