import { Request } from "express";

export { AuthRepositoryType } from "./repositories";

type PaginatedQuery<OtherQueries> = OtherQueries & {
  page?: number;
  limit?: number;
};

export type AuthRequest<Body = any, Params = any, Query = any> = Request<
  Params,
  unknown,
  Body,
  Query
> & {
  decoded?: {
    userId: string;
    userEmail: string;
  };
};

export type PaginatedAuthRequest<
  Params = any,
  Q = Record<string, unknown>
> = AuthRequest<unknown, Params, PaginatedQuery<Q>>;

export type RefreshTokenInput = {
  accessToken: string;
  refreshToken: string;
};
