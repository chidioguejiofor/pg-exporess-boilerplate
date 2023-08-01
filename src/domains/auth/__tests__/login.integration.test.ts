import chai, { expect } from "chai";
import app from "infrastructure/app";
import { User } from "../models";

const userData = {
  firstName: "some",
  lastName: "random",
  email: "random@test.com",
  password: "1234567",
};

describe("Login User Integration Test", () => {
  before(async () => {
    await User.destroy({ where: {} });
    await User.create({
      ...userData,
      password: User.generateHash(userData.password),
      role: "customer",
    });
  });
  it("should return 200 when the  credentials are valid", async () => {
    const response = await chai.request(app).post("/api/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).to.be.eql(200);
  });
  it("should return 404 when the user password  is invalid", async () => {
    const response = await chai.request(app).post("/api/auth/login").send({
      email: userData.email,
      password: "userData.password",
    });

    expect(response.status).to.be.eql(404);
    expect(response.body.message).to.be.eql("Invalid Credentials");
  });

  it("should return 404 when the user email  is invalid", async () => {
    const response = await chai.request(app).post("/api/auth/login").send({
      email: "userD@ata.email",
      password: userData.password,
    });

    expect(response.status).to.be.eql(404);
    expect(response.body.message).to.be.eql("Invalid Credentials");
  });
});
