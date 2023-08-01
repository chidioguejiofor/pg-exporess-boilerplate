import { SampleGetDataUsecase } from "./GetSampleDataUsecase";
import { sampleRepository } from "../repositories";

export const getSampleDataUsecase = new SampleGetDataUsecase(
  console.log,
  sampleRepository
);
