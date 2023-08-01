import { Router } from "express";
import { SampleController } from "./controllers";
const router = Router();

router.get("/sample", SampleController.getSampleData);

export default router;
