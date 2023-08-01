import { ITokenManager } from "domains/auth/usecases";
import sinon, { SinonStubbedInstance } from "sinon";

export const tokenManagerStub: SinonStubbedInstance<ITokenManager> = {
  validateToken: sinon.stub(),
  generateToken: sinon.stub(),
  decode: sinon.stub(),
  verifyToken: sinon.stub(),
};
