import UserRepositoryInMemory from "@/externals/database/in-memory/user-repository-in-memory";
import UpdateUserMonsterByBattleEvent from "./update-user-monster-by-battle-event";
import * as mock from "../../../mock-test";
import MonsterRepositoryInMemory from "@/externals/database/in-memory/monster-repository-in-memory";

describe("user as a sender/attacker", () => {
  it("attacks the monster with base attack", async () => {
    const user = { ...mock.user };
    const monster = { ...mock.monster };
    const event = mock.eventUserIsSenderBaseAttack;
    const userRepository = new UserRepositoryInMemory();
    const monsterRepository = new MonsterRepositoryInMemory();

    await userRepository.create({ user });
    const updated = await UpdateUserMonsterByBattleEvent.execute({
      event,
      user,
      monster,
      userRepository,
      monsterRepository,
    });
    const userDb = await userRepository.getById(user.id);
    const monsterDb = await monsterRepository.getById(monster.id);

    expect(updated.monster.hp).toBeLessThan(mock.monster.hp);
    expect(monsterDb.hp).toBeLessThan(mock.monster.hp);
    expect(updated.user.character.hp).toEqual(user.character.hp);
    expect(userDb.character.hp).toEqual(user.character.hp);
  });
  it("attacks the monster with spell attack", async () => {
    const user = { ...mock.user };
    const monster = { ...mock.monster };
    const event = mock.eventUserIsSenderSpellAttack;
    const userRepository = new UserRepositoryInMemory();
    const monsterRepository = new MonsterRepositoryInMemory();

    await userRepository.create({ user });
    const updated = await UpdateUserMonsterByBattleEvent.execute({
      event,
      user,
      monster,
      userRepository,
      monsterRepository,
    });
    const userDb = await userRepository.getById(user.id);
    const monsterDb = await monsterRepository.getById(monster.id);

    expect(updated.monster.hp).toBeLessThan(mock.monster.hp);
    expect(monsterDb.hp).toBeLessThan(mock.monster.hp);
    expect(updated.user.character.hp).toEqual(user.character.hp);
    expect(userDb.character.hp).toEqual(user.character.hp);
  });
  it("increases hp when using potion hp and hp is not full", async () => {
    const userWithLowHp = {
      ...mock.user,
      character: { ...mock.user.character, hp: 5 },
    };
    const userWithLowHpBaseToCompare = {
      ...mock.user,
      character: { ...mock.user.character, hp: 5 },
    };
    const monster = { ...mock.monster };
    const event = mock.eventUserIsSenderItemUsePotionHp;
    const userRepository = new UserRepositoryInMemory();
    const monsterRepository = new MonsterRepositoryInMemory();

    await userRepository.create({ user: userWithLowHp });

    const updated = await UpdateUserMonsterByBattleEvent.execute({
      event,
      user: userWithLowHp,
      monster,
      userRepository,
      monsterRepository,
    });
    const userDb = await userRepository.getById(userWithLowHp.id);
    const monsterDb = await monsterRepository.getById(monster.id);

    expect(updated.user.character.items[0].quantity).toEqual(
      event.result.sender.newQuantity
    );
    expect(userDb.character.items[0].quantity).toEqual(
      event.result.sender.newQuantity
    );
    expect(updated.user.character.hp).toBeGreaterThan(
      userWithLowHpBaseToCompare.character.hp
    );
    expect(userDb.character.hp).toEqual(updated.user.character.hp);
    expect(monsterDb.hp).toEqual(monster.hp);
  });
  it("does not increase hp when using potion hp and hp is already full", async () => {
    const userWithFullHp = {
      ...mock.user,
      character: { ...mock.user.character, hp: mock.user.character.maxHp },
    };
    const userWithFullHpBaseToCompare = {
      ...mock.user,
      character: { ...mock.user.character, hp: mock.user.character.maxHp },
    };
    const monster = { ...mock.monster };
    const event = mock.eventUserIsSenderItemUsePotionHp;
    const userRepository = new UserRepositoryInMemory();
    const monsterRepository = new MonsterRepositoryInMemory();

    await userRepository.create({ user: userWithFullHp });
    const updated = await UpdateUserMonsterByBattleEvent.execute({
      event,
      user: userWithFullHp,
      monster,
      userRepository,
      monsterRepository,
    });
    const userDb = await userRepository.getById(userWithFullHp.id);
    const monsterDb = await monsterRepository.getById(monster.id);

    expect(updated.user.character.items[0].quantity).toEqual(
      event.result.sender.newQuantity
    );
    expect(userDb.character.items[0].quantity).toEqual(
      event.result.sender.newQuantity
    );
    expect(updated.user.character.hp).toEqual(
      userWithFullHpBaseToCompare.character.hp
    );
    expect(userDb.character.hp).toEqual(updated.user.character.hp);
    expect(monsterDb.hp).toEqual(monster.hp);
  });
  it("increases mp when using potion mp", async () => {
    const userWithLowMp = {
      ...mock.user,
      character: { ...mock.user.character, mp: 0 },
    };
    const userWithLowMpBaseToCompare = {
      ...mock.user,
      character: { ...mock.user.character, mp: 0 },
    };
    const monster = { ...mock.monster };
    const event = mock.eventUserIsSenderItemUsePotionMp;
    const userRepository = new UserRepositoryInMemory();
    const monsterRepository = new MonsterRepositoryInMemory();

    await userRepository.create({ user: userWithLowMp });
    const updated = await UpdateUserMonsterByBattleEvent.execute({
      event,
      user: userWithLowMp,
      monster,
      userRepository,
      monsterRepository,
    });
    const userDb = await userRepository.getById(userWithLowMp.id);
    const monsterDb = await monsterRepository.getById(monster.id);

    expect(updated.user.character.items[1].quantity).toEqual(
      event.result.sender.newQuantity
    );
    expect(userDb.character.items[1].quantity).toEqual(
      event.result.sender.newQuantity
    );
    expect(updated.user.character.mp).toBeGreaterThan(
      userWithLowMpBaseToCompare.character.mp
    );
    expect(userDb.character.mp).toEqual(updated.user.character.mp);
    expect(monsterDb.hp).toEqual(monster.hp);
  });
  it("wins battle", async () => {
    const user = { ...mock.user };
    const monster = { ...mock.monster };
    const event = mock.eventUserIsSenderBaseAttack;
    const userRepository = new UserRepositoryInMemory();
    const monsterRepository = new MonsterRepositoryInMemory();

    await userRepository.create({ user });
    const updated = await UpdateUserMonsterByBattleEvent.execute({
      event,
      user,
      monster,
      userRepository,
      monsterRepository,
    });
    const userDb = await userRepository.getById(user.id);

    expect(updated.user.character.xp).toBeGreaterThan(mock.user.character.xp);
    expect(userDb.character.xp).toEqual(updated.user.character.xp);
  });
});

