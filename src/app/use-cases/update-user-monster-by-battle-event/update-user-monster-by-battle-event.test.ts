import UserRepositoryInMemory from "@/externals/database/in-memory/user-repository-in-memory";
import UpdateUserMonsterByBattleEvent from "./update-user-monster-by-battle-event";
import * as mock from "../../../mock-test";
import MonsterRepositoryInMemory from "@/externals/database/in-memory/monster-repository-in-memory";

// Test all possible scenarios
// Private methods won't be tested

/* Next steps
1. Save monster stats on database (UpdateUserMonsterByBattleEvent)
2. Update automated tests => user as a sender/attacker => attacks the monster with base attack
3. Update controller
4. Write all other tests
*/
describe("Test method updateUserAndMonsterStats", () => {
  describe("user as a sender/attacker", () => {
    it("attacks the monster with base attack", async () => {
      const user = { ...mock.user };
      const monster = { ...mock.monster };
      const event = mock.eventUserIsSenderBaseAttack;
      const userRepository = new UserRepositoryInMemory();
      await userRepository.create({ user });

      const updated = await UpdateUserMonsterByBattleEvent.execute({
        event,
        user,
        monster,
        userRepository,
      });

      const userDb = await userRepository.getById(user.id);

      expect(updated.monster.hp).toBeLessThan(mock.monster.hp);
      // todo: check monster hp on database

      expect(updated.user.character.hp).toEqual(user.character.hp);
      expect(userDb.character.hp).toEqual(user.character.hp);
    });

    it("attacks the monster with spell attack", async () => {});

    it("uses an item", async () => {});
  });

  describe("monster as a sender/attacker", () => {
    it("attacks the user with base attack", async () => {
      expect(true).toBe(true);
    });
  });

  // it("Base Attack (user is sender) : Check if monster loses hp when user attacks", async () => {
  //   const initialHpMonster = monster.hp;

  //   const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
  //     "updateUserAndMonsterStats"
  //   ]({
  //     event: eventUserIsSenderBaseAttack,
  //     user: user,
  //     monster: monster,
  //   });

  //   expect(userAndMonsterUpdated.monster.hp).toBeLessThan(initialHpMonster);
  // });
  // it("Base Attack (monster is sender) : Check if user loses hp when monster attacks", async () => {
  //   const initialHpUser = user.character.hp;

  //   const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
  //     "updateUserAndMonsterStats"
  //   ]({
  //     event: eventMonsterIsSenderBaseAttack,
  //     user: user,
  //     monster: monster,
  //   });

  //   expect(userAndMonsterUpdated.user.character.hp).toBeLessThan(initialHpUser);
  // });
  // it("Monster wins battle", async () => {
  //   const initialDeathUser = user.character.deaths;

  //   const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
  //     "updateUserAndMonsterStats"
  //   ]({
  //     event: eventMonsterIsSenderBaseAttack,
  //     user: user,
  //     monster: monster,
  //   });

  //   expect(userAndMonsterUpdated.user.character.xp).toBe(0);
  //   expect(userAndMonsterUpdated.user.character.deaths).toBeGreaterThan(
  //     initialDeathUser
  //   );
  //   expect(userAndMonsterUpdated.user.character.level).toBe(1);
  // });
  // it("User wins battle", async () => {
  //   const initialXpUser = user.character.xp;

  //   const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
  //     "updateUserAndMonsterStats"
  //   ]({
  //     event: eventUserIsSenderBaseAttack,
  //     user: user,
  //     monster: monster,
  //   });

  //   expect(userAndMonsterUpdated.user.character.xp).toBeGreaterThan(
  //     initialXpUser
  //   );
  // });
  // it("Item use - Poção de Hp (user is sender) : User update quantity of item and increase Hp", async () => {
  //   const initialHpUser = user.character.hp;

  //   const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
  //     "updateUserAndMonsterStats"
  //   ]({
  //     event: eventUserIsSenderItemUsePotionHp,
  //     user: user,
  //     monster: monster,
  //   });
  //   expect(userAndMonsterUpdated.user.character.items[0].quantity).toEqual(
  //     eventUserIsSenderItemUsePotionHp.result.sender.newQuantity
  //   );
  //   expect(userAndMonsterUpdated.user.character.hp).toBeGreaterThan(
  //     initialHpUser
  //   );
  // });
  // it("Item use - Poção de Mp (user is sender) : User update quantity of item and increase Mp", async () => {
  //   const initialMpUser = user.character.mp;

  //   const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
  //     "updateUserAndMonsterStats"
  //   ]({
  //     event: eventUserIsSenderItemUsePotionMp,
  //     user: user,
  //     monster: monster,
  //   });

  //   expect(userAndMonsterUpdated.user.character.items[1].quantity).toEqual(
  //     eventUserIsSenderItemUsePotionMp.result.sender.newQuantity
  //   );
  //   expect(userAndMonsterUpdated.user.character.mp).toBeGreaterThan(
  //     initialMpUser
  //   );
  // });
  // it("Spell attack - Bola de fogo (user is sender) : User loses mp, monster loses hp", async () => {
  //   const initialMpUser = user.character.mp;
  //   const initialHpMonster = monster.hp;
  //   const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
  //     "updateUserAndMonsterStats"
  //   ]({
  //     event: eventUserIsSenderSpellAttack,
  //     user: user,
  //     monster: monster,
  //   });

  //   expect(userAndMonsterUpdated.user.character.mp).toBeLessThan(initialMpUser);
  //   expect(userAndMonsterUpdated.monster.hp).toBeLessThan(initialHpMonster);
  // });
});
