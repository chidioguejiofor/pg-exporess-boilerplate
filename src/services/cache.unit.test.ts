import { CacheService, REDIS_CLIENT } from "services/cache";
import redisMock from "async-redis-mock";
import { expect } from "chai";
import sinon from "sinon";
const mockRedisClient = redisMock.createClient();

const mockRedisExpire = sinon.stub(REDIS_CLIENT, "expire");

describe("first", () => {
  const key = "1234567890";
  const message = {
    phoneNumber: "08131352121",
    phoneCountryCode: "+234",
    email: "email@gmail.com",
  };

  beforeEach(() => {
    mockRedisExpire.reset();
  });

  it("should save data to redis ", async () => {
    await CacheService.cacheData(key, message);
    const expectedMessage = JSON.parse(
      (await mockRedisClient.get(key)) as string
    );
    expect(expectedMessage).to.eql(message);
    mockRedisExpire.should.have.been.calledOnceWith(key, 24 * 60 * 60);
  });

  it("Should retrieve cached data using a key", async () => {
    await mockRedisClient.set(key, JSON.stringify(message));

    const expectedMessage = await CacheService.retrieveKey(key);

    expect(expectedMessage).to.eql(message);
  });

  it("Should return null if key was not found", async () => {
    mockRedisClient.del("key");
    const expectedMessage = await CacheService.retrieveKey("key");

    expect(expectedMessage).to.eql(null);
  });
});
