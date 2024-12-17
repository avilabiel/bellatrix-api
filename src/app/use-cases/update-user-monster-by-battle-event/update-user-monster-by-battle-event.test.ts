import UserRepositoryInMemory from "@/externals/database/in-memory/user-repository-in-memory";
import UpdateUserMonsterByBattleEvent from "./update-user-monster-by-battle-event";
import { ACTION_TYPE } from "@/entities/BattleEvent";

const user = {
  id: "17bd4331-6073-4b03-b79a-d7a2a307c3c8",
  nick: "xx",
  image:
    " https://pbs.twimg.com/profile_images/1725495920840585217/rdF0kKid_400x400.jpg",
  character: {
    level: 1,
    deaths: 0,
    hp: 10,
    mp: 10,
    maxHp: 20,
    maxMp: 10,
    xp: 0,
    atk: {
      min: 3,
      max: 5,
    },
    spells: [
      {
        name: "Bola de fogo",
        atk: {
          min: 7,
          max: 7,
        },
        mpCost: 10,
      },
    ],
    items: [
      {
        name: "Poção de HP",
        result: {
          hp: 10,
          mp: 0,
        },
        quantity: 5,
      },
      {
        name: "Poção de MP",
        result: {
          hp: 0,
          mp: 10,
        },
        quantity: 2,
      },
    ],
  },
  createdAt: new Date("2024-12-13T13:55:46.829Z"),
};
const monster = {
  id: "1234-token",
  name: "Goblin",
  image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
  level: 5,
  hp: 60,
  mp: 0,
  maxHp: 60,
  maxMp: 0,
  xp: 40,
  atk: {
    min: 5,
    max: 7,
  },
  spawnChance: 0.2,
  createdAt: new Date("2024-12-13T13:55:46.418Z"),
};
const eventUserIsSenderBaseAttack = {
  actionType: ACTION_TYPE["base-attack"],
  sender: {
    name: user.nick,
    isUser: true,
  },
  receiver: {
    name: monster.name,
    isUser: false,
  },
  result: {
    sender: {
      isWinner: true,
    },
    receiver: {
      hp: -3,
    },
  },
};
const eventUserIsSenderSpellAttack = {
  actionType: ACTION_TYPE["spell-attack"],
  sender: {
    name: user.nick,
    isUser: true,
  },
  receiver: {
    name: monster.name,
    isUser: false,
  },
  spells: {
    name: user.character.spells[0].name,
  },
  result: {
    sender: {
      isWinner: false,
      mp: -10,
    },
    receiver: {
      hp: -7,
    },
  },
};
const eventUserIsSenderItemUsePotionHp = {
  actionType: ACTION_TYPE["item-use"],
  sender: {
    name: user.nick,
    isUser: true,
  },
  receiver: {
    name: monster.name,
    isUser: false,
  },
  item: {
    name: user.character.items[0].name,
  },
  result: {
    sender: {
      hp: 10,
      mp: 0,
      newQuantity: 4,
      isWinner: false,
    },
    receiver: null,
  },
};
const eventUserIsSenderItemUsePotionMp = {
  actionType: ACTION_TYPE["item-use"],
  sender: {
    name: user.nick,
    isUser: true,
  },
  receiver: {
    name: monster.name,
    isUser: false,
  },
  item: {
    name: user.character.items[1].name,
  },
  result: {
    sender: {
      hp: 0,
      mp: 5,
      newQuantity: 1,
      isWinner: false,
    },
    receiver: null,
  },
};
const eventMonsterIsSenderBaseAttack = {
  actionType: ACTION_TYPE["base-attack"],
  sender: {
    name: monster.name,
    isUser: false,
  },
  receiver: {
    name: user.nick,
    isUser: true,
  },
  result: {
    sender: {
      isWinner: true,
    },
    receiver: {
      hp: -3,
    },
  },
};
describe("Test method updateUserAndMonsterStats", () => {
  it("Base Attack (user is sender) : Check if monster loses hp when user attacks", async () => {
    const initialHpMonster = monster.hp;

    const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
      "updateUserAndMonsterStats"
    ]({
      event: eventUserIsSenderBaseAttack,
      user: user,
      monster: monster,
    });

    expect(userAndMonsterUpdated.monster.hp).toBeLessThan(initialHpMonster);
  });
  it("Base Attack (monster is sender) : Check if user loses hp when monster attacks", async () => {
    const initialHpUser = user.character.hp;

    const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
      "updateUserAndMonsterStats"
    ]({
      event: eventMonsterIsSenderBaseAttack,
      user: user,
      monster: monster,
    });

    expect(userAndMonsterUpdated.user.character.hp).toBeLessThan(initialHpUser);
  });
  it("Monster wins battle", async () => {
    const initialDeathUser = user.character.deaths;

    const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
      "updateUserAndMonsterStats"
    ]({
      event: eventMonsterIsSenderBaseAttack,
      user: user,
      monster: monster,
    });

    expect(userAndMonsterUpdated.user.character.xp).toBe(0);
    expect(userAndMonsterUpdated.user.character.deaths).toBeGreaterThan(
      initialDeathUser
    );
    expect(userAndMonsterUpdated.user.character.level).toBe(1);
  });
  it("User wins battle", async () => {
    const initialXpUser = user.character.xp;

    const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
      "updateUserAndMonsterStats"
    ]({
      event: eventUserIsSenderBaseAttack,
      user: user,
      monster: monster,
    });

    expect(userAndMonsterUpdated.user.character.xp).toBeGreaterThan(
      initialXpUser
    );
  });
  it("Item use - Poção de Hp (user is sender) : User update quantity of item and increase Hp", async () => {
    const initialHpUser = user.character.hp;

    const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
      "updateUserAndMonsterStats"
    ]({
      event: eventUserIsSenderItemUsePotionHp,
      user: user,
      monster: monster,
    });
    expect(userAndMonsterUpdated.user.character.items[0].quantity).toEqual(
      eventUserIsSenderItemUsePotionHp.result.sender.newQuantity
    );
    expect(userAndMonsterUpdated.user.character.hp).toBeGreaterThan(
      initialHpUser
    );
  });
  it("Item use - Poção de Mp (user is sender) : User update quantity of item and increase Mp", async () => {
    const initialMpUser = user.character.mp;

    const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
      "updateUserAndMonsterStats"
    ]({
      event: eventUserIsSenderItemUsePotionMp,
      user: user,
      monster: monster,
    });

    expect(userAndMonsterUpdated.user.character.items[1].quantity).toEqual(
      eventUserIsSenderItemUsePotionMp.result.sender.newQuantity
    );
    expect(userAndMonsterUpdated.user.character.mp).toBeGreaterThan(
      initialMpUser
    );
  });
  it("Spell attack - Bola de fogo (user is sender) : User loses mp, monster loses hp", async () => {
    const initialMpUser = user.character.mp;
    const initialHpMonster = monster.hp;
    const userAndMonsterUpdated = await UpdateUserMonsterByBattleEvent[
      "updateUserAndMonsterStats"
    ]({
      event: eventUserIsSenderSpellAttack,
      user: user,
      monster: monster,
    });

    expect(userAndMonsterUpdated.user.character.mp).toBeLessThan(initialMpUser);
    expect(userAndMonsterUpdated.monster.hp).toBeLessThan(initialHpMonster);
  });
});

describe("Test method execute", () => {
  it("Should return user updated", async () => {
    const initialHpUser = user.character.hp;
    const userUpdated = await UpdateUserMonsterByBattleEvent.execute({
      event: eventMonsterIsSenderBaseAttack,
      userRepository: new UserRepositoryInMemory(),
      user: user,
      monster: monster,
    });
    expect(userUpdated.character.hp).toBeLessThan(initialHpUser);
  });
});
