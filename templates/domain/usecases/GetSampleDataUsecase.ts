import { SampleRepositoryType } from "../types";

export class SampleGetDataUsecase {
  private dependencyOne: any;
  private sampleRepository: SampleRepositoryType;
  constructor(dependencyOne: any, sampleRepository: SampleRepositoryType) {
    this.dependencyOne = dependencyOne;
    this.sampleRepository = sampleRepository;
  }

  async execute(data: string) {
    this.dependencyOne(data);
    return this.sampleRepository.getSampleData();
  }
}
