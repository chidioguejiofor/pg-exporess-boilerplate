import { Application, Router } from "express";
import cors from "cors";
import { authRoutes } from "domains/auth";
import { ALLOWED_ORIGINS } from "./settings";

export default function combinedRoutes(app: Application): void {
  const noCors = Router();
  const withCors = Router();

  noCors.use(cors());
  withCors.use(cors({ origin: ALLOWED_ORIGINS }));

  noCors.use("/auth", authRoutes);

  app.use("/api", noCors);
  app.use("/api", withCors);
}
