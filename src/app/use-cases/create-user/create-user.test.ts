import User from "@/entities/User";
import CreateUser from ".";
import UserRepositoryInMemory from "@/externals/database/in-memory/user-repository-in-memory";

describe("CreateUser", () => {
  it("creates a new user", async () => {
    const nick = "r20";
    const memoryRepository = new UserRepositoryInMemory();

    const user = await CreateUser.execute({
      nick,
      userRepository: memoryRepository,
    });

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
  });

  it("throws a new error when nick is already used", async () => {
    const nick = "r20";
    const memoryRepository = new UserRepositoryInMemory();

    await CreateUser.execute({
      nick,
      userRepository: memoryRepository,
    });

    try {
      await CreateUser.execute({
        nick,
        userRepository: memoryRepository,
      });
    } catch (error: any) {
      expect(error.message).toEqual("Nick is already used");
    }
  });
});