describe("monster as a sender/attacker", () => {
  it("attacks the user with base attack", async () => {
    const user = { ...mock.user };
    const monster = { ...mock.monster };
    const event = mock.eventMonsterIsSenderBaseAttack;
    const userRepository = new UserRepositoryInMemory();
    const monsterRepository = new MonsterRepositoryInMemory();

    await userRepository.create({ user });
    const updated = await UpdateUserMonsterByBattleEvent.execute({
      event,
      user,
      monster,
      monsterRepository,
      userRepository,
    });
    const userDb = await userRepository.getById(user.id);
    const monsterDb = await monsterRepository.getById(monster.id);

    expect(updated.user.character.hp).toBeLessThan(mock.user.character.hp);
    expect(userDb.character.hp).toBeLessThan(mock.user.character.hp);
    expect(updated.monster.hp).toEqual(monster.hp);
    expect(monsterDb.hp).toEqual(monster.hp);
  });
  it("wins battle", async () => {
    const user = { ...mock.user };
    const monster = { ...mock.monster };
    const event = mock.eventMonsterIsSenderBaseAttack;
    const userRepository = new UserRepositoryInMemory();
    const monsterRepository = new MonsterRepositoryInMemory();

    await userRepository.create({ user });
    const updated = await UpdateUserMonsterByBattleEvent.execute({
      event,
      user,
      monster,
      userRepository,
      monsterRepository,
    });
    const userDb = await userRepository.getById(user.id);
    const monsterDb = await monsterRepository.getById(monster.id);

    expect(updated.user.character.xp).toBe(0);
    expect(updated.user.character.deaths).toBeGreaterThan(
      mock.user.character.deaths
    );
    expect(updated.user.character.level).toBe(1);

    expect(userDb.character.xp).toEqual(updated.user.character.xp);
    expect(userDb.character.deaths).toEqual(updated.user.character.deaths);
    expect(updated.user.character.level).toEqual(updated.user.character.level);

    expect(monsterDb.hp).toEqual(monster.hp);
  });
});
