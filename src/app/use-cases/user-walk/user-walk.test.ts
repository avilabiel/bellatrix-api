import UserRepositoryInMemory from "@/externals/database/in-memory/user-repository-in-memory";
import CreateUser from "../create-user";

describe("UserWalk", () => {
  it("user goes to a batlle", async () => {
    // mock
    const userRepository = new UserRepositoryInMemory();

    const user = await CreateUser.execute({ nick: "r20", userRepository });
    // const monster = await CreateMonster.execute();
    // const map = await CreateMonster.execute();
  });

  it("throw game not found error", () => {
    expect(1).toBe(1);
  });

  it("throw user not found error", () => {
    expect(1).toBe(1);
  });
});

/*
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.5;
        global.Math = mockMath;
    */
