import { Request, Response } from "express";
import { getSampleDataUsecase } from "../usecases";

export class SampleController {
  static async getSampleData(req: Request, res: Response) {
    const data: string = req.body;
    const resData = await getSampleDataUsecase.execute(data);

    return res.status(200).json(resData);
  }
}
